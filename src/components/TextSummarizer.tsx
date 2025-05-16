import React, { useState } from "react";
import axios from "axios";

const TextSummarizer: React.FC = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    const response = await fetch("/api/nlp/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setSummary(data.summary);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize"
        rows={6}
        cols={50}
      />
      <button onClick={handleSummarize}>Summarize</button>
      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;