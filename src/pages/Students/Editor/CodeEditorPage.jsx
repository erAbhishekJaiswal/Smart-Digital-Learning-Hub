// components/CodeEditorPage.js
import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import PreviewPanel from './PreviewPanel';
import ChallengePanel from './ChallengePanel';
import Toolbar from './Toolbar';
import './CodeEditorPage.css';
import Header from '../../../Components/PublicComp/Header';
import Footer from '../../../Components/PublicComp/Footer';

const CodeEditorPage = () => {
  const [html, setHtml] = useState('<!-- Write your HTML here -->\n<div class="container">\n  <h1>Hello, Student!</h1>\n  <p>Start coding to see the preview</p>\n</div>');
  const [css, setCss] = useState('/* Write your CSS here */\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #2c3e50;\n  text-align: center;\n}\n\np {\n  color: #7f8c8d;\n  line-height: 1.6;\n}');
  const [js, setJs] = useState('// Write your JavaScript here\nconsole.log("Hello from JavaScript!");\n\ndocument.addEventListener("DOMContentLoaded", function() {\n  // Your interactive code here\n});');
  const [srcDoc, setSrcDoc] = useState('');
  const [activeTab, setActiveTab] = useState('html');
  const [isRunning, setIsRunning] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const challenges = [
    {
      id: 1,
      title: "Create a Responsive Card",
      description: "Build a card component that works on both desktop and mobile devices.",
      requirements: [
        "Card should have an image, title, description, and button",
        "Use flexbox for layout",
        "Make it responsive with media queries",
        "Add hover effects"
      ],
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Build a Todo List",
      description: "Create an interactive todo list with add and delete functionality.",
      requirements: [
        "Add new todos",
        "Delete todos",
        "Mark todos as complete",
        "Local storage persistence"
      ],
      difficulty: "Intermediate"
    }
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>${css}</style>
        </head>
        <body>${html}</body>
        <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1000);
  };

  const resetCode = () => {
    setHtml('<!-- Write your HTML here -->\n<div class="container">\n  <h1>Reset Complete!</h1>\n  <p>Start coding again</p>\n</div>');
    setCss('/* Write your CSS here */\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n}');
    setJs('// Write your JavaScript here\nconsole.log("Reset!");');
  };

  return (
    <div className="student-editor-container">
      {/* <Header /> */}

      <div className="student-editor-layout">
        {/* Left Panel - Editor */}
        <div className="student-editor-panel">
          <Toolbar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            runCode={runCode}
            resetCode={resetCode}
            isRunning={isRunning}
          />
          
          <div className="student-code-editors">
            <CodeEditor
              language="xml"
              displayName="HTML"
              value={html}
              onChange={setHtml}
              isActive={activeTab === 'html'}
            />
            <CodeEditor
              language="css"
              displayName="CSS"
              value={css}
              onChange={setCss}
              isActive={activeTab === 'css'}
            />
            <CodeEditor
              language="javascript"
              displayName="JS"
              value={js}
              onChange={setJs}
              isActive={activeTab === 'js'}
            />
          </div>

          {/* <ChallengePanel 
            challenges={challenges}
            currentChallenge={currentChallenge}
            setCurrentChallenge={setCurrentChallenge}
          /> */}
        </div>

        {/* Right Panel - Preview */}
        <div className="student-preview-panel">
          <PreviewPanel srcDoc={srcDoc} />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default CodeEditorPage;