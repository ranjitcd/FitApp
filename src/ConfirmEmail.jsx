// src/pages/ConfirmEmail.jsx
import { useEffect, useState } from "react";

export default function ConfirmEmail() {
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    setTimeout(() => {
      setMessage("✅ Your email has been confirmed successfully.");
    }, 2000);
  }, []);

  return (
    <div style={styles.container}>
      <h2>Email Confirmation</h2>
      <p>{message}</p>
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
};
