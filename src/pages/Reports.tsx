import React, { useState } from "react";
import { useReports } from "../context/ReportContext";
import Header from "../components/layout/Header";
import ReportCard from "../components/reports/ReportCard";
import UploadReportForm from "../components/reports/UploadReportForm";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import { 
  FileUp, 
  Search, 
  Filter, 
  Calendar,
  Plus,
  RefreshCw,
  SlidersHorizontal 
} from "lucide-react";
import { ReportType } from "../types/medical";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { format } from "date-fns";

const Reports = () => {
  const { reports, isLoading } = useReports();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ReportType | "all">("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Filter reports
  const filteredReports = reports.filter(report => {
    // Filter by search query
    const matchesSearch = 
      searchQuery === "" || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    
    // Filter by date
    const matchesDate = !date || 
      format(new Date(report.createdAt), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    
    return matchesSearch && matchesType && matchesDate;
  });
  
  // Sort reports by date (newest first)
  const sortedReports = [...filteredReports].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const resetFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setDate(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medical Reports</h1>
              <p className="text-gray-600">
                Manage and analyze all your medical reports
              </p>
            </div>
            
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Medical Report</DialogTitle>
                </DialogHeader>
                <UploadReportForm />
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Filters Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Search reports by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as ReportType | "all")}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Report type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="lab">Lab Results</SelectItem>
                  <SelectItem value="radiology">Radiology</SelectItem>
                  <SelectItem value="pathology">Pathology</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="discharge">Discharge</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    {date ? format(date, "MMM dd, yyyy") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={resetFilters}
                className="h-10 w-10"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {filteredReports.length} of {reports.length} reports
              </div>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Advanced Filters</span>
              </Button>
            </div>
          </div>
          
          {/* Reports Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">
                <RefreshCw className="h-8 w-8 text-medical-primary" />
              </div>
              <p className="mt-4 text-gray-600">Loading reports...</p>
            </div>
          ) : sortedReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileUp className="h-12 w-12 mx-auto text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No reports found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {reports.length > 0 
                  ? "Try adjusting your filters or search query" 
                  : "Upload your first medical report to get started"}
              </p>
              {reports.length === 0 && (
                <Button 
                  className="mt-4" 
                  onClick={() => setUploadOpen(true)}
                >
                  Upload a Report
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reports;
