import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import ConfirmEmail from "./ConfirmEmail"; 

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (!accessToken || !refreshToken) {
      setMessage("Invalid or missing token.");
      return;
    }

    supabase.auth
      .setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
      .then(({ error }) => {
        if (error) {
          console.error("Session error:", error.message);
          setMessage("Failed to authenticate. Try the link again.");
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage("❌ Failed to update password: " + error.message);
      setSuccess(false);
    } else {
      setSuccess(true);
      setMessage("✅ Password updated successfully!");
    }

    setLoading(false);
  };

  if (success) {
    return <ConfirmEmail />; // ✅ Show this only on success
  }

  return (
    <div style={styles.container}>
      <h2>🔒 Reset Your Password</h2>

      {message && (
        <p style={{ color: success ? "green" : "red", marginBottom: "20px" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={styles.formRow}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "100px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  formRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    minWidth: "200px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#10B981",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};
