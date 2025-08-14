import React from 'react';
import '../App.css';

interface InputControlsProps {
  text: string;
  setText: (value: string) => void;
  loading: boolean;
  onAnalyze: () => void;
  onClear: () => void;
}

const InputControls: React.FC<InputControlsProps> = ({ text, setText, loading, onAnalyze, onClear }) => (
  <div className="input-controls">
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter your text here"
      rows={6}
      cols={80}
      className="text-area"
    />
    <div className="char-count">{text.length} characters</div>

    <div className="button-group">
      <button onClick={onAnalyze} disabled={loading || text.length < 3} className="analyze-btn">
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      <button onClick={onClear} className="clear-btn">Clear</button>
    </div>
  </div>
);

export default InputControls;