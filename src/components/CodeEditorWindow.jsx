import React from 'react'
import Editor from "@monaco-editor/react"
import { useState } from 'react';

function CodeEditorWindow({ onChange, language, code, theme, defaultValue, height, width }) {
    const [value, setValue] = useState(code || "");
  
    const handleEditorChange = (value) => {
      setValue(value);
      onChange(value);
    };
  
    return (
      <div className="rounded-md overflow-hidden w-full h-full">
        <Editor
          height={height || '85vh'}
          width={width || `100%`}
          language={language || "javascript"}
          value={value}
          theme={theme || 'vs-dark'}
          defaultValue={ defaultValue }
          onChange={handleEditorChange}
        />
      </div>
    );
  }

export default CodeEditorWindow
