const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  try {
    const { issueType, description, images, location } = req.body;

    const complaint = await Complaint.create({
      issueType,
      description,
      images,
      location,
    });

    res.status(201).json({
      success: true,
      complaintId: complaint._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save complaint",
    });
  }
};


exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch complaints",
    });
  }
};
