const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientName: { type: String, required: true },
  reportType: { type: String, required: true },
  reportDate: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true },
});

module.exports = mongoose.model("Report", reportSchema);