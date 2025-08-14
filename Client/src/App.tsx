import React, { useState } from 'react';
import InputControls from './components/InputControls.tsx';
import ResultsPanel from './components/ResultsPanel.tsx';
import './App.css';
import { AnalyzeResult, validateText } from './components/utils/helpers.ts';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function analyzeText() {
    if (!validateText(text)) {
      setError('Text must be at least 3 characters long');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      });
      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setResults(data.data || data);
    } catch (e) {
      setError('Failed to analyze text. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setText('');
    setResults(null);
    setError('');
  }

  return (
    <div className="app-container">
      <h1>Bigram Analyzer</h1>
      <p>Enter text to analyze the most common word pairs</p>

      <InputControls
        text={text}
        setText={setText}
        loading={loading}
        onAnalyze={analyzeText}
        onClear={clearAll}
      />

      {error && <div className="error-box">{error}</div>}

      {results && <ResultsPanel results={results} />}
    </div>
  );
};

export default App;