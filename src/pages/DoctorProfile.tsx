import React, { useEffect, useState } from "react";

interface DoctorProfileData {
  name: string;
  specialization: string;
  patientsChecked: number;
  experience: number; // in years
  recentReports: { patientName: string; reportDate: string; reportType: string }[];
}

const DoctorProfile: React.FC = () => {
  const [doctorData, setDoctorData] = useState<DoctorProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching doctor profile data from an API
    const fetchDoctorData = async () => {
      try {
        // Replace with actual API call
        const response = await fetch("/api/doctor/profile");
        if (!response.ok) {
          throw new Error("Failed to fetch doctor profile data");
        }
        const data: DoctorProfileData = await response.json();
        setDoctorData(data);
      } catch (error) {
        console.error("Error fetching doctor profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  if (isLoading) {
    return <p className="text-center mt-4">Loading doctor profile...</p>;
  }

  if (!doctorData) {
    return <p className="text-center mt-4 text-red-500">Failed to load doctor profile.</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Doctor Profile</h1>

      <div className="space-y-4">
        {/* Doctor Information */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Dr. {doctorData.name}</h2>
          <p className="text-gray-600">Specialization: {doctorData.specialization}</p>
          <p className="text-gray-600">Experience: {doctorData.experience} years</p>
          <p className="text-gray-600">Patients Checked: {doctorData.patientsChecked}</p>
        </div>

        {/* Recent Reports */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Recent Reports</h2>
          {doctorData.recentReports.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {doctorData.recentReports.map((report, index) => (
                <li key={index} className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <div>
                    <p className="text-gray-800 font-medium">{report.patientName}</p>
                    <p className="text-gray-600 text-sm">{report.reportType}</p>
                  </div>
                  <p className="text-gray-500 text-sm">{report.reportDate}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2">No recent reports available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;