//!! 주의 경로설정:  http://localhost:3000/#/login => #필요
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./Routes/Board";
import Login from "./Routes/login";
import BeforeLoginHome from "./Routes/beforeLoginHome";
import ChatRoomCreator from "./Routes/ChatRoomCreator";
import Api from "./Routes/api";
import TestPost from "./Routes/TestPost";
import ParameterSetDevTool from "./Routes/ParameterSetDevTool";
import LoginNew from "./Routes/LoginNew";
import CreateMember from "./Routes/CreateMember";
import AfterLoginHome from "./Routes/afterLoginHome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BeforeLoginHome />} />
        <Route path="/newHome" element={<AfterLoginHome />} />
        <Route path="/board" element={<Board />} />
        <Route path="/login" element={<Login />} />
        <Route path="/api2" element={<Api />} />
        {/* Chat 기본기능 추가 */}
        <Route path="/chat" element={<ChatRoomCreator />} />
        <Route path="/post" element={<TestPost />} />
        <Route path="/participateChat" element={<ParameterSetDevTool />} />
        <Route path="/loginNew" element={<LoginNew />} />
        <Route path="/createMember" element={<CreateMember />} />
      </Routes>
    </Router>
  );
};

export default App;
