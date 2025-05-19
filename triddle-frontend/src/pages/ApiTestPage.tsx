import React, { useState } from 'react';
import axios from 'axios';

const ApiTestPage: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>(process.env.REACT_APP_API_URL || 'http://localhost:8000');
  const [endpoint, setEndpoint] = useState<string>('/auth/register');
  
  const testGetRequest = async () => {
    setStatus('Testing GET request...');
    try {
      const response = await axios.get(`${apiUrl}/healthcheck`);
      setStatus('GET request successful!');
      setResponse(JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      setStatus('Error with GET request');
      if (error.response) {
        setResponse(JSON.stringify({
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        }, null, 2));
      } else if (error.request) {
        setResponse(JSON.stringify({
          request: error.request,
          message: 'No response received from server. Server might be down or unreachable.'
        }, null, 2));
      } else {
        setResponse(JSON.stringify({
          message: error.message,
          error: error.toString()
        }, null, 2));
      }
    }
  };
  
  const testPostRequest = async () => {
    setStatus('Testing POST request...');
    try {
      const response = await axios.post(`${apiUrl}${endpoint}`, {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123'
      });
      setStatus('POST request successful!');
      setResponse(JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      setStatus('Error with POST request');
      if (error.response) {
        setResponse(JSON.stringify({
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        }, null, 2));
      } else if (error.request) {
        setResponse(JSON.stringify({
          request: 'Request was made but no response was received',
          message: 'No response received from server. Server might be down or unreachable.'
        }, null, 2));
      } else {
        setResponse(JSON.stringify({
          message: error.message,
          error: error.toString()
        }, null, 2));
      }
    }
  };

  const testConnection = async () => {
    setStatus('Testing simple connection...');
    try {
      // Try a simple fetch to the root
      const response = await fetch(apiUrl);
      if (response.ok) {
        setStatus('Connection successful!');
        const text = await response.text();
        setResponse(text);
      } else {
        setStatus(`Connection failed with status: ${response.status}`);
        setResponse(await response.text());
      }
    } catch (error: any) {
      setStatus('Connection failed');
      setResponse(JSON.stringify({
        message: error.message,
        error: error.toString()
      }, null, 2));
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="mb-6">
        <label className="block mb-2">API URL:</label>
        <input 
          type="text" 
          value={apiUrl} 
          onChange={e => setApiUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-6">
        <label className="block mb-2">Endpoint (for POST):</label>
        <input 
          type="text" 
          value={endpoint} 
          onChange={e => setEndpoint(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={testConnection}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Basic Connection
        </button>
        
        <button 
          onClick={testGetRequest}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test GET Request
        </button>
        
        <button 
          onClick={testPostRequest}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test POST Request
        </button>
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Status: </h2>
        <p className="p-2 bg-gray-100 rounded">{status}</p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold">Response:</h2>
        <pre className="p-4 bg-gray-100 rounded overflow-auto max-h-96 text-sm">
          {response || 'No response yet'}
        </pre>
      </div>
    </div>
  );
};

export default ApiTestPage;