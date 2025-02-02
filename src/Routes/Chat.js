//실제 배포시에는 인증/인가 로직 필요!!!
import React, { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// 백엔드의 WebSocket 엔드포인트
const WS_ENDPOINT = "http://localhost:8080/ws-stomp"; // SockJS 사용 시 변경 가능
const SEND_DESTINATION = "/app/chat/message"; // 메시지 전송 경로

function Chat({ chatRoomId, roomName, membersInfo }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState(""); // 전체 채팅창 메시지 입력 (필요에 따라 별도 관리 가능)
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null); // 스크롤 자동 하단 이동을 위한 ref
  const sock = new SockJS(WS_ENDPOINT, null, {
    withCredentials: true,
  });

  // === 변경: 사용자로부터 여러 memberId를 입력받기 위한 상태 ===
  const [memberIds, setMemberIds] = useState([]); // 추가된 memberId 목록 (문자열 또는 숫자)
  const [newMemberIdInput, setNewMemberIdInput] = useState(""); // 새 memberId 입력 폼 상태
  // 각 memberId별 메시지 입력 상태 (예: { "1": "hello", "2": "hi" })
  const [messageInputs, setMessageInputs] = useState({});
  // =========================================================

  /** 1) 컴포넌트 마운트 시 STOMP 클라이언트 설정 */
  useEffect(() => {
    // STOMP Client 생성
    // -> SockJS를 활용해 webSocketFactory로 지정
    const stompClient = new Client({
      // SockJS 객체를 생성해 반환하는 팩토리
      webSocketFactory: () =>
        new SockJS(WS_ENDPOINT, null, {
          withCredentials: true,
        }),
      // 연결 시도 재시도 지연 (ms)
      reconnectDelay: 5000,

      // 콘솔 디버깅 로그 (필요 없으면 제거)
      debug: (msg) => console.log("[STOMP Debug]", msg),

      onConnect: (frame) => {
        console.log("STOMP 연결 성공:", frame);

        // 채팅방 구독
        const subscribeUrl = `/topic/chat/${chatRoomId}`;
        stompClient.subscribe(subscribeUrl, (message) => {
          if (!message.body) return;
          const msgData = JSON.parse(message.body);
          console.log("수신된 메시지:", msgData);
          setMessages((prev) => [...prev, msgData]);
        });
      },

      // STOMP 프로토콜 오류 콜백
      onStompError: (frame) => {
        console.error("STOMP 오류 발생:", frame);
      },
    });

    // 실제 연결 시도
    stompClient.activate();

    // Ref에 저장 (필요 시 다른 함수에서 사용)
    stompClientRef.current = stompClient;

    // 언마운트 시 연결 해제
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log("STOMP 연결 해제됨");
      }
    };
  }, [chatRoomId]);

  // 새 메시지가 추가될 때 자동으로 스크롤을 하단으로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // === 변경: 새 memberId 추가를 위한 핸들러 ===
  const handleAddMemberId = (e) => {
    e.preventDefault();
    const trimmedId = newMemberIdInput.trim();
    if (trimmedId !== "" && !memberIds.includes(trimmedId)) {
      setMemberIds((prev) => [...prev, trimmedId]);
      // 초기 메시지 입력 값을 빈 문자열로 설정
      setMessageInputs((prev) => ({ ...prev, [trimmedId]: "" }));
    }
    setNewMemberIdInput(""); // 입력창 초기화
  };
  // =================================================

  // === 변경: 각 memberId별 메시지 전송 함수 ===
  const sendMessageFor = (memberId) => {
    const currentInput = messageInputs[memberId];
    if (!currentInput.trim()) return;
    if (!stompClientRef.current || !stompClientRef.current.connected) {
      alert("소켓 연결이 안 되어 있습니다.");
      return;
    }
    const currentNickname = membersInfo[memberId] || "익명";

    const chatMessageDto = {
      chatRoomId: chatRoomId,
      nickname: currentNickname, // membersInfo에서 가져온 닉네임 사용
      memberId: memberId, // 해당 memberId 사용
      content: currentInput,
    };

    stompClientRef.current.publish({
      destination: SEND_DESTINATION,
      body: JSON.stringify(chatMessageDto),
    });

    // 해당 memberId의 메시지 입력창 초기화
    setMessageInputs((prev) => ({ ...prev, [memberId]: "" }));
  };
  // =================================================

  return (
    <div style={{ padding: 20 }}>
      {/* 채팅방 정보 표시 */}
      <div style={{ marginBottom: 10 }}>
        <h2>채팅방: {roomName}</h2>
        <p>채팅방 ID: {chatRoomId}</p>
        <p>
          참여 멤버:{" "}
          {Object.entries(membersInfo).map(([id, nick]) => (
            <span key={id}>
              {nick} (ID: {id}){" "}
            </span>
          ))}
        </p>
      </div>

      {/* 전체 메시지 내역 표시 */}
      <div
        style={{
          border: "1px solid gray",
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: "4px 0" }}>
            <strong>
              {msg.nickname} (ID:{msg.memberId}):
            </strong>{" "}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* 스크롤 하단 위치를 위한 요소 */}
      </div>

      {/* === 변경: 새로운 memberId 입력 폼 === */}
      <form onSubmit={handleAddMemberId} style={{ marginBottom: 20 }}>
        <label>
          새로운 Member ID 입력:{" "}
          <input
            type="text"
            value={newMemberIdInput}
            onChange={(e) => setNewMemberIdInput(e.target.value)}
            placeholder="예: 1"
          />
        </label>
        <button type="submit" style={{ marginLeft: 8 }}>
          추가
        </button>
      </form>
      {/* ================================================= */}

      {/* === 변경: 각 추가된 memberId별 메시지 전송 칸 렌더링 === */}
      {memberIds.map((memberId) => (
        <div
          key={memberId}
          style={{ marginBottom: 10, border: "1px dashed #ccc", padding: 10 }}
        >
          <p>
            <strong>내 Member ID:</strong> {memberId}
          </p>
          <input
            style={{ width: 200, marginRight: 8 }}
            value={messageInputs[memberId] || ""}
            // value에는 "" -> 사용자 입력 → onChange 이벤트 → setMessageInputs 콜백 함수가 실행되어 상태 업데이트 -> value 값이 사용자 입력값으로 변경 → 재렌더링되면서 업데이트된 상태가 입력
            // 필드에 반영
            onChange={(e) =>
              setMessageInputs((prev) => ({
                ...prev,
                [memberId]: e.target.value,
              }))
            }
            placeholder={`Member ID ${memberId} 메시지 입력...`}
          />
          <button onClick={() => sendMessageFor(memberId)}>전송</button>
        </div>
      ))}
      {/* ================================================= */}
    </div>
  );
}

export default Chat;
