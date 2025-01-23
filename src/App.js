import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/beforeLoginHome";
import BoardPage from "./Routes/Board";
import LoginPage from "./Routes/login";
import Api from "./Routes/api";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/api2" element={<Api />} />
      </Routes>
    </Router>
  );
}

export default App;
