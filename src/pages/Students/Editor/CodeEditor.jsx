// components/CodeEditor.js
import React from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ language, displayName, value, onChange, isActive }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    alert('Code copied to clipboard!');
  }
  return (
    <div className={`student-code-editor-wrapper ${isActive ? 'student-editor-active' : 'student-editor-hidden'}`}>
      <div className="student-editor-header">
        <div className="student-editor-title">
          <span className="student-language-icon">{displayName}</span>
          <span className="student-file-type">{displayName} File</span>
        </div>
        <div className="student-editor-actions">
          <button className="student-editor-btn student-copy-btn" onClick={handleCopy}>
            Copy
          </button>
        </div>
      </div>
      
      <div className="student-monaco-container">
        <Editor
          height="100%"
          language={language}
          value={value}
          onChange={onChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            folding: true,
            lineNumbersMinChars: 3,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible'
            }
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;