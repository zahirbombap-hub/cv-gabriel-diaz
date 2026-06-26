import { Routes, Route, Navigate } from "react-router-dom";
import Cv from "./routes/cv.jsx";
import NotFound from "./routes/notfound.jsx";

function ScrollToTop() {
  // Simple scroll-to-top on route change
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
  return null;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ScrollToTop />} />
      <Route path="/cv" element={<Cv />} />
      <Route path="/sobre-mi" element={<Navigate to="/cv" replace />} />
      <Route path="/gabriel" element={<Navigate to="/cv" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
