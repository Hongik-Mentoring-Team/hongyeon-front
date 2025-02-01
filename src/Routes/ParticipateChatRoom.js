// 개발 테스트용 컴포넌트.
import React, { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";

// 백엔드의 WebSocket 엔드포인트
const WS_ENDPOINT = "http://localhost:8080/ws-stomp"; // SockJS 사용 시 변경 가능
const SEND_DESTINATION = "/app/chat/message"; // 메시지 전송 경로
// , roomName, membersInfo
function ParticipateChatRoom({ chatRoomId }) {
  const [roomName, setRoomName] = useState("");
  const [currentMembersInfo, setCurrentMembersInfo] = useState([]);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null); // 스크롤 자동 하단 이동을 위한 ref

  // 사용자의 memberId를 입력받기 위한 state (한 번만 입력)
  const [myMemberId, setMyMemberId] = useState("");
  const [isMemberIdSet, setIsMemberIdSet] = useState(false);

  // ======================================================

  useEffect(() => {
    // 1) STOMP 클라이언트 생성
    const stompClient = new Client({
      brokerURL: WS_ENDPOINT.replace("http", "ws"), // ws:// 또는 wss:// 변환
      reconnectDelay: 5000, // 자동 재연결 (5초)
      debug: (msg) => console.log(msg),
      onConnect: () => {
        console.log("STOMP Connection 성공");

        // 2) 채팅방 메시지 수신 구독
        const subscribeUrl = `/topic/chat/${chatRoomId}`;
        stompClient.subscribe(subscribeUrl, (message) => {
          if (!message.body) return;
          console.log("수신된 메시지: ", message.body);
          const msgData = JSON.parse(message.body);
          setMessages((prev) => [...prev, msgData]);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP 오류 발생:", frame);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log("STOMP 연결 해제됨");
      }
    };
  }, [chatRoomId]);

  //채팅방 입장 후 채팅방 히스토리 요청
  useEffect(() => {
    fetchChatHistory();
  }, [chatRoomId]);

  // 새 메시지가 추가될 때 자동으로 스크롤을 하단으로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // === 변경: 사용자가 memberId 입력 후 제출하면 상태 업데이트 ===
  const handleMemberIdSubmit = (e) => {
    e.preventDefault();
    if (myMemberId.trim() !== "") {
      setIsMemberIdSet(true);
    }
  };
  // ===============================================================

  // === 변경: 채팅방 메시지 내역 요청 함수 (GET 방식) ===
  const fetchChatHistory = async () => {
    try {
      // GET 요청
      const response = await fetch(
        `http://localhost:8080/api/v1/chatRoom/history/${chatRoomId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("채팅 내역 요청 실패!");
      }
      const history = await response.json(); // 반환 형식: ChatRoomResponseDto
      setMessages(history.chatMessages);
      console.log("채팅방 내역 불러오기 성공", history.chatMessages);
      setCurrentMembersInfo(history.chatMembers);
      setRoomName(history.name);
    } catch (err) {
      console.error(err);
      alert("채팅방 내역을 불러오지 못했습니다.");
    }
  };
  // =================================================

  // 메시지 전송 (각 memberId별 전송은 따로 구현되어 있지 않고, 현재 사용자는 myMemberId임)
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    if (!stompClientRef.current || !stompClientRef.current.connected) {
      alert("소켓 연결이 안 되어 있습니다.");
      return;
    }
    const currentMemberId = myMemberId;
    const member = currentMembersInfo.find(
      (item) => String(item.memberId) === String(currentMemberId)
    );
    const currentNickname = member ? member.nickname : "익명";

    const chatMessageDto = {
      chatRoomId: chatRoomId,
      nickname: currentNickname,
      memberId: currentMemberId,
      content: inputValue,
    };

    stompClientRef.current.publish({
      destination: SEND_DESTINATION,
      body: JSON.stringify(chatMessageDto),
    });

    setInputValue("");
  };

  return (
    <div style={{ padding: 20 }}>
      {/* 채팅방 정보 및 memberId 입력폼 영역 */}
      <div style={{ marginBottom: 10 }}>
        <h2>채팅방: {roomName}</h2>
        <p>채팅방 ID: {chatRoomId}</p>
        <p>
          참여 멤버:{" "}
          {currentMembersInfo.map((member) => (
            <span key={member.memberId}>
              {member.nickname} (ID: {member.memberId}){" "}
            </span>
          ))}
        </p>
        <p>
          <strong>내 Member ID:</strong>{" "}
          {isMemberIdSet ? myMemberId : "입력되지 않음"}
        </p>
        {/* 변경: memberId가 아직 설정되지 않은 경우, 입력 폼을 상단에 항상 렌더링 */}
        {!isMemberIdSet && (
          <form onSubmit={handleMemberIdSubmit} style={{ marginBottom: 20 }}>
            <label>
              본인의 Member ID를 입력하세요:{" "}
              <input
                type="text"
                value={myMemberId}
                onChange={(e) => setMyMemberId(e.target.value)}
                placeholder="예: 1"
              />
            </label>
            <button type="submit" style={{ marginLeft: 8 }}>
              확인
            </button>
          </form>
        )}
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
              {msg.nickname} (ID: {msg.memberId}):
            </strong>{" "}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 메시지 입력란 및 전송 버튼 */}
      <input
        style={{ width: 200, marginRight: 8 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="메시지를 입력..."
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

export default ParticipateChatRoom;
