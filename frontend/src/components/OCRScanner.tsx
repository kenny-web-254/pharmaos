import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, FileText, Scan, Loader } from 'lucide-react';
import Button from './Button';
import formatCurrency from '../services/currencyService';
import { useCurrency } from '../hooks/useAuth';

interface OCRResult {
  text: string;
  confidence: number;
  fields?: {
    productName?: string;
    expiryDate?: string;
    batchNumber?: string;
    price?: string;
    quantity?: string;
  };
}

interface OCRScannerProps {
  onResult: (result: OCRResult) => void;
  onClose: () => void;
  mode?: 'invoice' | 'prescription' | 'receipt' | 'label';
}

const OCRScanner: React.FC<OCRScannerProps> = ({ onResult, onClose, mode = 'invoice' }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modeLabels = {
    invoice: 'Invoice Scanning',
    prescription: 'Prescription Scanning',
    receipt: 'Receipt Scanning',
    label: 'Product Label Scanning',
  };

  const handleFileSelect = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      processImage(file);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { currency } = useCurrency();

    // Mock OCR result based on mode
    const mockResults: Record<string, OCRResult> = {
      invoice: {
        text: `INVOICE #INV-2024-001\nABC Pharmaceuticals\nDate: 2024-01-15\nItem: Paracetamol 500mg\nQty: 100\nPrice: ${formatCurrency(250, currency)}`,
        confidence: 92,
        fields: {
          productName: 'Paracetamol 500mg',
          price: formatCurrency(250, currency),
          quantity: '100',
        },
      },
      prescription: {
        text: 'Rx: Amoxicillin 500mg\nQty: 21\nRefills: 0\nDr. Smith\nDate: 2024-01-15',
        confidence: 89,
        fields: {
          productName: 'Amoxicillin 500mg',
          quantity: '21',
        },
      },
      receipt: {
        text: `Receipt #12345\nTotal: ${formatCurrency(45.5, currency)}\nItem 1: Ibuprofen ${formatCurrency(5.99, currency)}\nItem 2: Vitamin C ${formatCurrency(7.99, currency)}`,
        confidence: 87,
        fields: {
          total: formatCurrency(45.5, currency),
        },
      },
      label: {
        text: `PAR-500\nParacetamol 500mg\nBatch: B20240115\nExp: 01/2026\nPrice: ${formatCurrency(4.99, currency)}`,
        confidence: 94,
        fields: {
          productName: 'Paracetamol 500mg',
          batchNumber: 'B20240115',
          expiryDate: '01/2026',
          price: formatCurrency(4.99, currency),
        },
      },
    };

    onResult(mockResults[mode]);
    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card rounded-2xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {modeLabels[mode]}
          </h3>
          <button
            onClick={onClose}
            className="p-2 glass rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all"
          >
            <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </button>
        </div>

        {preview ? (
          <div className="relative mb-4">
            <img src={preview} alt="Preview" className="w-full rounded-lg" />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Loader className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                  <p className="text-white font-medium">Processing image...</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="border-2 border-dashed border-white/30 dark:border-slate-600 rounded-lg p-8 text-center mb-4">
            <Camera className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              Upload an image to scan
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} variant="outline">
              Choose Image
            </Button>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="secondary" onClick={onClose} fullWidth disabled={isProcessing}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => fileInputRef.current?.click()} 
            fullWidth
            disabled={isProcessing}
          >
            <Scan className="w-4 h-4 mr-2" /> Scan
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OCRScanner;