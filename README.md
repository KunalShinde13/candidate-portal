# 🎥 Candidate Information & Video Submission Portal

A full-stack web application that allows candidates to submit their personal information, upload a PDF resume, record a short video introduction, and review their submission — all in one seamless flow.

---

## 🌟 Features

✅ **Candidate Information Form**
- Collects first name, last name, position applied for, current position, and experience.  
- Uploads resume (PDF only, ≤ 5MB).  
- Validates all fields before proceeding.

✅ **Video Recording Page**
- Displays clear instructions for what to include in the video.  
- Uses the **MediaRecorder API** to record live video and audio.  
- Displays a timer and automatically stops at 90 seconds.  
- Provides start and stop buttons for better user control.  

✅ **Review Page**
- Shows all submitted candidate details.  
- Provides a **Download Resume** button.  
- Embeds the recorded video for playback.  

✅ **Backend Integration**
- Node.js + Express handles API requests.  
- **Multer** manages PDF file uploads.  
- **MongoDB** stores candidate information, resume paths, and video data.  
- Full validation for file size and type.  

---

## 🧠 Tech Stack

| Layer | Technologies |
|--------|---------------|
| **Frontend** | React, TailwindCSS / Bootstrap |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Uploads** | Multer (Resume), MediaRecorder API (Video) |

---

## 📂 Folder Structure

candidate-portal/
│
├── backend/
│ ├── server.js # Express app entry
│ ├── routes/ # API routes
│ ├── models/ # Mongoose schemas
│ ├── controllers/ # Business logic (upload, save)
│ 
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── CandidateForm.jsx
│ │ │ ├── VideoRecorder.jsx
│ │ │ └── ReviewCandidate.jsx
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ └── package.json
│
└── README.md




## ⚙️ Setup Instructions

### 🧩 Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/)
- npm or yarn package manager

---

### 🔹 Clone the Repository
```bash
git clone https://github.com/KunalShinde13/candidate-portal

cd candidate-portal



## Backend Setup
npm install
npm start

## Frontend Setup
npm install
npm run start


