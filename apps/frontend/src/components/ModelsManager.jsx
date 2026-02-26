import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import { Cpu, Globe, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

const ModelsManager = () => {
  const [models, setModels] = useState([]);
  const [providers, setProviders] = useState([]);
  const [modelProviders, setModelProviders] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedModels, setExpandedModels] = useState(new Set());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const models = await apiClient.getModels();
      const providers = await apiClient.getProviders();
      console.log(models, providers);
      setModels(models.models || []);
      setProviders(providers.providers || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModelProviders = async (modelId) => {
    if (modelProviders[modelId]) return;

    try {
      const data = await apiClient.getModelProviders(modelId);
      setModelProviders(prev => ({
        ...prev,
        [modelId]: data.providers || []
      }));
    } catch (error) {
      console.error('Failed to fetch model providers:', error);
    }
  };

  const toggleModelExpansion = (modelId) => {
    const newExpanded = new Set(expandedModels);
    if (newExpanded.has(modelId)) {
      newExpanded.delete(modelId);
    } else {
      newExpanded.add(modelId);
      fetchModelProviders(modelId);
    }
    setExpandedModels(newExpanded);
  };

  const getProviderName = (providerId) => {
    const provider = providers.find(p => p.id === providerId);
    return provider ? provider.name : `Provider ${providerId}`;
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
          <Cpu className="w-6 h-6" />
          Models & Providers
        </h2>
      </div>

      {/* Available Providers */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Available Providers
        </h3>
        {providers.length === 0 ? (
          <p className="text-gray-600">No providers available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {providers.map((provider) => (
              <div key={provider.id} className="border border-gray-200 rounded-lg p-3">
                <div className="font-medium">{provider.name}</div>
                {provider.description && (
                  <div className="text-sm text-gray-600 mt-1">{provider.description}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Models */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Available Models</h3>
        {models.length === 0 ? (
          <p className="text-gray-600">No models available.</p>
        ) : (
          <div className="space-y-2">
            {models.map((model) => (
              <div key={model.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleModelExpansion(model.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {expandedModels.has(model.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                    <div className="text-left">
                      <div className="font-medium">{model.name}</div>
                      {model.description && (
                        <div className="text-sm text-gray-600">{model.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {model.category && (
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {model.category}
                      </span>
                    )}
                  </div>
                </button>

                {expandedModels.has(model.id) && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <h4 className="font-medium mb-3">Available Providers</h4>
                    {modelProviders[model.id] ? (
                      modelProviders[model.id].length === 0 ? (
                        <p className="text-gray-600">No providers available for this model.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {modelProviders[model.id].map((provider) => (
                            <div key={provider.id} className="bg-white p-3 rounded border border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{getProviderName(provider.providerId)}</div>
                                  {provider.pricing && (
                                    <div className="text-sm text-gray-600 mt-1">
                                      {provider.pricing}
                                    </div>
                                  )}
                                  {provider.features && provider.features.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {provider.features.map((feature, index) => (
                                        <span
                                          key={index}
                                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                                        >
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                {provider.endpoint && (
                                  <button
                                    onClick={() => window.open(provider.endpoint, '_blank')}
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelsManager;
