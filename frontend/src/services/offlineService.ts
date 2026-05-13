// IndexedDB service for offline data persistence
export interface OfflineProduct {
  _id: string;
  name: string;
  sku: string;
  barcode?: string;
  sellingPrice: number;
  quantity: number;
  minStockLevel: number;
  category?: string;
  updatedAt: string;
}

export interface OfflineSale {
  _id: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  paymentMethod: string;
  customerName?: string;
  createdAt: string;
  synced: boolean;
}

class OfflineDB {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'NexaCoreOffline';
  private readonly DB_VERSION = 1;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Products store
        if (!db.objectStoreNames.contains('products')) {
          const productStore = db.createObjectStore('products', { keyPath: '_id' });
          productStore.createIndex('barcode', 'barcode', { unique: false });
          productStore.createIndex('sku', 'sku', { unique: true });
        }

        // Sales store
        if (!db.objectStoreNames.contains('sales')) {
          const saleStore = db.createObjectStore('sales', { keyPath: '_id' });
          saleStore.createIndex('synced', 'synced', { unique: false });
          saleStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Cart store
        if (!db.objectStoreNames.contains('cart')) {
          db.createObjectStore('cart', { keyPath: 'productId' });
        }

        // Customers store
        if (!db.objectStoreNames.contains('customers')) {
          db.createObjectStore('customers', { keyPath: '_id' });
        }

        // Settings store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
    });
  }

  async getDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.init();
    }
    return this.db!;
  }

  // Product operations
  async saveProducts(products: OfflineProduct[]): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction('products', 'readwrite');
    const store = tx.objectStore('products');

    for (const product of products) {
      await store.put(product);
    }
  }

  async getProducts(): Promise<OfflineProduct[]> {
    const db = await this.getDB();
    const tx = db.transaction('products', 'readonly');
    const store = tx.objectStore('products');
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getProductByBarcode(barcode: string): Promise<OfflineProduct | undefined> {
    const db = await this.getDB();
    const tx = db.transaction('products', 'readonly');
    const store = tx.objectStore('products');
    const index = store.index('barcode');
    return new Promise((resolve) => {
      const request = index.get(barcode);
      request.onsuccess = () => resolve(request.result);
    });
  }

  // Sales operations
  async saveSale(sale: OfflineSale): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction('sales', 'readwrite');
    const store = tx.objectStore('sales');
    await store.put({ ...sale, synced: false });
  }

  async getPendingSales(): Promise<OfflineSale[]> {
    const db = await this.getDB();
    const tx = db.transaction('sales', 'readonly');
    const store = tx.objectStore('sales');
    const index = store.index('synced');
    return new Promise((resolve) => {
      const request = index.getAll(false);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async markSaleSynced(saleId: string): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction('sales', 'readwrite');
    const store = tx.objectStore('sales');
    const sale = await store.get(saleId);
    if (sale) {
      sale.synced = true;
      await store.put(sale);
    }
  }

  // Settings operations
  async saveSetting(key: string, value: any): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction('settings', 'readwrite');
    const store = tx.objectStore('settings');
    await store.put({ key, value, updatedAt: new Date().toISOString() });
  }

  async getSetting(key: string): Promise<any> {
    const db = await this.getDB();
    const tx = db.transaction('settings', 'readonly');
    const store = tx.objectStore('settings');
    return new Promise((resolve) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.value);
    });
  }

  // Clear all data
  async clearAll(): Promise<void> {
    const db = await this.getDB();
    const stores = ['products', 'sales', 'cart', 'customers', 'settings'];
    for (const storeName of stores) {
      const tx = db.transaction(storeName, 'readwrite');
      await tx.objectStore(storeName).clear();
    }
  }
}

export const offlineDB = new OfflineDB();

// Check if running offline
export const isOffline = (): boolean => {
  return !navigator.onLine;
};

// Network status listener
export const addNetworkListener = (callback: (online: boolean) => void) => {
  window.addEventListener('online', () => callback(true));
  window.addEventListener('offline', () => callback(false));
};