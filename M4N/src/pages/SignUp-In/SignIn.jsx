import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else navigate("/");
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setMessage("Please enter your email to reset your password.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
    if (error) setMessage(error.message);
else {
  setMessage("✅ Password reset link sent! Check your email inbox.");
  setTimeout(() => setMessage(""), 4000);
  setShowResetModal(false);
  setResetEmail("");
}

  };
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      setMessage(error.message);
    }

  };
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

    
        <button type="submit" disabled={loading} className={loading ? "loading" : ""}>
          {loading ? "Loading..." : "Sign In"}
        </button>
        <button type="button" onClick={handleGoogleSignIn} className="google-btn"> 
            <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google Logo"
    className="google-icon"
  />
          Sign in with Google
        </button>

        {message && <p className="auth-message">{message}</p>}
    <p className="forgot-password-text" onClick={() => setShowResetModal(true)}>
          Forgot your password?
        </p>
        <p className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signUp")}>
            Sign Up
          </span>
        </p>

      </form>

      {showResetModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Reset Your Password</h3>
      <p>Enter your registered email below and we'll send you a reset link.</p>

      <input
        type="email"
        placeholder="Enter your email"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
      />

      {message && <p className="auth-message">{message}</p>}

      <div className="modal-buttons">
        <button onClick={handleResetPassword}>Send Reset Link</button>
        <button
          className="cancel-btn"
          onClick={() => setShowResetModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default SignIn;