import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, X, FileText, CreditCard, Cog } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  onUpload: (file: File, type: 'facture' | 'cheque' | 'kimbiale') => void;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, isProcessing }) => {
  const [selectedType, setSelectedType] = useState<'facture' | 'cheque' | 'kimbiale'>('facture');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      onUpload(file, selectedType);
    }
  }, [onUpload, selectedType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    disabled: isProcessing
  });

  const processingTypes = [
    {
      id: 'facture',
      label: 'Invoice/Facture',
      icon: FileText,
      description: 'Extract invoice data and details',
      color: 'text-blue-500'
    },
    {
      id: 'cheque',
      label: 'Check/Cheque',
      icon: CreditCard,
      description: 'Extract check information',
      color: 'text-green-500'
    },
    {
      id: 'kimbiale',
      label: 'Kimbiale Parts',
      icon: Cog,
      description: 'Extract parts and specifications',
      color: 'text-purple-500'
    }
  ];

  const clearPreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Processing Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {processingTypes.map((type) => {
          const Icon = type.icon;
          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType(type.id as any)}
              className={`card p-4 transition-all duration-200 ${
                selectedType === type.id
                  ? 'bg-primary text-primary-content shadow-lg'
                  : 'bg-base-100 hover:bg-base-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  size={24} 
                  className={selectedType === type.id ? 'text-primary-content' : type.color}
                />
                <div className="text-left">
                  <h3 className="font-semibold">{type.label}</h3>
                  <p className="text-sm opacity-70">{type.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">
            Upload {processingTypes.find(t => t.id === selectedType)?.label} Image
          </h2>
          
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-base-300 hover:border-primary hover:bg-base-200'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="loading-dots mx-auto text-primary">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <p className="text-lg font-medium">Processing your image...</p>
                  <p className="text-sm text-base-content/60">
                    AI is extracting data from your {selectedType} image
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Upload size={48} className="mx-auto text-primary" />
                  <div>
                    <p className="text-lg font-medium">
                      {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
                    </p>
                    <p className="text-sm text-base-content/60 mt-2">
                      or click to browse files
                    </p>
                  </div>
                  <div className="text-xs text-base-content/50">
                    Supports: JPEG, PNG, GIF, BMP, WebP (Max 10MB)
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Image Preview */}
          <AnimatePresence>
            {previewImage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full max-h-64 object-contain rounded-lg border border-base-300"
                  />
                  <button
                    onClick={clearPreview}
                    className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageUpload;