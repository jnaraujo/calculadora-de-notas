import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Final from "./pages/Final";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
