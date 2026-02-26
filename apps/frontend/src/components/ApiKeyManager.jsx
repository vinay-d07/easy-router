import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import { Plus, Trash2, ToggleLeft, ToggleRight, Copy, Key } from 'lucide-react';

const ApiKeyManager = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const result = await apiClient.getApiKeys();
      setApiKeys(result.apiKeys || []);
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    setCreating(true);
    try {
      const result = await apiClient.createApiKey(newKeyName);
      setApiKeys([...apiKeys, { ...result, name: newKeyName, disabled: false }]);
      setNewKeyName('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create API key:', error);
      alert('Failed to create API key: ' + error.message);
    } finally {
      setCreating(false);
    }
  };

  const deleteApiKey = async (id) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;

    try {
      await apiClient.deleteApiKey(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
    } catch (error) {
      console.error('Failed to delete API key:', error);
      alert('Failed to delete API key: ' + error.message);
    }
  };

  const toggleApiKey = async (id, disabled) => {
    try {
      await apiClient.updateApiKey(id, !disabled);
      setApiKeys(apiKeys.map(key => 
        key.id === id ? { ...key, disabled: !disabled } : key
      ));
    } catch (error) {
      console.error('Failed to update API key:', error);
      alert('Failed to update API key: ' + error.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('API key copied to clipboard!');
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
          <Key className="w-6 h-6" />
          API Keys
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create API Key
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Create New API Key</h3>
          <form onSubmit={createApiKey} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a name for your API key"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={creating}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {apiKeys.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No API keys found. Create your first API key to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {apiKeys.map((key) => (
            <div key={key.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{key.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                      {key.apiKey ? `${key.apiKey.substring(0, 8)}...` : 'Loading...'}
                    </code>
                    {key.apiKey && (
                      <button
                        onClick={() => copyToClipboard(key.apiKey)}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      key.disabled 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {key.disabled ? 'Disabled' : 'Active'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleApiKey(key.id, key.disabled)}
                    className={`p-2 rounded-lg transition-colors ${
                      key.disabled 
                        ? 'text-gray-600 hover:text-green-600 hover:bg-green-50' 
                        : 'text-green-600 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {key.disabled ? (
                      <ToggleLeft className="w-5 h-5" />
                    ) : (
                      <ToggleRight className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteApiKey(key.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiKeyManager;
