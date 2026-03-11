const User = require("../models/User");
const Report = require("../models/Report");

exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const [patientsChecked, recentReports] = await Promise.all([
      Report.countDocuments({ doctorId: req.user.id }),
      Report.find({ doctorId: req.user.id })
        .sort({ reportDate: -1 })
        .limit(5)
        .select("patientName reportDate reportType"),
    ]);

    res.status(200).json({
      name: doctor.name,
      specialization: doctor.specialization || "General",
      patientsChecked,
      experience: doctor.experience || 0,
      recentReports: recentReports.map((report) => ({
        patientName: report.patientName,
        reportDate: report.reportDate,
        reportType: report.reportType,
      })),
    });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};