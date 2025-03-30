import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useReports } from "../context/ReportContext";
import Header from "../components/layout/Header";
import ReportCard from "../components/reports/ReportCard";
import UploadReportForm from "../components/reports/UploadReportForm";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { FileUp, Search, Plus, FileText, BarChart, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";

const Dashboard = () => {
  const { user } = useAuth();
  const { reports, isLoading } = useReports();
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  // Filter reports based on search query
  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.keyInsights.diagnosis.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get the 5 most recent reports
  const recentReports = [...filteredReports]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const greetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="space-y-8">
          {/* Greeting Section */}
          <section className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {greetingMessage()}, {user?.name?.split(" ")[0]}
              </h1>
              <p className="text-gray-600 mt-1">
                Here's a summary of your health information
              </p>
            </div>
            
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Medical Report</DialogTitle>
                </DialogHeader>
                <UploadReportForm />
              </DialogContent>
            </Dialog>
          </section>
          
          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-medical-secondary to-medical-primary text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Total Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{reports.length}</p>
                <p className="text-sm opacity-80">Across all categories</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-medical-primary">85/100</p>
                <p className="text-sm text-gray-500">Based on latest reports</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {reports.length > 0 ? "Your reports show normal health patterns" : "Upload reports to get AI insights"}
                </p>
              </CardContent>
            </Card>
          </section>
          
          {/* Recent Reports with Search */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Medical Reports</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Reports</TabsTrigger>
                <TabsTrigger value="lab">Lab Results</TabsTrigger>
                <TabsTrigger value="radiology">Radiology</TabsTrigger>
                <TabsTrigger value="consultation">Consultations</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-6 w-full" />
                          <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-5/6 mb-2" />
                          <Skeleton className="h-4 w-4/6" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : recentReports.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {recentReports.map((report) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <FileUp className="h-12 w-12 mx-auto text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No reports yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload your first medical report to get started
                    </p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setUploadOpen(true)}
                    >
                      Upload a Report
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="lab" className="mt-4">
                {/* Lab results tab content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {recentReports
                    .filter(report => report.type === "lab")
                    .map((report) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                </div>
                {recentReports.filter(report => report.type === "lab").length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No lab reports found</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="radiology" className="mt-4">
                {/* Radiology tab content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {recentReports
                    .filter(report => report.type === "radiology")
                    .map((report) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                </div>
                {recentReports.filter(report => report.type === "radiology").length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No radiology reports found</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="consultation" className="mt-4">
                {/* Consultation tab content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {recentReports
                    .filter(report => report.type === "consultation")
                    .map((report) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                </div>
                {recentReports.filter(report => report.type === "consultation").length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No consultation reports found</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
