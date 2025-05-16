
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import { 
  FileText, 
  Shield, 
  Brain, 
  Zap, 
  User, 
  Activity, 
  CheckCircle, 
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <Header />
      
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-medical-light to-white overflow-hidden">
        <div className="container px-4 py-24 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-medical-primary px-3 py-1.5 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4" />
                HIPAA & GDPR Compliant
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                MediLink : Bridging the HealthCare Gap
              </h1>
              
              <p className="text-xl text-gray-600 max-w-xl">
                MedReport uses advanced NLP and AI to transform complex medical reports into easy-to-understand summaries, helping patients and doctors make better healthcare decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-medical-primary" />
                  <h3 className="text-lg font-semibold">Medical Report Summary</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Diagnosis</h4>
                    <p className="text-gray-800">Mild hypertension (140/90 mmHg)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Key Findings</h4>
                    <p className="text-gray-800">Normal ECG, slightly elevated cholesterol (210 mg/dL)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Treatment</h4>
                    <p className="text-gray-800">Lifestyle modifications recommended, follow-up in 3 months</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-green-700 text-sm">
                      <CheckCircle className="inline h-4 w-4 mr-1 text-green-600" />
                      AI analysis completed in 3.4 seconds
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/3 -right-16 w-72 h-72 bg-medical-secondary/30 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-medical-accent/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </header>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simplifying Medical Information
            </h2>
            <p className="text-xl text-gray-600">
              Our platform uses cutting-edge natural language processing to make medical reports accessible and actionable for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 text-medical-primary rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Summarization</h3>
              <p className="text-gray-600">
                Automatically extracts key diagnoses, treatments, and follow-up recommendations from complex medical reports.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 text-medical-accent rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Enterprise-grade security with end-to-end encryption and blockchain verification to keep your health data safe.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Patient-Centered</h3>
              <p className="text-gray-600">
                Medical jargon translated into plain language with personalized insights about your health journey.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Tracking</h3>
              <p className="text-gray-600">
                Monitor your health metrics over time with AI-powered trend analysis and personalized recommendations.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Reports</h3>
              <p className="text-gray-600">
                Support for all types of medical documents including lab results, imaging, clinical notes, and discharge summaries.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Analysis</h3>
              <p className="text-gray-600">
                Get quick insights from your reports with our high-speed processing that delivers results in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How MedReport Works
            </h2>
            <p className="text-xl text-gray-600">
              A simple process to transform complex medical documents into actionable insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-medical-secondary/20 text-medical-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Reports</h3>
              <p className="text-gray-600">
                Easily upload medical reports in various formats including PDF, images, or text files.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-medical-secondary/20 text-medical-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced NLP algorithms extract key information and create a structured summary of your report.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-medical-secondary/20 text-medical-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
              <p className="text-gray-600">
                Review easy-to-understand summaries, track health trends, and share with your healthcare providers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-medical-primary to-medical-accent text-white">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Take Control of Your Medical Information Today
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of patients and healthcare providers using MedReport to simplify healthcare information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-medical-primary" />
                <span className="text-xl font-bold text-white">MedReport</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Simplifying healthcare information with AI
              </p>
            </div>
            
            <div className="flex flex-wrap gap-8 justify-center md:justify-end">
              <div>
                <h3 className="font-medium text-white mb-3">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-3">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-3">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} MedReport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
