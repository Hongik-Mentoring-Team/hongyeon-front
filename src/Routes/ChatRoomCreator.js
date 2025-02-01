import React, { useState } from "react";
import Chat from "./Chat"; // 실제 채팅 컴포넌트

function ChatRoomCreator() {
  const [roomName, setRoomName] = useState("Front ROom");
  const [membersInfo, setMembersInfo] = useState({
    1: "nickGno",
    2: "nickDuck",
  });
  const [chatRoomId, setChatRoomId] = useState(null);

  // 채팅방 생성 요청 함수
  const createRoom = async () => {
    try {
      const requestData = {
        roomName,
        membersInfo,
      };
      // 예: 서버 엔드포인트 '/api/v1/chatRoom/initiate' 라고 가정
      const response = await fetch(
        "http://localhost:8080/api/v1/chatRoom/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );
      if (!response.ok) {
        throw new Error("방 생성 실패!");
      }
      const data = await response.json();
      console.log("생성된 채팅방:", data);
      // 예: data = { roomId: 123 }
      setChatRoomId(data.chatRoomId);
    } catch (err) {
      console.error(err);
      alert("채팅방 생성에 실패했습니다.");
    }
  };

  // chatRoomId가 생기면, 즉시 Chat 컴포넌트로 넘어가도록
  if (chatRoomId) {
    return <Chat chatRoomId={chatRoomId} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>채팅방 생성</h2>
      <div>
        <label>Room Name: </label>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
      </div>

      <button onClick={createRoom}>방 생성하기</button>

      <hr />
      <p>멤버 정보: (하드코딩 예시)</p>
      <pre>{JSON.stringify(membersInfo, null, 2)}</pre>
    </div>
  );
}

export default ChatRoomCreator;
