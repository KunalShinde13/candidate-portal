import express from "express";
import multer from "multer";
import Candidate from "../models/Candidate.js";

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("📥 Incoming form data:", req.body);
    console.log("📎 File info:", req.file?.originalname);

    if (!req.file) {
      return res.status(400).json({ message: "Resume file missing" });
    }

    const {
      firstName,
      lastName,
      positionApplied,
      currentPosition,
      experience,
    } = req.body;

    // Convert experience safely to number
    const experienceYears = Number(experience) || 0;

    const newCandidate = new Candidate({
      firstName,
      lastName,
      positionApplied,
      currentPosition,
      experience: experienceYears,
      resume: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        originalName: req.file.originalname,
      },
      video: "", // empty placeholder
    });

    await newCandidate.save();

    console.log("✅ Candidate saved:", newCandidate._id);

    res.status(201).json({
      message: "✅ Candidate data saved successfully",
      candidateId: newCandidate._id,
    });
  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    res.status(500).json({
      message: "❌ Error while saving data",
      error: err.message,
    });
  }
});

// route to download resume later
// 📄 Download resume
router.get("/resume/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate || !candidate.resume || !candidate.resume.data) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.set({
      "Content-Type": candidate.resume.contentType,
      "Content-Disposition": `attachment; filename="${candidate.resume.originalName}"`,
      "Content-Transfer-Encoding": "binary",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
    });

    res.end(candidate.resume.data, "binary");
  } catch (err) {
    console.error("Error sending resume:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
