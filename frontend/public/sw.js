// Service Worker for NexaCore PWA
const CACHE_NAME = 'nexacore-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo-192.png',
  '/logo-512.png',
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200 && event.request.method === 'GET') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then((response) => {
          return response || new Response('Offline - Content Not Available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          });
        });
      })
  );
});

// Background Sync for offline transactions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-sales') {
    event.waitUntil(syncSales());
  }
});

async function syncSales() {
  try {
    const db = await openIndexedDB();
    const pendingSales = await getPendingSalesFromDB(db);
    
    for (const sale of pendingSales) {
      const response = await fetch('/api/v1/pos/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
      });

      if (response.ok) {
        await markSaleAsSynced(db, sale.id);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('nexacore', 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getPendingSalesFromDB(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['sales'], 'readonly');
    const store = transaction.objectStore('sales');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result.filter(s => !s.synced));
    request.onerror = () => reject(request.error);
  });
}

async function markSaleAsSynced(db, saleId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['sales'], 'readwrite');
    const store = transaction.objectStore('sales');
    const request = store.get(saleId);
    
    request.onsuccess = () => {
      const sale = request.result;
      sale.synced = true;
      const updateRequest = store.put(sale);
      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () => reject(updateRequest.error);
    };
  });
}
