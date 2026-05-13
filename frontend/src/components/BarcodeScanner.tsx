import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { motion } from 'framer-motion';
import { X, Camera } from 'lucide-react';
import Button from './Button';

interface BarcodeScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const readerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (readerRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(readerRef.current.id);
      
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      html5QrCodeRef.current.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          onScan(decodedText);
          handleStop();
        },
        (errorMessage) => {
          // Handle scan error
        }
      ).catch((err) => {
        console.error('Scanner start failed:', err);
      });
    }

    return () => {
      handleStop();
    };
  }, []);

  const handleStop = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().catch(() => {});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-6 rounded-2xl max-w-md w-full mx-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            Scan Barcode
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        <div 
          id="qr-reader" 
          ref={readerRef}
          className="w-full aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden"
        />

        <p className="text-center text-slate-600 dark:text-slate-400 mt-4 text-sm">
          Position barcode within the frame to scan
        </p>

        <Button variant="secondary" fullWidth onClick={onClose} className="mt-4">
          Cancel
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default BarcodeScanner;