
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { LogOut, User, Settings, FileText, Stethoscope } from "lucide-react";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  const isDoctor = user?.role === 'doctor';

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-medical-primary" />
            <span className="text-xl font-bold text-medical-primary">MedReport</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated && (
            <>
              {isDoctor ? (
                <>
                  <Link 
                    to="/doctor-dashboard" 
                    className={`flex items-center gap-1 ${location.pathname === "/doctor-dashboard" ? "text-medical-primary font-medium" : "text-gray-700 hover:text-medical-primary"} transition-colors`}
                  >
                    <Stethoscope className="h-4 w-4" />
                    Doctor Dashboard
                  </Link>
                </>
              ) : (
                <Link 
                  to="/dashboard" 
                  className={`text-gray-700 ${location.pathname === "/dashboard" ? "text-medical-primary font-medium" : "text-gray-700 hover:text-medical-primary"} transition-colors`}
                >
                  Dashboard
                </Link>
              )}
              <Link 
                to="/reports" 
                className={`text-gray-700 ${location.pathname === "/reports" ? "text-medical-primary font-medium" : "text-gray-700 hover:text-medical-primary"} transition-colors`}
              >
                Reports
              </Link>
              <Link 
                to="/insights" 
                className={`text-gray-700 ${location.pathname === "/insights" ? "text-medical-primary font-medium" : "text-gray-700 hover:text-medical-primary"} transition-colors`}
              >
                Health Insights
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={user?.profilePicture} 
                      alt={user?.name} 
                    />
                    <AvatarFallback>
                      {user?.name?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <p className="text-xs text-medical-primary capitalize">{user?.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/doctor-profile">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link to="/settings">
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                {isDoctor && (
                  <Link to="/doctor-dashboard">
                    <DropdownMenuItem>
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Doctor Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
