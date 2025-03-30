
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/layout/Header";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import { Patient, Treatment } from "../types/medical";
import { format } from "date-fns";
import { Badge } from "../components/ui/badge";
import { 
  CalendarDays, 
  ClipboardList, 
  Plus, 
  Search, 
  User, 
  Users,
  FileText,
  PlusCircle,
  Clock 
} from "lucide-react";

// Mock data for doctor dashboard
const mockPatients: Patient[] = [
  {
    id: "2",
    name: "Michael Roberts",
    email: "patient@medrep.com",
    age: 42,
    gender: "Male",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    lastVisit: "2023-10-15T10:30:00Z",
    upcomingAppointment: "2023-11-20T14:00:00Z"
  },
  {
    id: "3",
    name: "Jennifer Wilson",
    email: "j.wilson@example.com",
    age: 35,
    gender: "Female",
    profilePicture: "https://randomuser.me/api/portraits/women/45.jpg",
    lastVisit: "2023-09-28T09:15:00Z",
    upcomingAppointment: "2023-11-15T11:30:00Z"
  },
  {
    id: "4",
    name: "Robert Garcia",
    email: "r.garcia@example.com",
    age: 58,
    gender: "Male",
    profilePicture: "https://randomuser.me/api/portraits/men/67.jpg",
    lastVisit: "2023-10-05T16:00:00Z"
  },
  {
    id: "5",
    name: "Emma Taylor",
    email: "e.taylor@example.com",
    age: 29,
    gender: "Female",
    profilePicture: "https://randomuser.me/api/portraits/women/22.jpg",
    upcomingAppointment: "2023-11-10T13:45:00Z"
  }
];

