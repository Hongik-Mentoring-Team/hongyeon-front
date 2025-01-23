import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import BoardPage from "./Routes/Board";
import LoginPage from "./Routes/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
