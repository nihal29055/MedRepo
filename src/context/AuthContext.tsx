
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState } from "../types/auth";
import { toast } from "sonner";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: 'patient' | 'doctor') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "doctor@medrep.com",
    name: "Dr. Sarah Johnson",
    role: "doctor",
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: "2",
    email: "patient@medrep.com",
    name: "Michael Roberts",
    role: "patient",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for saved session in localStorage
    const savedUser = localStorage.getItem("medreport_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("medreport_user");
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      // Simulate successful login
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      
      // Save to localStorage
      localStorage.setItem("medreport_user", JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("medreport_user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    toast.info("You have been logged out");
  };

  const signup = async (name: string, email: string, password: string, role: 'patient' | 'doctor') => {
    try {
      // In a real app, this would be an API call
      const newUser: User = {
        id: `user_${Date.now().toString()}`,
        email,
        name,
        role
      };
      
      // Simulate successful registration
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      // Save to localStorage
      localStorage.setItem("medreport_user", JSON.stringify(newUser));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        signup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
