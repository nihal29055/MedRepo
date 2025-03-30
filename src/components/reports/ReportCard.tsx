
import React from "react";
import { MedicalReport } from "../../types/medical";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { FileText, Trash2, Download, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useReports } from "../../context/ReportContext";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";

interface ReportCardProps {
  report: MedicalReport;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const { deleteReport } = useReports();
  
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
    if (window.confirm("Are you sure you want to delete this report?")) {
      deleteReport(report.id);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={`${getReportTypeColor(report.type)} mb-2`}>
              {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
            </Badge>
            <CardTitle className="text-lg font-medium">{report.title}</CardTitle>
            <CardDescription>
              {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
            </CardDescription>
          </div>
          <FileText className="text-medical-primary h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent>
        {report.isProcessing ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse-slow"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse-slow w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse-slow w-4/6"></div>
          </div>
        ) : (
          <div>
            <p className="text-sm line-clamp-3 text-gray-600 mb-2">
              {report.summary}
            </p>
            {report.keyInsights.diagnosis.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-semibold text-gray-500">Diagnosis</p>
                <p className="text-sm">{report.keyInsights.diagnosis.join(", ")}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/reports/${report.id}`}>
            <ExternalLink className="mr-1 h-4 w-4" /> 
            View Report
          </Link>
        </Button>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-red-500 hover:text-red-700" 
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
