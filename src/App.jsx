import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import ConfirmEmail from "./ConfirmEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm" element={<ConfirmEmail />} />

        {/* 👇 Default route goes to reset-password */}
        <Route path="/" element={<Navigate to="/reset-password" />} />

        {/* Optional: catch-all route for unknown paths */}
        <Route
          path="*"
          element={<div style={{ padding: 40 }}>404 - Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
