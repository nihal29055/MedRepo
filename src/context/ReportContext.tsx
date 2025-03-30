
import React, { createContext, useContext, useState } from "react";
import { MedicalReport, ReportFilter, ReportType } from "../types/medical";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

// Sample NLP analysis response structure
interface NLPAnalysisResult {
  summary: string;
  keyInsights: {
    diagnosis: string[];
    treatments: string[];
    medications: string[];
    followUp: string;
  };
}

interface ReportContextType {
  reports: MedicalReport[];
  isLoading: boolean;
  uploadReport: (file: File, type: ReportType, title?: string) => Promise<void>;
  getReportById: (id: string) => MedicalReport | undefined;
  filterReports: (filters: ReportFilter) => MedicalReport[];
  deleteReport: (id: string) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

// Sample reports data
const sampleReports: MedicalReport[] = [
  {
    id: "rep_1",
    patientId: "2",
    doctorId: "1",
    title: "Annual Physical Examination",
    type: "consultation",
    fileUrl: "/sample-report.pdf",
    originalText: "Patient presents for annual physical examination. Vitals are stable. Blood pressure 120/80. Heart rate 72 bpm. Patient reports occasional headaches. Recommended regular exercise and reducing screen time. Follow-up in 12 months.",
    summary: "Annual physical with normal vitals. Patient reports occasional headaches. Recommendations include exercise and reduced screen time.",
    createdAt: "2023-10-15T10:30:00Z",
    keyInsights: {
      diagnosis: ["Occasional tension headaches"],
      treatments: ["Lifestyle modifications"],
      medications: ["None prescribed"],
      followUp: "Annual follow-up in 12 months"
    },
    isProcessing: false
  },
  {
    id: "rep_2",
    patientId: "2",
    doctorId: "1",
    title: "Chest X-Ray Results",
    type: "radiology",
    fileUrl: "/sample-xray.pdf",
    originalText: "Chest X-ray performed on patient showing clear lung fields. No evidence of pneumonia, effusion, or mass. Heart size is within normal limits. No bony abnormalities detected.",
    summary: "Normal chest X-ray with no concerning findings.",
    createdAt: "2023-09-05T14:15:00Z",
    keyInsights: {
      diagnosis: ["Normal chest X-ray"],
      treatments: ["No intervention needed"],
      medications: [],
      followUp: "No follow-up required unless symptoms develop"
    },
    isProcessing: false
  }
];

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [reports, setReports] = useState<MedicalReport[]>(sampleReports);
  const [isLoading, setIsLoading] = useState(false);

  // Mock NLP processing function
  const processReportWithNLP = async (text: string): Promise<NLPAnalysisResult> => {
    // In a real app, this would call an NLP API
    // For demo, we'll simulate processing delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      summary: `Summarized version: ${text.substring(0, 100)}...`,
      keyInsights: {
        diagnosis: text.includes("headache") ? ["Potential headache disorder"] : ["Healthy, no concerns"],
        treatments: ["Rest", "Hydration"],
        medications: text.includes("prescription") ? ["Prescribed medication"] : ["No medications"],
        followUp: "Follow up in 2 weeks"
      }
    };
  };

  const uploadReport = async (file: File, type: ReportType, title?: string) => {
    if (!user) {
      toast.error("You must be logged in to upload reports");
      return;
    }

    setIsLoading(true);
    try {
      // Create a temporary report entry
      const tempId = `rep_${Date.now()}`;
      const newReport: MedicalReport = {
        id: tempId,
        patientId: user.role === 'patient' ? user.id : 'unknown',
        doctorId: user.role === 'doctor' ? user.id : undefined,
        title: title || file.name,
        type,
        fileUrl: URL.createObjectURL(file),
        originalText: "Processing document...",
        summary: "Analyzing...",
        createdAt: new Date().toISOString(),
        keyInsights: {
          diagnosis: [],
          treatments: [],
          medications: [],
          followUp: ""
        },
        isProcessing: true
      };

      // Add the temporary report
      setReports(prev => [newReport, ...prev]);
      toast.info("Processing your medical report...");

      // In a real app, we would upload the file to a server
      // and then process it with OCR/NLP
      
      // Simulate file reading and text extraction
      const reader = new FileReader();
      
      const textExtractionPromise = new Promise<string>((resolve) => {
        reader.onload = () => {
          // Simulate OCR text extraction
          setTimeout(() => {
            // This is mock text - in a real app, OCR would extract text from the file
            resolve(`Medical report for patient dated ${new Date().toLocaleDateString()}. 
              Patient presents with symptoms of fatigue and occasional headaches. 
              Vitals are normal. Recommended adequate rest and hydration. 
              No prescription needed at this time. Follow up if symptoms persist.`);
          }, 1500);
        };
        reader.readAsText(file);
      });
      
      // Get the extracted text
      const extractedText = await textExtractionPromise;
      
      // Use NLP to analyze the text
      const nlpResult = await processReportWithNLP(extractedText);
      
      // Update the report with processed data
      setReports(prev => prev.map(report => 
        report.id === tempId ? {
          ...report,
          originalText: extractedText,
          summary: nlpResult.summary,
          keyInsights: nlpResult.keyInsights,
          isProcessing: false
        } : report
      ));
      
      toast.success("Report processed successfully");
    } catch (error) {
      console.error("Error uploading report:", error);
      toast.error("Failed to process report. Please try again.");
      
      // Remove the temporary report
      setReports(prev => prev.filter(report => !report.isProcessing));
    } finally {
      setIsLoading(false);
    }
  };

  const getReportById = (id: string) => {
    return reports.find(report => report.id === id);
  };

  const filterReports = (filters: ReportFilter) => {
    let filteredReports = [...reports];
    
    // Filter by report type
    if (filters.type) {
      filteredReports = filteredReports.filter(report => report.type === filters.type);
    }
    
    // Filter by date range
    if (filters.dateRange) {
      filteredReports = filteredReports.filter(report => {
        const reportDate = new Date(report.createdAt);
        return reportDate >= filters.dateRange!.start && reportDate <= filters.dateRange!.end;
      });
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredReports = filteredReports.filter(report => 
        report.title.toLowerCase().includes(query) || 
        report.summary.toLowerCase().includes(query) ||
        report.originalText.toLowerCase().includes(query)
      );
    }
    
    return filteredReports;
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(report => report.id !== id));
    toast.success("Report deleted successfully");
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        isLoading,
        uploadReport,
        getReportById,
        filterReports,
        deleteReport
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useReports must be used within a ReportProvider");
  }
  return context;
};
