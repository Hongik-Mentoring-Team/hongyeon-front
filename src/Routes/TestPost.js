// 개발용 컴포넌트. 임시 게시판 페이지
import React, { useState } from "react";
import ChatRoomCreator from "./ChatRoomCreator"; // ChatRoomCreator 컴포넌트 임포트

const TestPost = () => {
  // 하드코딩된 채팅방 정보
  const initialRoomName = "TestRoomNameFront"; // 임시 채팅방 이름: 실제로는 사용자 input
  const initialMembersInfo = { 1: "olafx3", 2: "trynx3" }; // 임시 채팅멤버 딕셔너리: 실제로는 매칭된 N명

  // 채팅방 생성 컴포넌트를 보여줄지 여부를 관리하는 state
  const [showCreator, setShowCreator] = useState(false);

  // 만약 채팅방 생성 버튼이 눌리면, ChatRoomCreator 컴포넌트를 렌더링
  if (showCreator) {
    return (
      <ChatRoomCreator
        initialRoomName={initialRoomName} // props로 전달
        initialMembersInfo={initialMembersInfo} // props로 전달
      />
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Test Post 페이지</h1>
      <h2>현재 하드코딩된 채팅방 정보</h2>
      <p>
        <strong>Room Name:</strong> {initialRoomName}
      </p>
      <p>
        <strong>Members Info:</strong>{" "}
        {JSON.stringify(initialMembersInfo, null, 2)}
      </p>
      {/* 변경: 버튼 클릭 시 showCreator를 true로 설정하여 ChatRoomCreator 호출 */}
      <button onClick={() => setShowCreator(true)}>채팅방 생성</button>
    </div>
  );
};

export default TestPost;
