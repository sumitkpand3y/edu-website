"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import AuthPopup from "@/components/AuthPopup";

type AuthMode = "login" | "signup" | "forgot-password";

interface AuthPopupContextType {
  isOpen: boolean;
  mode: AuthMode;
  openAuthPopup: (mode?: AuthMode) => void;
  closeAuthPopup: () => void;
  openLogin: () => void;
  openSignup: () => void;
  openForgotPassword: () => void;
}

const AuthPopupContext = createContext<AuthPopupContextType | undefined>(undefined);

interface AuthPopupProviderProps {
  children: React.ReactNode;
}

export const AuthPopupProvider: React.FC<AuthPopupProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const openAuthPopup = useCallback((initialMode: AuthMode = "login") => {
    setMode(initialMode);
    setIsOpen(true);
  }, []);

  const closeAuthPopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openLogin = useCallback(() => {
    openAuthPopup("login");
  }, [openAuthPopup]);

  const openSignup = useCallback(() => {
    openAuthPopup("signup");
  }, [openAuthPopup]);

  const openForgotPassword = useCallback(() => {
    openAuthPopup("forgot-password");
  }, [openAuthPopup]);

  const handleAuthSuccess = (user: any) => {
    // Handle successful authentication
    console.log("User authenticated:", user);
    
    // Redirect based on user role
    if (user.role === "STUDENT") {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/admin/courses";
    }
    
    closeAuthPopup();
  };

  const value = {
    isOpen,
    mode,
    openAuthPopup,
    closeAuthPopup,
    openLogin,
    openSignup,
    openForgotPassword,
  };

  return (
    <AuthPopupContext.Provider value={value}>
      {children}
      {/* Global AuthPopup - rendered once at the layout level */}
      <AuthPopup
        isOpen={isOpen}
        onClose={closeAuthPopup}
        initialMode={mode}
        onSuccess={handleAuthSuccess}
      />
    </AuthPopupContext.Provider>
  );
};

export const useGlobalAuthPopup = () => {
  const context = useContext(AuthPopupContext);
  if (context === undefined) {
    throw new Error("useGlobalAuthPopup must be used within an AuthPopupProvider");
  }
  return context;
};