import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

const AuthForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login | signup
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP: frontend-only
    console.log(mode.toUpperCase(), formData);
    navigate("/user-dashboard");
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
    navigate("/user-dashboard");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card p-8 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {mode === "login"
            ? "Sign in to continue"
            : "Sign up to get started"}
        </p>
      </div>

      {/* Animated Form */}
      <AnimatePresence mode="wait">
        <motion.form
          key={mode}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {mode === "signup" && (
            <Input
              name="name"
              label="Full Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth size="lg">
            {mode === "login" ? "Login" : "Sign Up"}
          </Button>
        </motion.form>
      </AnimatePresence>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-border" />
        <span className="px-3 text-xs text-muted-foreground">OR</span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* Google Login */}
      <Button
        variant="outline"
        fullWidth
        onClick={handleGoogleLogin}
      >
        <Icon name="Mail" size={18} className="mr-2" />
        Continue with Google
      </Button>

      {/* Switch */}
      <p className="text-center text-sm mt-6">
        {mode === "login" ? "Don’t have an account?" : "Already have an account?"}
        <button
          className="ml-2 text-primary font-medium hover:underline"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
