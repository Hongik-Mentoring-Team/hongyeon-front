//개발용 컴포넌트. 기존 채팅방 참가 시작점
import React, { useState } from "react";
import ParticipateChatRoom from "./ParticipateChatRoom"; // 기존 Chat 컴포넌트를 ParticipateChatRoom.js로 저장했다고 가정

function ParameterSetDevTool() {
  // 파라미터 입력 상태
  const [chatRoomId, setChatRoomId] = useState("");
  // 파라미터 제출 여부
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // 제출되면 ParticipateChatRoom.js (즉, 기존 Chat 컴포넌트)를 호출하며 인자를 전달
  if (submitted) {
    return (
      <ParticipateChatRoom
        chatRoomId={chatRoomId} // 변경: 채팅방 ID 전달
      />
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>채팅방 참가 파라미터 입력</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>
            채팅방 ID:{" "}
            <input
              type="text"
              value={chatRoomId}
              onChange={(e) => setChatRoomId(e.target.value)}
              placeholder="예: 123"
            />
          </label>
        </div>
        <button type="submit">채팅방 참가하기</button>
      </form>
    </div>
  );
}

export default ParameterSetDevTool;
