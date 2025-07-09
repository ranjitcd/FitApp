// src/pages/ResetPassword.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setMessage("Invalid or missing token.");
    }
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage("Failed to update password: " + error.message);
    } else {
      setMessage("✅ Password updated successfully!");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>🔒 Reset Your Password</h2>
      {message && <p>{message}</p>}

      {accessToken && (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    padding: "10px",
    width: "100%",
    marginBottom: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#10B981",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};
