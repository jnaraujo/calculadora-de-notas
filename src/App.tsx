import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Final from "./pages/Final";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/final" element={<Final />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
