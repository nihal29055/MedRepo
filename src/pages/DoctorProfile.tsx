import React, { useState } from "react";

const DoctorProfile: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleVisibility}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isVisible ? "Hide Message" : "Show Message"}
      </button>

      {isVisible && (
        <p className="mt-4 text-green-600 font-medium">
          This is a toggleable message!
        </p>
      )}
    </div>
  );
};

export default DoctorProfile;
