import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JsonToToonPage from "./pages/JsonToToonPage";
import ApiPage from "./pages/ApiPage";
import { Analytics } from '@vercel/analytics/react';
export default function App() {
  return <>
  <Analytics />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/json-to-toon" element={<JsonToToonPage />} />
      <Route path="/api" element={<ApiPage />} />
    </Routes>
  </BrowserRouter>;
  </>
}