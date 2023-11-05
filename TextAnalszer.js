import React from "react";
import axios from "axios";

function TextAnalyzer() {
  const handleTextAnalysis = async () => {
    try {
      // Make a request to your server
      const response = await axios.post('http://localhost:3000/');
      console.log("Analysis Result:", response.data);
    } catch (error) {
      console.error("Error analyzing text: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleTextAnalysis}>Text Analyzer</button>
    </div>
  );
}

export default TextAnalyzer;
