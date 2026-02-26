import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import { CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const PaymentsManager = () => {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [onramping, setOnramping] = useState(false);
  const [message, setMessage] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // This would typically come from a user profile endpoint
    // For now, we'll simulate it
    setCredits(100);
    setTransactionHistory([
      { id: 1, amount: 50, type: 'credit', date: '2024-01-15', description: 'Initial credit' },
      { id: 2, amount: -25, type: 'debit', date: '2024-01-20', description: 'API usage' },
    ]);
    setLoading(false);
  };

  const handleOnramp = async () => {
    setOnramping(true);
    setMessage(null);

    try {
      const result = await apiClient.onramp();
      setCredits(prev => prev + result.credits);
      setMessage({
        type: 'success',
        text: `Successfully added ${result.credits} credits to your account!`
      });
      
      // Add to transaction history
      setTransactionHistory(prev => [{
        id: Date.now(),
        amount: result.credits,
        type: 'credit',
        date: new Date().toISOString().split('T')[0],
        description: 'Onramp credits'
      }, ...prev]);
      
    } catch (error) {
      console.error('Onramp failed:', error);
      setMessage({
        type: 'error',
        text: 'Failed to add credits. Please try again.'
      });
    } finally {
      setOnramping(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          Payments & Credits
        </h2>
      </div>

      {/* Credits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Credits</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{credits}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month Usage</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">25</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <p className="text-lg font-bold text-green-600 mt-2">Active</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Credits */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Add Credits</h3>
        <div className="space-y-4">
          <p className="text-gray-600">
            Add credits to your account to use our API services. Credits are used for model inference and other features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleOnramp}
              disabled={onramping}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              {onramping ? 'Processing...' : 'Add Credits'}
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {message.text}
            </div>
          )}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        {transactionHistory.length === 0 ? (
          <p className="text-gray-600">No transactions yet.</p>
        ) : (
          <div className="space-y-2">
            {transactionHistory.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <CreditCard className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-600">{transaction.date}</div>
                  </div>
                </div>
                <div className={`font-bold ${
                  transaction.type === 'credit' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}{Math.abs(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Pricing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Model Inference</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• GPT-4: 10 credits per 1K tokens</li>
              <li>• GPT-3.5: 1 credit per 1K tokens</li>
              <li>• Claude: 8 credits per 1K tokens</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Other Services</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Image Generation: 50 credits per image</li>
              <li>• Embeddings: 1 credit per 1K tokens</li>
              <li>• Fine-tuning: 100 credits per hour</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsManager;
