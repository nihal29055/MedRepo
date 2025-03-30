
import React from "react";
import { useReports } from "../context/ReportContext";
import Header from "../components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { 
  Activity, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  Heart, 
  Pill, 
  Cpu,
  Brain,
  FileQuestion,
  BookOpen
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { 
  Area, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const Insights = () => {
  const { reports } = useReports();

  // Mock data for health trends
  const healthTrendData = [
    { month: "Jan", bloodPressure: 120, heartRate: 72, bloodSugar: 95 },
    { month: "Feb", bloodPressure: 124, heartRate: 74, bloodSugar: 92 },
    { month: "Mar", bloodPressure: 118, heartRate: 71, bloodSugar: 94 },
    { month: "Apr", bloodPressure: 122, heartRate: 73, bloodSugar: 97 },
    { month: "May", bloodPressure: 119, heartRate: 72, bloodSugar: 93 },
    { month: "Jun", bloodPressure: 121, heartRate: 70, bloodSugar: 91 }
  ];

  // Mock recommendations based on reports
  const generateRecommendations = () => {
    if (reports.length === 0) {
      return [
        "Upload your first medical report to get personalized recommendations",
        "Regular health check-ups are recommended for preventive care",
        "Consider tracking your daily health metrics for better insights"
      ];
    }
    
    const containsHeadache = reports.some(report => 
      report.originalText.toLowerCase().includes("headache") || 
      report.keyInsights.diagnosis.some(d => d.toLowerCase().includes("headache"))
    );
    
    const recommendations = [
      "Maintain a consistent sleep schedule of 7-8 hours per night",
      "Stay hydrated by drinking at least 2 liters of water daily",
      "Include 30 minutes of moderate exercise in your daily routine"
    ];
    
    if (containsHeadache) {
      recommendations.push(
        "For headache management, reduce screen time and practice relaxation techniques",
        "Consider keeping a headache journal to identify triggers"
      );
    }
    
    return recommendations;
  };

  const recommendations = generateRecommendations();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="space-y-8">
          {/* Header Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health Insights</h1>
            <p className="text-gray-600">
              AI-powered analysis and recommendations based on your medical reports
            </p>
          </div>
          
          {/* Health Overview Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-medical-primary" />
              Health Overview
            </h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Overall Health Score</span>
                    <div className="mt-1 flex items-baseline">
                      <span className="text-3xl font-semibold text-medical-primary">85</span>
                      <span className="ml-1 text-sm text-gray-500">/100</span>
                    </div>
                    <span className="flex items-center text-sm text-green-600 mt-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-1" />
                      Up from 82 last month
                    </span>
                    <p className="text-sm text-gray-600 mt-3">
                      Your health metrics are within normal ranges based on your recent reports.
                    </p>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Latest Assessment</span>
                    <span className="text-lg font-medium mt-1">
                      {reports.length > 0 ? "Healthy" : "No data available"}
                    </span>
                    <span className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {reports.length > 0 
                        ? `Based on report from ${format(new Date(reports[0].createdAt), "MMM d, yyyy")}` 
                        : "Upload reports to get insights"}
                    </span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Areas of Attention</span>
                    {reports.length > 0 ? (
                      <>
                        <div className="flex items-center mt-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                          <span className="text-sm">Occasional headaches reported</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <Heart className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">Cardiovascular health normal</span>
                        </div>
                      </>
                    ) : (
                      <div className="mt-2 text-sm text-gray-500">
                        No health data to analyze yet
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Health Trends Chart */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-medical-primary" />
              Health Trends
            </h2>
            
            <Card>
              <CardContent className="pt-6">
                {reports.length > 0 ? (
                  <>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={healthTrendData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorHR" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#7E69AB" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorBS" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="bloodPressure" 
                            stroke="#0EA5E9" 
                            fillOpacity={1} 
                            fill="url(#colorBP)" 
                            name="Blood Pressure"
                            unit=" mmHg"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="heartRate" 
                            stroke="#7E69AB" 
                            fillOpacity={1} 
                            fill="url(#colorHR)" 
                            name="Heart Rate"
                            unit=" bpm"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="bloodSugar" 
                            stroke="#10B981" 
                            fillOpacity={1} 
                            fill="url(#colorBS)" 
                            name="Blood Sugar"
                            unit=" mg/dL"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center mt-4 gap-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-medical-primary mr-2"></div>
                        <span className="text-sm text-gray-700">Blood Pressure</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-medical-accent mr-2"></div>
                        <span className="text-sm text-gray-700">Heart Rate</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-gray-700">Blood Sugar</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <FileQuestion className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">No Health Data Available</h3>
                    <p className="text-sm text-gray-500 text-center mt-2 max-w-md">
                      Upload your medical reports to start tracking your health trends over time. 
                      The more reports you add, the more accurate your health insights will be.
                    </p>
                    <Link to="/reports">
                      <Button className="mt-4">
                        Go to Reports
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
          
          {/* Recommendations & Analysis Tabs */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Cpu className="h-5 w-5 text-medical-primary" />
              AI Analysis & Recommendations
            </h2>
            
            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recommendations">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span className="hidden sm:inline">Recommendations</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="medications">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    <span className="hidden sm:inline">Medications</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="resources">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Resources</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommendations">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Health Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recommendations.map((recommendation, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-medical-primary font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-gray-700">{recommendation}</p>
                          </div>
                        </div>
                      ))}
                      
                      {reports.length > 0 && (
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
                          <div className="flex items-start gap-3">
                            <div className="text-blue-500 mt-0.5">
                              <AlertCircle className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-700">Important Note</h4>
                              <p className="text-sm text-blue-600 mt-1">
                                These recommendations are generated by AI based on your medical reports.
                                Always consult with your healthcare provider before making changes to your health regimen.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medications">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medication Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {reports.some(report => report.keyInsights.medications.length > 0) ? (
                      <div className="space-y-4">
                        {/* Medication insights would go here */}
                        <p className="text-gray-700">
                          Based on your medical reports, you have been prescribed the following medications:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {reports
                            .flatMap(report => report.keyInsights.medications)
                            .filter(med => med && med !== "No medications" && med !== "None prescribed")
                            .map((med, index) => (
                              <li key={index}>{med}</li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Pill className="h-12 w-12 mx-auto text-gray-300" />
                        <p className="mt-4 text-gray-500">
                          No medications found in your reports
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Educational Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Based on your health profile, here are some recommended resources:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <h3 className="font-medium">Healthy Lifestyle Guide</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Learn about maintaining a balanced lifestyle with proper nutrition and exercise
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <h3 className="font-medium">Understanding Medical Reports</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              A guide to interpreting common medical terminology in your health reports
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <h3 className="font-medium">Preventive Health Checklist</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Recommended screenings and check-ups based on your age and health profile
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <h3 className="font-medium">Mental Wellness Resources</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Tools and techniques for managing stress and maintaining mental health
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Insights;
