import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Media from "./pages/Media";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
