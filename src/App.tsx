import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";
import { Toaster } from "@/components/ui/toaster";
import TablePage from "./pages/TablePage";
import { Theme } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Theme appearance="light">
        <Router>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/table" element={<TablePage />} />
          </Routes>
        </Router>
        <Toaster></Toaster>
      </Theme>
    </>
  );
}

export default App;
