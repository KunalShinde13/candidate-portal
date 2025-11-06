import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReviewCandidate() {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/video/${candidateId}`);
        const data = await res.json();
        setCandidate(data);
      } catch (err) {
        console.error("Error fetching candidate:", err);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  if (!candidate)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-200 text-lg bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700">
        Loading candidate details...
      </div>
    );

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 max-w-6xl w-full text-white">
        <h1 className="text-4xl font-extrabold text-center mb-10 drop-shadow-lg">
          Review Candidate Information
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Candidate Details */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-300 text-center">
              Candidate Details
            </h2>

            <table className="w-full text-white text-lg">
              <tbody>
                <tr className="border-b border-white/30">
                  <td className="py-2 font-semibold w-1/2">First Name:</td>
                  <td className="py-2">{candidate.firstName}</td>
                </tr>
                <tr className="border-b border-white/30">
                  <td className="py-2 font-semibold">Last Name:</td>
                  <td className="py-2">{candidate.lastName}</td>
                </tr>
                <tr className="border-b border-white/30">
                  <td className="py-2 font-semibold">Position Applied:</td>
                  <td className="py-2">{candidate.positionApplied}</td>
                </tr>
                <tr className="border-b border-white/30">
                  <td className="py-2 font-semibold">Current Position:</td>
                  <td className="py-2">{candidate.currentPosition}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Experience:</td>
                  <td className="py-2">{candidate.experience} years</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-8 text-center">
              <a
                href={`http://localhost:5000/api/candidates/resume/${candidateId}`}
                download
                className="inline-block px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md transition-all"
              >
                📄 Download Resume
              </a>
            </div>
          </div>

          {/* Right: Video */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-md flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-300 text-center">
              Recorded Video
            </h2>

            {candidate.video && candidate.video.startsWith("data:video/") ? (
              <video
                controls
                src={candidate.video}
                className="w-full max-w-md rounded-lg shadow-lg border border-white/20"
              />
            ) : (
              <p className="text-gray-200 italic">No video available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
