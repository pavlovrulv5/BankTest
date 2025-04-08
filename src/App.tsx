import "./App.css";
import MainPage from "./pages/MainPage";
// import StartPage from "./pages/StartPage";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      {/* <StartPage></StartPage> */}
      <Toaster></Toaster>
      <MainPage></MainPage>
    </>
  );
}

export default App;
