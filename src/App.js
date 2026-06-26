import { Routes, Route, Navigate } from "react-router-dom";
import Cv from "./routes/cv.jsx";
import NotFound from "./routes/notfound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cv" replace />} />
      <Route path="/cv" element={<Cv />} />
      <Route path="/sobre-mi" element={<Navigate to="/cv" replace />} />
      <Route path="/gabriel" element={<Navigate to="/cv" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
