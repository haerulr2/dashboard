'use client';

import { Plus, Send, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";


const apiEndpoints = [
  { name: 'Get To-Do Item', url: 'https://jsonplaceholder.typicode.com/todos/1', method: 'GET' },
  { name: 'Get All Posts', url: 'https://jsonplaceholder.typicode.com/posts', method: 'GET' },
  { name: 'Create a Post', url: 'https://jsonplaceholder.typicode.com/posts', method: 'POST' },
  { name: 'Get User #2', url: 'https://jsonplaceholder.typicode.com/users/2', method: 'GET' },
];

type Header = { key: string; value: string };

const PlaygroundContent = () => {
  const [selectedApi, setSelectedApi] = useState(apiEndpoints[0].url);
  const [method, setMethod] = useState(apiEndpoints[0].method);
  const [url, setUrl] = useState(apiEndpoints[0].url);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [requestTab, setRequestTab] = useState<'Headers' | 'Body'>('Headers');
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
  const [body, setBody] = useState('{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}');
  const [headerEditMode, setHeaderEditMode] = useState<'key-value' | 'bulk'>('key-value');
  const [bulkHeaders, setBulkHeaders] = useState('');

  useEffect(() => {
    const selected = apiEndpoints.find(api => api.url === selectedApi);
    if (selected) {
      setUrl(selected.url);
      setMethod(selected.method);
      if (selected.method === 'POST' || selected.method === 'PUT') {
        setRequestTab('Body');
      } else if (requestTab === 'Body') {
        setRequestTab('Headers');
      }
    }
  }, [selectedApi]);

  const parseBulkHeaders = (text: string): Header[] => {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line.includes(':'))
      .map(line => {
        const i = line.indexOf(':');
        const key = line.substring(0, i).trim();
        const value = line.substring(i + 1).trim();
        return { key, value };
      });
  };

  const handleSendRequest = async () => {
    setLoading(true);
    setResponse(null);

    let currentHeaders = headers;
    if (headerEditMode === 'bulk') {
      currentHeaders = parseBulkHeaders(bulkHeaders);
    }

    const fetchOptions: RequestInit = { method };
    const finalHeaders = new Headers();
    currentHeaders.forEach(header => {
      if (header.key && header.value) finalHeaders.append(header.key, header.value);
    });

    if (['POST', 'PUT'].includes(method)) {
      try {
        JSON.parse(body);
        finalHeaders.append('Content-Type', 'application/json; charset=UTF-8');
        fetchOptions.body = body;
      } catch (error) {
        setResponse({ status: 400, statusText: 'Bad Request', data: { message: 'Body is not valid JSON.', error: String(error) } });
        setLoading(false);
        return;
      }
    }

    fetchOptions.headers = finalHeaders;

    try {
      const res = await fetch(url, fetchOptions);
      const data = await res.json();
      setResponse({ status: res.status, statusText: res.statusText, data: data });
    } catch (error: any) {
      setResponse({ status: 500, statusText: 'Fetch Error', data: { message: error.message } });
    } finally {
      setLoading(false);
    }
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);
  const removeHeader = (index: number) => setHeaders(headers.filter((_, i) => i !== index));

  const switchToBulkEdit = () => {
    const bulkString = headers.map(h => (h.key || h.value) ? `${h.key}: ${h.value}` : '').filter(Boolean).join('\n');
    setBulkHeaders(bulkString);
    setHeaderEditMode('bulk');
  };

  const switchToKeyValue = () => {
    const parsedHeaders = parseBulkHeaders(bulkHeaders);
    setHeaders(parsedHeaders.length > 0 ? parsedHeaders : [{ key: '', value: '' }]);
    setHeaderEditMode('key-value');
  };

  const isBodyApplicable = ['POST', 'PUT'].includes(method);

  return (
    <main className="flex-1 p-6 lg:p-8 overflow-y-auto flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">API Playground</h1>
        <p className="text-default-400 mt-1">Test your endpoints directly from the dashboard.</p>
      </div>
      
      <div className="flex-1">
        <label htmlFor="api-select" className="text-sm font-medium text-default-400 block mb-2">Select an API Endpoint</label>
        <select id="api-select" value={selectedApi} onChange={(e) => setSelectedApi(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
          {apiEndpoints.map(api => (<option key={api.name} value={api.url}>{api.name}</option>))}
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/data" className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        <button onClick={handleSendRequest} disabled={loading} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-900 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition-colors">
          {loading ? 'Sending...' : 'Send'} <Send />
        </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl min-h-[250px]">
        <div className="flex border-b border-gray-700">
          <button onClick={() => setRequestTab('Headers')} className={`px-4 py-2 font-medium ${requestTab === 'Headers' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}>Headers</button>
          {isBodyApplicable && <button onClick={() => setRequestTab('Body')} className={`px-4 py-2 font-medium ${requestTab === 'Body' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}>Body</button>}
        </div>

        {requestTab === 'Headers' && (
          <div className="p-4">
            <div className="flex justify-end items-center mb-3">
              <div className="bg-gray-900 rounded-md p-0.5 flex">
                <button onClick={switchToKeyValue} className={`px-2 py-0.5 text-xs rounded ${headerEditMode === 'key-value' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Key-Value</button>
                <button onClick={switchToBulkEdit} className={`px-2 py-0.5 text-xs rounded ${headerEditMode === 'bulk' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Bulk Edit</button>
              </div>
            </div>
            {headerEditMode === 'key-value' ? (
              <div className="space-y-2">
                {headers.map((header, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input type="text" placeholder="Key" value={header.key} onChange={(e) => handleHeaderChange(index, 'key', e.target.value)} className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 text-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500" />
                    <input type="text" placeholder="Value" value={header.value} onChange={(e) => handleHeaderChange(index, 'value', e.target.value)} className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 text-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500" />
                    <button onClick={() => removeHeader(index)} className="p-1.5 text-gray-500 hover:text-red-400"><Trash2 /></button>
                  </div>
                ))}
                <button onClick={addHeader} className="flex items-center gap-1 text-sm text-teal-400 hover:text-teal-300 font-semibold pt-2"><Plus /> Add Header</button>
              </div>
            ) : (
              <textarea value={bulkHeaders} onChange={(e) => setBulkHeaders(e.target.value)} className="w-full h-32 bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-300 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 resize-y" placeholder="Enter headers in key:value format, one per line."></textarea>
            )}
          </div>
        )}

        {requestTab === 'Body' && isBodyApplicable && (<div className="p-4 h-full"><textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full h-48 bg-gray-900 border border-gray-700 rounded-md p-3 text-teal-300 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none" placeholder="Enter JSON body..."></textarea></div>)}
        {requestTab === 'Body' && !isBodyApplicable && (<div className="p-6 text-center text-gray-500"><p>Request body is not applicable for {method} method.</p></div>)}
      </div>

      <div className="flex-1 flex flex-col bg-gray-800 border border-gray-700 rounded-xl">
        <div className="p-4 border-b border-gray-700"><h2 className="text-lg font-semibold text-white">Response</h2></div>
        {loading && <div className="p-6 text-center text-gray-400">Loading...</div>}
        {response && (
          <div className="p-4">
            <div className="flex items-center gap-4 text-sm mb-4"><span>Status: <span className={`font-semibold ${response.status >= 200 && response.status < 300 ? 'text-green-400' : 'text-red-400'}`}>{response.status} {response.statusText}</span></span></div>
            <pre className="bg-gray-900 text-sm text-teal-300 p-4 rounded-lg overflow-x-auto"><code>{JSON.stringify(response.data, null, 2)}</code></pre>
          </div>
        )}
        {!loading && !response && (<div className="p-6 text-center text-gray-400"><p>Select an API and click "Send" to make a request.</p></div>)}
      </div>
    </main>
  );
}

export default PlaygroundContent;
