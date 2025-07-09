"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User, X, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "login" | "signup" | "forgot-password";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onSuccess?: (user: any) => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
  onSuccess,
}) => {
  const { login, signup, forgotPassword } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Reset form when popup opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setMessage("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen, initialMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "login") {
        const response = await login(formData.email, formData.password);
        setMessage("✅ Login successful!");
        setTimeout(() => {
          onSuccess?.(response.user);
          onClose();
        }, 1000);
      } else if (mode === "signup") {
        if (formData.password !== formData.confirmPassword) {
          setMessage("❌ Passwords do not match");
          return;
        }
        const response = await signup(
          formData.name,
          formData.email,
          formData.password
        );
        setMessage("✅ Account created successfully!");
        setTimeout(() => {
          onSuccess?.(response.user);
          onClose();
        }, 1000);
      } else if (mode === "forgot-password") {
        await forgotPassword(formData.email);
        setMessage("✅ Password reset email sent!");
        setTimeout(() => {
          setMode("login");
          setMessage("");
        }, 2000);
      }
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setMessage("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "Welcome Back";
      case "signup":
        return "Create Account";
      case "forgot-password":
        return "Reset Password";
      default:
        return "Authentication";
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "login":
        return "Sign in to your account";
      case "signup":
        return "Join us today";
      case "forgot-password":
        return "Enter your email to reset password";
      default:
        return "";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            {mode !== "login" ? (
              <button
                onClick={() => switchMode("login")}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-9 h-9" />
            )}
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
            <p className="text-gray-600 mt-1">{getSubtitle()}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {mode !== "forgot-password" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => switchMode("forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Loading..."
                : mode === "login"
                ? "Sign In"
                : mode === "signup"
                ? "Create Account"
                : "Send Reset Email"}
            </button>

            {message && (
              <div
                className={`text-center text-sm p-3 rounded-lg ${
                  message.includes("✅")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            {mode === "login" ? (
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : mode === "signup" ? (
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          {/* Demo Credentials (only for login) */}
          {mode === "login" && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-600">
                Admin: admin@example.com / admin123
              </p>
              <p className="text-xs text-gray-600">
                User: user@example.com / user123
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
