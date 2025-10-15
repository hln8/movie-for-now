import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email!");
      return;
    }
    setMessage("");
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("✅ Check your email to confirm signup!");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setStep(1);
  };

  return (
    <div className="auth-container">
      <form
        className={`auth-form ${step === 2 ? "shift-left" : "shift-right"}`}
        onSubmit={step === 1 ? handleNext : handleSignUp}
      >
        <div className="form-step">
          <h2>Sign Up</h2>

          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="email-preview">{email}</p>

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit">Sign Up</button>

              <button
                type="button"
                className="back-btn"
                onClick={handleBack}
              >
                ← Back
              </button>
            </>
          )}

          {message && <p className="auth-message">{message}</p>}

          <p className="switch-auth">
            Already have an account?{" "}
            <span className="link" onClick={() => navigate("/signIn")}>
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;