const mockTreatments: Treatment[] = [
  {
    id: "tr_1",
    patientId: "2",
    doctorId: "1",
    title: "Hypertension Management",
    description: "Regular monitoring and medication for blood pressure control",
    status: "in-progress",
    startDate: "2023-09-15T10:30:00Z",
    medications: [
      {
        id: "med_1",
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "3 months"
      }
    ],
    notes: "Patient responding well to medication. Continue current regimen.",
    createdAt: "2023-09-15T10:30:00Z",
    updatedAt: "2023-10-15T10:30:00Z"
  },
  {
    id: "tr_2",
    patientId: "3",
    doctorId: "1",
    title: "Physical Therapy - Shoulder",
    description: "Rehabilitation exercises for rotator cuff injury",
    status: "scheduled",
    startDate: "2023-11-05T14:00:00Z",
    endDate: "2023-12-20T14:00:00Z",
    medications: [],
    createdAt: "2023-10-28T09:15:00Z",
    updatedAt: "2023-10-28T09:15:00Z"
  },
  {
    id: "tr_3",
    patientId: "4",
    doctorId: "1",
    title: "Diabetes Management",
    description: "Blood sugar monitoring and insulin therapy",
    status: "in-progress",
    startDate: "2023-08-10T11:00:00Z",
    medications: [
      {
        id: "med_2",
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "Ongoing",
        instructions: "Take with meals"
      },
      {
        id: "med_3",
        name: "Insulin",
        dosage: "10 units",
        frequency: "Before meals",
        duration: "Ongoing",
        instructions: "Adjust based on blood sugar readings"
      }
    ],
    notes: "Last HbA1c: 7.2%. Improved from previous 8.1%.",
    createdAt: "2023-08-10T11:00:00Z",
    updatedAt: "2023-10-12T14:30:00Z"
  }
];

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddTreatmentOpen, setIsAddTreatmentOpen] = useState(false);
  const [newTreatment, setNewTreatment] = useState({
    title: "",
    description: "",
    status: "scheduled" as const,
    startDate: format(new Date(), "yyyy-MM-dd"),
    patientId: "",
    medications: [] as { name: string; dosage: string; frequency: string; duration: string; }[]
  });
  const [currentMedication, setCurrentMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: ""
  });
  
  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get patient's treatments
  const getPatientTreatments = (patientId: string) => {
    return treatments.filter(treatment => treatment.patientId === patientId);
  };
  
  // Get all upcoming appointments
  const upcomingAppointments = patients
    .filter(patient => patient.upcomingAppointment)
    .sort((a, b) => {
      const dateA = new Date(a.upcomingAppointment || "");
      const dateB = new Date(b.upcomingAppointment || "");
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);
  
  // Get recent patients
  const recentPatients = [...patients]
    .filter(patient => patient.lastVisit)
    .sort((a, b) => {
      const dateA = new Date(a.lastVisit || "");
      const dateB = new Date(b.lastVisit || "");
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);
    
  const handleAddMedication = () => {
    if (currentMedication.name && currentMedication.dosage && 
        currentMedication.frequency && currentMedication.duration) {
      setNewTreatment(prev => ({
        ...prev,
        medications: [...prev.medications, { ...currentMedication }]
      }));
      setCurrentMedication({ name: "", dosage: "", frequency: "", duration: "" });
    }
  };
  
  const handleSubmitTreatment = () => {
    if (newTreatment.title && newTreatment.description && newTreatment.patientId) {
      const treatment: Treatment = {
        id: `tr_${Date.now()}`,
        patientId: newTreatment.patientId,
        doctorId: user?.id || "",
        title: newTreatment.title,
        description: newTreatment.description,
        status: newTreatment.status,
        startDate: new Date(newTreatment.startDate).toISOString(),
        medications: newTreatment.medications.map((med, i) => ({
          ...med,
          id: `med_new_${i}_${Date.now()}`
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setTreatments(prev => [...prev, treatment]);
      setIsAddTreatmentOpen(false);
      setNewTreatment({
        title: "",
        description: "",
        status: "scheduled",
        startDate: format(new Date(), "yyyy-MM-dd"),
        patientId: "",
        medications: []
      });
    }
  };
  
  const statusColors = {
    "scheduled": "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    "completed": "bg-green-100 text-green-800",
    "cancelled": "bg-red-100 text-red-800"
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="space-y-8">
          {/* Greeting Section */}
          <section className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, Dr. {user?.name?.split(" ")[1] || user?.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Doctor Dashboard
              </p>
            </div>
            
            <Dialog open={isAddTreatmentOpen} onOpenChange={setIsAddTreatmentOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Treatment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Treatment</DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Patient</label>
                    <Select 
                      value={newTreatment.patientId} 
                      onValueChange={(value) => setNewTreatment(prev => ({ ...prev, patientId: value }))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map(patient => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Title</label>
                    <Input 
                      className="col-span-3" 
                      value={newTreatment.title}
                      onChange={(e) => setNewTreatment(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Treatment title"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Description</label>
                    <Textarea 
                      className="col-span-3" 
                      value={newTreatment.description}
                      onChange={(e) => setNewTreatment(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Treatment details"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Start Date</label>
                    <Input 
                      className="col-span-3" 
                      type="date"
                      value={newTreatment.startDate}
                      onChange={(e) => setNewTreatment(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Status</label>
                    <Select 
                      value={newTreatment.status} 
                      onValueChange={(value: 'scheduled' | 'in-progress' | 'completed' | 'cancelled') => 
                        setNewTreatment(prev => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="border-t pt-4 mt-2">
                    <h3 className="font-medium mb-3">Medications</h3>
                    
                    {newTreatment.medications.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {newTreatment.medications.map((med, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded-md">
                            <p className="font-medium">{med.name}</p>
                            <p className="text-sm text-gray-500">{med.dosage}, {med.frequency}, {med.duration}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <Input 
                        placeholder="Medication name"
                        value={currentMedication.name}
                        onChange={(e) => setCurrentMedication(prev => ({ ...prev, name: e.target.value }))}
                      />
                      <Input 
                        placeholder="Dosage (e.g., 10mg)"
                        value={currentMedication.dosage}
                        onChange={(e) => setCurrentMedication(prev => ({ ...prev, dosage: e.target.value }))}
                      />
                      <Input 
                        placeholder="Frequency (e.g., Once daily)"
                        value={currentMedication.frequency}
                        onChange={(e) => setCurrentMedication(prev => ({ ...prev, frequency: e.target.value }))}
                      />
                      <Input 
                        placeholder="Duration (e.g., 2 weeks)"
                        value={currentMedication.duration}
                        onChange={(e) => setCurrentMedication(prev => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleAddMedication}
                      className="w-full"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Medication
                    </Button>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button onClick={() => setIsAddTreatmentOpen(false)} variant="outline">Cancel</Button>
                  <Button onClick={handleSubmitTreatment}>Save Treatment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
          
          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5 text-medical-primary" />
                  Total Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{patients.length}</p>
                <p className="text-sm text-gray-500">Active patients under your care</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-medical-primary" />
                  Active Treatments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {treatments.filter(t => t.status === 'in-progress').length}
                </p>
                <p className="text-sm text-gray-500">Ongoing treatment plans</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-medical-primary" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
                <p className="text-sm text-gray-500">Scheduled in the next 30 days</p>
              </CardContent>
            </Card>
          </section>
          
          {/* Main Content */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Patients */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Recent Patients
                  </span>
                </CardTitle>
                <CardDescription>Recently visited patients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPatients.map(patient => (
                  <div key={patient.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={patient.profilePicture || 'https://via.placeholder.com/40'} 
                        alt={patient.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-xs text-gray-500">
                        Last visit: {format(new Date(patient.lastVisit || ""), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedPatient(patient)}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Upcoming Appointments */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointments.map(patient => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img 
                                src={patient.profilePicture || 'https://via.placeholder.com/32'} 
                                alt={patient.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span>{patient.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(patient.upcomingAppointment || ""), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(patient.upcomingAppointment || ""), "h:mm a")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
          
          {/* Patient Management Section */}
          <section className="pt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Patient Management
                    </CardTitle>
                    <CardDescription>View and manage your patients and their treatments</CardDescription>
                  </div>
                  
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-9"
                      placeholder="Search patients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age/Gender</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Active Treatments</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map(patient => {
                      const patientTreatments = getPatientTreatments(patient.id);
                      const activeTreatments = patientTreatments.filter(t => 
                        t.status === 'scheduled' || t.status === 'in-progress'
                      );
                      
                      return (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full overflow-hidden">
                                <img 
                                  src={patient.profilePicture || 'https://via.placeholder.com/32'} 
                                  alt={patient.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p>{patient.name}</p>
                                <p className="text-xs text-gray-500">{patient.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {patient.age} / {patient.gender}
                          </TableCell>
                          <TableCell>
                            {patient.lastVisit 
                              ? format(new Date(patient.lastVisit), "MMM dd, yyyy") 
                              : "No visits"}
                          </TableCell>
                          <TableCell>
                            {activeTreatments.length > 0 ? (
                              <span className="font-medium text-medical-primary">
                                {activeTreatments.length} active
                              </span>
                            ) : (
                              <span className="text-gray-500">No active treatments</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedPatient(patient);
                                setNewTreatment(prev => ({ ...prev, patientId: patient.id }));
                              }}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    
                    {filteredPatients.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No patients found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
          
          {/* Patient Detail Modal */}
          {selectedPatient && (
            <Dialog open={!!selectedPatient} onOpenChange={(open) => !open && setSelectedPatient(null)}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={selectedPatient.profilePicture || 'https://via.placeholder.com/40'} 
                        alt={selectedPatient.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <DialogTitle>{selectedPatient.name}</DialogTitle>
                  </div>
                </DialogHeader>
                
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{selectedPatient.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age / Gender</p>
                      <p>{selectedPatient.age} / {selectedPatient.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Visit</p>
                      <p>
                        {selectedPatient.lastVisit 
                          ? format(new Date(selectedPatient.lastVisit), "MMMM dd, yyyy") 
                          : "No visits recorded"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Appointment</p>
                      <p>
                        {selectedPatient.upcomingAppointment 
                          ? format(new Date(selectedPatient.upcomingAppointment), "MMMM dd, yyyy 'at' h:mm a") 
                          : "No upcoming appointments"}
                      </p>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="treatments" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="treatments" className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        Treatments
                      </TabsTrigger>
                      <TabsTrigger value="reports" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Medical Reports
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="treatments" className="mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Treatment History</h3>
                        <Button 
                          size="sm" 
                          onClick={() => {
                            setNewTreatment(prev => ({ ...prev, patientId: selectedPatient.id }));
                            setIsAddTreatmentOpen(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Treatment
                        </Button>
                      </div>
                      
                      {getPatientTreatments(selectedPatient.id).length > 0 ? (
                        <div className="space-y-4">
                          {getPatientTreatments(selectedPatient.id).map(treatment => (
                            <Card key={treatment.id} className="overflow-hidden">
                              <div className={`h-1 ${
                                treatment.status === 'in-progress' ? 'bg-yellow-400' :
                                treatment.status === 'completed' ? 'bg-green-400' :
                                treatment.status === 'cancelled' ? 'bg-red-400' : 'bg-blue-400'
                              }`} />
                              <CardHeader className="pb-2">
                                <div className="flex justify-between">
                                  <CardTitle>{treatment.title}</CardTitle>
                                  <Badge className={statusColors[treatment.status]}>
                                    {treatment.status.replace('-', ' ')}
                                  </Badge>
                                </div>
                                <CardDescription className="text-xs">
                                  Started on {format(new Date(treatment.startDate), "MMMM dd, yyyy")}
                                  {treatment.endDate && ` • Ends on ${format(new Date(treatment.endDate), "MMMM dd, yyyy")}`}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pb-4">
                                <p className="mb-3">{treatment.description}</p>
                                
                                {treatment.medications.length > 0 && (
                                  <div className="mt-4">
                                    <h4 className="text-sm font-semibold mb-2">Medications:</h4>
                                    <div className="space-y-2">
                                      {treatment.medications.map(medication => (
                                        <div key={medication.id} className="bg-gray-50 p-2 rounded-md text-sm">
                                          <p className="font-medium">{medication.name} ({medication.dosage})</p>
                                          <p className="text-gray-600">{medication.frequency} for {medication.duration}</p>
                                          {medication.instructions && (
                                            <p className="text-xs text-gray-500 mt-1">{medication.instructions}</p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {treatment.notes && (
                                  <div className="mt-4 border-t pt-3">
                                    <h4 className="text-sm font-semibold mb-1">Notes:</h4>
                                    <p className="text-sm text-gray-600">{treatment.notes}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <p>No treatments recorded for this patient</p>
                          <Button 
                            className="mt-2" 
                            variant="outline"
                            onClick={() => {
                              setNewTreatment(prev => ({ ...prev, patientId: selectedPatient.id }));
                              setIsAddTreatmentOpen(true);
                            }}
                          >
                            Create First Treatment
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="reports" className="mt-4">
                      <div className="text-center py-6 text-gray-500">
                        <p>Medical reports for this patient will appear here</p>
                        <Button className="mt-2" variant="outline">
                          Upload Report
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
