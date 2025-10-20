import  { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);


  const navigate = useNavigate();

  //Listen to Auth
  useEffect(() => {

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsSessionActive(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // update the curent user
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      setMessage(" Password updated successfully Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      setMessage(` Error updating password: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // show if the session is active
  if (!isSessionActive) {
    return (
      <div className="auth-container">
        <p className="auth-message">Please wait, verifying link...</p>
        <p className="auth-message">If nothing happens, the link may be invalid or expired.</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
