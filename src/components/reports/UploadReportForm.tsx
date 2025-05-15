import React, { useState } from "react";
import { useReports } from "../../context/ReportContext";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useToast } from "../../components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ReportType } from "../../types/medical";
import { FileUp, FileText, X } from "lucide-react";

const UploadReportForm: React.FC = () => {
  const { uploadReport, isLoading } = useReports();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [reportType, setReportType] = useState<ReportType>("consultation");
  const [title, setTitle] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Set a default title based on the filename if title is empty
      if (!title) {
        setTitle(selectedFile.name.split(".")[0].replace(/_/g, " "));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);

      // Set a default title based on the filename if title is empty
      if (!title) {
        setTitle(droppedFile.name.split(".")[0].replace(/_/g, " "));
      }
    }
  };

  const clearSelectedFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a file to upload.",
      });
      return;
    }

    try {
      // Backend integration for uploading the filenom 
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", reportType);
      formData.append("title", title);

      const response = await fetch("/api/reports/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the report");
      }

      const result = await response.json();
      toast({
        variant: "success",
        title: "Upload Successful",
        description: "Your report has been uploaded and is being processed.",
      });

      // Reset form
      setFile(null);
      setTitle("");
      setReportType("consultation");
    } catch (error) {
      console.error("Error uploading report:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "There was a problem uploading your report.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Report Title</Label>
        <Input
          id="title"
          placeholder="Enter report title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="report-type">Report Type</Label>
        <Select
          value={reportType}
          onValueChange={(value) => setReportType(value as ReportType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lab">Laboratory Results</SelectItem>
            <SelectItem value="radiology">Radiology Report</SelectItem>
            <SelectItem value="pathology">Pathology Report</SelectItem>
            <SelectItem value="consultation">Consultation Notes</SelectItem>
            <SelectItem value="discharge">Discharge Summary</SelectItem>
            <SelectItem value="other">Other Medical Document</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Upload Document</Label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-medical-primary bg-medical-secondary/30"
              : "border-gray-300 hover:border-medical-primary"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
            onChange={handleFileChange}
          />

          {!file ? (
            <div className="py-4">
              <FileUp className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium">Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">
                Supports PDF, JPG, PNG, TXT, DOC files
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-medical-primary" />
                <span className="text-sm font-medium truncate max-w-[200px]">
                  {file.name}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelectedFile();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !file}>
        {isLoading ? "Processing..." : "Upload and Analyze Report"}
      </Button>
    </form>
  );
};

export default UploadReportForm;