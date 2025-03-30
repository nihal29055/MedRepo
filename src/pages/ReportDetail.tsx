
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReports } from "../context/ReportContext";
import Header from "../components/layout/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Download, Calendar, User, FileText, Share2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const ReportDetail = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const { getReportById, deleteReport } = useReports();
  
  // Get the specific report
  const report = getReportById(reportId || "");

  if (!report) {
    // Return 404 or redirect
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container px-4 py-8 mx-auto flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
            <p className="text-gray-600 mt-2">The report you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4" onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "lab": return "bg-blue-100 text-blue-800";
      case "radiology": return "bg-purple-100 text-purple-800";
      case "pathology": return "bg-red-100 text-red-800";
      case "consultation": return "bg-green-100 text-green-800";
      case "discharge": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      deleteReport(report.id);
      toast.success("Report successfully deleted");
      navigate("/dashboard");
    }
  };

  const handleShare = () => {
    // In a real app, this would open a sharing dialog
    toast.info("Sharing functionality is not implemented in this demo");
  };

  const handleDownload = () => {
    // In a real app, this would download the report
    toast.info("Download functionality is not implemented in this demo");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getReportTypeColor(report.type)}>
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </Badge>
                <span className="text-gray-500 text-sm flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(report.createdAt), "MMM d, yyyy")}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{report.title}</h1>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Summary Card */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-medical-primary" />
                AI Summary
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {report.summary}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Key Insights */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Diagnosis</h3>
                  {report.keyInsights.diagnosis.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {report.keyInsights.diagnosis.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No diagnoses identified</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Treatments</h3>
                  {report.keyInsights.treatments.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {report.keyInsights.treatments.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No treatments specified</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Medications</h3>
                  {report.keyInsights.medications.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {report.keyInsights.medications.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No medications prescribed</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Follow-up</h3>
                  <p className="text-gray-700">
                    {report.keyInsights.followUp || "No specific follow-up instructions"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Original Text Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Original Report</h2>
                <div className="bg-gray-50 p-4 rounded-md max-h-[500px] overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-line font-mono text-sm">
                    {report.originalText}
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Report Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <User className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Patient ID</p>
                        <p className="text-gray-700">{report.patientId}</p>
                      </div>
                    </div>
                    {report.doctorId && (
                      <div className="flex items-start">
                        <User className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Doctor ID</p>
                          <p className="text-gray-700">{report.doctorId}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Created Date</p>
                        <p className="text-gray-700">
                          {format(new Date(report.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportDetail;
