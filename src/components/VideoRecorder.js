import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VideoRecorder() {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (recording) {
      const id = setInterval(() => {
        setTimer((t) => {
          if (t >= 89) {
            // Auto-stop at 90s
            stopRecording(true);
            clearInterval(id);
            return 90;
          }
          return t + 1;
        });
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [recording]);

  const startRecording = async () => {
    setError("");
    setTimer(0);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    const localChunks = [];

    recorder.ondataavailable = (e) => localChunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(localChunks, { type: "video/webm" });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Data = reader.result;
        try {
          const res = await fetch(`http://localhost:5000/api/video/upload/${candidateId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoData: base64Data }),
          });
          const data = await res.json();
          if (res.ok) {
            alert("✅ Video Uploaded Successfully!");
            navigate(`/review/${candidateId}`);
          } else {
            alert("❌ Failed to upload video");
          }
        } catch (err) {
          console.error("Upload error:", err);
        }
      };
    };

    recorder.start();
    setChunks(localChunks);
    setRecording(true);
  };

  const stopRecording = (autoStop = false) => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") return;
    mediaRecorderRef.current.stop();
    setRecording(false);
    const tracks = videoRef.current.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
    if (autoStop) {
      setError("⚠️ Recording stopped automatically after 90 seconds.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800"></h1>
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl text-center border border-gray-200">
        <p className="text-gray-600 mb-4">
          🎥 <strong>Instructions:</strong> Introduce yourself, 
          explain your interest in this position,
          share relevant experience, and describe your long-term career goals.
        </p>

        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-72 bg-black rounded-lg shadow mb-4"
        />

        <p className="text-gray-700 mb-2">
          ⏱ Duration: <span className="font-semibold">{timer}s / 90s</span>
        </p>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex justify-center gap-4 mt-3">
          {!recording ? (
            <button
              onClick={startRecording}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={() => stopRecording(false)}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
            >
              Stop Recording
            </button>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          * Recording will automatically stop after 90 seconds.
        </p>
      </div>
    </div>
  );
}
