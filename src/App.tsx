import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
// import StartPage from "./pages/StartPage";
import { Toaster } from "@/components/ui/toaster";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </Router>
      <Toaster></Toaster>
    </>
  );
}

export default App;
