'use client';

import { ApiEndpoint } from '@/types/api';
import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import TestHistoryService from '@/services/TestHistoryService';

interface ApiTesterProps {
  endpoint: ApiEndpoint;
  baseUrl: string;
}

interface HeaderRow {
  key: string;
  value: string;
  enabled: boolean;
}

interface ParamRow {
  key: string;
  value: string;
  enabled: boolean;
}

export const ApiTester = ({ endpoint, baseUrl }: ApiTesterProps) => {
  const [headers, setHeaders] = useState<HeaderRow[]>([
    { key: 'Content-Type', value: 'application/json', enabled: true }
  ]);
  const [params, setParams] = useState<ParamRow[]>(
    endpoint.parameters.map(p => ({
      key: p.name,
      value: p.default || '',
      enabled: p.required
    }))
  );
  const [response, setResponse] = useState<{
    status?: number;
    time?: number;
    size?: number;
    data?: any;
    error?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '', enabled: true }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, field: keyof HeaderRow, value: string | boolean) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  const updateParam = (index: number, field: keyof ParamRow, value: string | boolean) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    setParams(newParams);
  };

  const sendRequest = async () => {
    setIsLoading(true);
    const startTime = performance.now();
    
    const requestHeaders = headers
      .filter(h => h.enabled && h.key)
      .reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {});

    const queryParams = params
      .filter(p => p.enabled && p.key)
      .reduce((acc, p) => ({ ...acc, [p.key]: p.value }), {});

    const url = `${baseUrl}${endpoint.path}`;

    try {
      
      const response = await axios({
        method: endpoint.method,
        url,
        headers: requestHeaders,
        params: queryParams,
        timeout: 10000
      });

      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      const responseSize = new Blob([JSON.stringify(response.data)]).size;
      
      // Başarılı yanıtı kaydet
      const testResult = {
        status: response.status,
        time: duration,
        size: responseSize,
        data: response.data
      };
      
      setResponse(testResult);

      // Save successful test result
      TestHistoryService.saveTestResult({
        id: crypto.randomUUID(),
        apiId: baseUrl,
        endpointId: endpoint.id,
        timestamp: new Date().toISOString(),
        duration,
        success: true,
        statusCode: response.status,
        request: {
          method: endpoint.method,
          url: url,
          headers: { ...requestHeaders },
          body: { ...queryParams }
        },
        response: {
          statusCode: response.status,
          headers: Object.fromEntries(Object.entries(response.headers)),
          body: response.data
        },
        environment: {
          name: 'default',
          variables: {}
        }
      });
    } catch (error: any) {
      const duration = Math.round(performance.now() - startTime);
      const errorResponse = {
        status: error.response?.status,
        time: duration,
        error: error.response?.data?.message || error.message,
        data: error.response?.data
      };
      
      setResponse(errorResponse);

      // Save error result to test history
      TestHistoryService.saveTestResult({
        id: crypto.randomUUID(),
        apiId: baseUrl,
        endpointId: endpoint.id,
        timestamp: new Date().toISOString(),
        duration,
        success: false,
        statusCode: error.response?.status || 0,
        request: {
          method: endpoint.method,
          url: url,
          headers: { ...requestHeaders },
          body: { ...queryParams }
        },
        response: {
          statusCode: error.response?.status || 0,
          headers: error.response?.headers ? Object.fromEntries(Object.entries(error.response.headers)) : {},
          error: errorResponse.error,
          body: error.response?.data
        },
        environment: {
          name: 'default',
          variables: {}
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Test API Endpoint</h2>

      <div className="space-y-6">
        {/* URL and Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL
          </label>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-2 rounded-md text-sm font-medium ${
              endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
              endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
              endpoint.method === 'DELETE' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {endpoint.method}
            </span>
            <code className="flex-1 block w-full bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-md font-mono text-sm">
              {baseUrl}{endpoint.path}
            </code>
          </div>
        </div>

        {/* Headers */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Headers
            </label>
            <button
              onClick={addHeader}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Add Header
            </button>
          </div>
          <div className="space-y-2">
            {headers.map((header, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={header.enabled}
                  onChange={e => updateHeader(index, 'enabled', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <input
                  type="text"
                  value={header.key}
                  onChange={e => updateHeader(index, 'key', e.target.value)}
                  placeholder="Key"
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={e => updateHeader(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
                />
                <button
                  onClick={() => removeHeader(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Parameters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Parameters
          </label>
          <div className="space-y-2">
            {params.map((param, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={param.enabled}
                  onChange={e => updateParam(index, 'enabled', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <input
                  type="text"
                  value={param.key}
                  readOnly
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-sm"
                />
                <input
                  type="text"
                  value={param.value}
                  onChange={e => updateParam(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={sendRequest}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isLoading ? 'Sending...' : 'Send Request'}
        </button>

        {/* Response */}
        {(response.status || response.error) && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Response</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-4 mb-2 text-sm">
                {response.status && (
                  <span className={`px-2 py-1 rounded ${
                    response.status >= 200 && response.status < 300
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                  }`}>
                    Status: {response.status}
                  </span>
                )}
                {response.time && (
                  <span className="text-gray-600 dark:text-gray-300">
                    Time: {response.time}ms
                  </span>
                )}
                {response.size && (
                  <span className="text-gray-600 dark:text-gray-300">
                    Size: {(response.size / 1024).toFixed(1)} KB
                  </span>
                )}
              </div>
              {response.error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-100 rounded">
                  {response.error}
                </div>
              )}
              <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  {JSON.stringify(response.data, null, 2)}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};