import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Database } from 'lucide-react';
import ImageUpload from '../components/AI/ImageUpload';
import ExtractedDataDisplay from '../components/AI/ExtractedDataDisplay';
import { aiService } from '../services/api';
import { ExtractedData } from '../types';
import toast from 'react-hot-toast';

const AIProcessing: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [processingHistory, setProcessingHistory] = useState<ExtractedData[]>([]);

  const handleImageUpload = async (file: File, type: 'facture' | 'cheque' | 'kimbiale') => {
    setIsProcessing(true);
    setExtractedData(null);

    try {
      let response;
      
      switch (type) {
        case 'facture':
          response = await aiService.processFacture(file);
          break;
        case 'cheque':
          response = await aiService.processCheque(file);
          break;
        case 'kimbiale':
          response = await aiService.processKimbiale(file);
          break;
        default:
          throw new Error('Invalid processing type');
      }

      if (response.success) {
        setExtractedData(response.data);
        toast.success(`${type} processed successfully!`);
      } else {
        throw new Error(response.error || 'Processing failed');
      }
    } catch (error) {
      console.error('Processing error:', error);
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveData = async (data: ExtractedData) => {
    try {
      const response = await aiService.saveExtractedData(data);
      if (response.success) {
        setProcessingHistory(prev => [response.data, ...prev]);
        toast.success('Data saved successfully!');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save data');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full">
            <Brain className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gradient">AI Processing Center</h1>
        </div>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Upload your documents and let our AI extract structured data with high accuracy.
          Supports invoices, checks, and Kimbiale parts recognition.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            icon: Brain,
            title: 'Advanced AI',
            description: 'State-of-the-art OCR and machine learning algorithms',
            color: 'text-purple-500'
          },
          {
            icon: Zap,
            title: 'Fast Processing',
            description: 'Get results in seconds with high accuracy rates',
            color: 'text-yellow-500'
          },
          {
            icon: Database,
            title: 'Structured Data',
            description: 'Clean JSON output ready for your applications',
            color: 'text-blue-500'
          }
        ].map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body text-center">
                <Icon size={48} className={`mx-auto ${feature.color} mb-4`} />
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-base-content/60">{feature.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Upload Section */}
      <ImageUpload onUpload={handleImageUpload} isProcessing={isProcessing} />

      {/* Results */}
      {extractedData && (
        <ExtractedDataDisplay data={extractedData} onSave={handleSaveData} />
      )}

      {/* Processing History */}
      {processingHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Processing History</h2>
            <div className="space-y-4">
              {processingHistory.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-base-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-lg">
                        <img src={item.originalImage} alt="Processed" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold capitalize">{item.type} Processing</p>
                      <p className="text-sm text-base-content/60">
                        {new Date(item.processedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="badge badge-success">
                      {Math.round(item.confidence * 100)}% confidence
                    </div>
                    <button
                      onClick={() => setExtractedData(item)}
                      className="btn btn-sm btn-outline"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIProcessing;