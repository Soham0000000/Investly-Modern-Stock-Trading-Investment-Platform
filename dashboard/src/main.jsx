import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Route , Routes } from "react-router-dom";
import axios from 'axios'
import './index.css'
import Home from "./components/Home.jsx";
import AuthGate from "./components/AuthGate.jsx";

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthGate><Home /></AuthGate>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
