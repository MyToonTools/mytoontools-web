import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JsonToToonPage from "./pages/JsonToToonPage";
import CsvToToonPage from "./pages/CsvToToonPage";
import ApiPage from "./pages/ApiPage";
import WhatIsToonPage from "./pages/WhatIsToonPage";
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/json-to-toon" element={<JsonToToonPage />} />
      <Route path="/csv-to-toon" element={<CsvToToonPage />} />
      <Route path="/api" element={<ApiPage />} />
      <Route path="/what-is-toon" element={<WhatIsToonPage />} />
    </Routes>
  </BrowserRouter>
  <Analytics />
  </>
}