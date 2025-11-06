import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CandidateForm from "./components/CandidateForm";
import VideoRecorder from "./components/VideoRecorder";
import ReviewPage from "./components/ReviewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateForm />} />
        <Route path="/video/:candidateId" element={<VideoRecorder />} />
        <Route path="/review/:candidateId" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
