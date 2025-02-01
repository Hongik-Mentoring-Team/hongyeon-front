//!! 주의 경로설정:  http://localhost:3000/#/login => #필요
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./Routes/Example"; // 추가된 페이지
import Board from "./Routes/Board";
import Login from "./Routes/login";
import BeforeLoginHome from "./Routes/beforeLoginHome";
import ChatRoomCreator from "./Routes/ChatRoomCreator";
import Api from "./Routes/api";
import TestPost from "./Routes/TestPost";
import ParameterSetDevTool from "./Routes/ParameterSetDevTool";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BeforeLoginHome />} />
        <Route path="/board" element={<Board />} />
        <Route path="/login" element={<Login />} />
        <Route path="/api2" element={<Api />} />
        {/* Chat 기본기능 추가 */}

        <Route path="/chat" element={<ChatRoomCreator />} />
        <Route path="/post" element={<TestPost />} />
        <Route path="/participateChat" element={<ParameterSetDevTool />} />
      </Routes>
    </Router>
  );
};

export default App;
