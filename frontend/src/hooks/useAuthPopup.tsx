import { useGlobalAuthPopup } from "@/contexts/AuthPopupContext";

// Simple re-export of the global auth popup hook for backwards compatibility
export const useAuthPopup = useGlobalAuthPopup;

// Alternative: If you want to keep the old local hook as well
import { useState, useCallback } from "react";

type AuthMode = "login" | "signup" | "forgot-password";

interface UseLocalAuthPopupReturn {
  isOpen: boolean;
  mode: AuthMode;
  openAuthPopup: (mode?: AuthMode) => void;
  closeAuthPopup: () => void;
  openLogin: () => void;
  openSignup: () => void;
  openForgotPassword: () => void;
}

// Local auth popup hook (for components that need their own popup instance)
export const useLocalAuthPopup = (): UseLocalAuthPopupReturn => {
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

  return {
    isOpen,
    mode,
    openAuthPopup,
    closeAuthPopup,
    openLogin,
    openSignup,
    openForgotPassword,
  };
};