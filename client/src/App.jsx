import "./App.css";
import CreateGist from "./components/CreateGist";
import Gist from "./components/Gist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/new" element={<CreateGist />} />
          <Route path="/home" element={<Gist/>} />
          <Route path="/:gistId" element={<Gist />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
