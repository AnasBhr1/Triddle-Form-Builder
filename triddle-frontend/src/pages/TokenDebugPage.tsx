import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TokenDebugPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [testResponse, setTestResponse] = useState<string>('');

  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    // Try to decode the token
    if (storedToken) {
      try {
        // Split the token by dots
        const parts = storedToken.split('.');
        if (parts.length === 3) {
          // The middle part is the payload
          const payload = parts[1];
          // Base64 decode and parse as JSON
          const decoded = JSON.parse(atob(payload));
          setDecodedToken(decoded);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const testAuthEndpoint = async () => {
    try {
      setTestResponse('Testing auth endpoint...');
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      
      setTestResponse(`Success! Response: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      console.error('Error testing auth endpoint:', error);
      
      if (error.response) {
        setTestResponse(`Error ${error.response.status}: ${JSON.stringify(error.response.data, null, 2)}`);
      } else {
        setTestResponse(`Error: ${error.message}`);
      }
    }
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken(null);
    setDecodedToken(null);
    window.location.reload();
  };

  const setNewToken = () => {
    const newToken = prompt('Enter new token:');
    if (newToken) {
      localStorage.setItem('token', newToken);
      window.location.reload();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">JWT Token Debug</h1>
      
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Stored Token</h2>
        {token ? (
          <div>
            <p className="mb-2 font-mono text-sm break-all">{token}</p>
            <div className="flex space-x-4 mt-2">
              <button 
                onClick={clearToken}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Token
              </button>
              <button 
                onClick={setNewToken}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Set New Token
              </button>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No token found in localStorage</p>
        )}
      </div>
      
      {decodedToken && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Decoded Token</h2>
          <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
            {JSON.stringify(decodedToken, null, 2)}
          </pre>
          
          <div className="mt-4">
            <p className="text-sm">
              <strong>Subject:</strong> {decodedToken.sub}
            </p>
            {decodedToken.exp && (
              <p className="text-sm">
                <strong>Expires:</strong> {new Date(decodedToken.exp * 1000).toLocaleString()}
                {' '}
                ({new Date(decodedToken.exp * 1000) < new Date() ? (
                  <span className="text-red-500">Expired</span>
                ) : (
                  <span className="text-green-500">Valid</span>
                )})
              </p>
            )}
            {decodedToken.iat && (
              <p className="text-sm">
                <strong>Issued At:</strong> {new Date(decodedToken.iat * 1000).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Test Authentication</h2>
        <button 
          onClick={testAuthEndpoint}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Auth Endpoint
        </button>
        
        {testResponse && (
          <div className="mt-4">
            <h3 className="text-md font-medium mb-2">Response:</h3>
            <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
              {testResponse}
            </pre>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500 mt-8">
        <p>Debugging Tips:</p>
        <ul className="list-disc ml-5 mt-2">
          <li>Make sure your token is properly formatted (should have 3 parts separated by dots)</li>
          <li>Check if the token is expired</li>
          <li>Ensure your backend expects the "Bearer " prefix in Authorization header</li>
          <li>Check if you're using the correct token format (JWT, etc.)</li>
        </ul>
      </div>
    </div>
  );
};

export default TokenDebugPage;