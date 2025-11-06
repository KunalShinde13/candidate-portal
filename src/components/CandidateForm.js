import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CandidateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    positionApplied: "",
    currentPosition: "",
    experience: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle field change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.positionApplied)
      newErrors.positionApplied = "Position is required";
    if (!formData.currentPosition)
      newErrors.currentPosition = "Current position is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.resume) newErrors.resume = "Resume is required";
    else if (formData.resume.type !== "application/pdf")
      newErrors.resume = "Only PDF files allowed";
    else if (formData.resume.size > 5 * 1024 * 1024)
      newErrors.resume = "File must be ≤ 5MB";
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validate();
  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/candidates/upload", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log("✅ Backend Response:", data);

      if (response.ok) {
        localStorage.setItem("candidateId", data.candidateId);
        alert("✅ Candidate data saved successfully!");
        navigate(`/video/${data.candidateId}`);
      } else {
        alert("❌ Failed to save candidate data: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error while saving data");
    }
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Candidate Information Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields */}
          {[
            { name: "firstName", label: "First Name" },
            { name: "lastName", label: "Last Name" },
            { name: "positionApplied", label: "Position Applied For" },
            { name: "currentPosition", label: "Current Position" },
            { name: "experience", label: "Experience (Years)", type: "number" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {/* Resume Upload */}
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Resume (PDF ≤ 5MB)
            </label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Next ➜"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CandidateForm;
