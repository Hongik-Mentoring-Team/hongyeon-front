import React, { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";

// 백엔드의 WebSocket 엔드포인트
const WS_ENDPOINT = "http://localhost:8080/ws-stomp"; // SockJS 사용 시 변경 가능
const SEND_DESTINATION = "/app/chat/message"; // 메시지 전송 경로

function Chat({ chatRoomId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const stompClientRef = useRef(null);

  useEffect(() => {
    // 1) STOMP 클라이언트 생성
    const stompClient = new Client({
      brokerURL: WS_ENDPOINT.replace("http", "ws"), // ws:// 또는 wss:// 변환
      reconnectDelay: 5000, // 자동 재연결 (5초)
      debug: (msg) => console.log(msg), // 디버그 로그 (필요 없으면 제거 가능)
      onConnect: () => {
        console.log("STOMP Connection 성공");

        // 2) 채팅방 메시지 수신 구독
        const subscribeUrl = `/topic/chat/${chatRoomId}`;
        stompClient.subscribe(subscribeUrl, (message) => {
          if (!message.body) return;
          const msgData = JSON.parse(message.body);
          setMessages((prev) => [...prev, msgData]);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP 오류 발생:", frame);
      },
    });

    // 3) STOMP 클라이언트 활성화
    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      // 4) 컴포넌트 언마운트 시 연결 해제
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log("STOMP 연결 해제됨");
      }
    };
  }, [chatRoomId]);

  // 메시지 전송
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    if (!stompClientRef.current || !stompClientRef.current.connected) {
      alert("소켓 연결이 안 되어 있습니다.");
      return;
    }

    const chatMessageDto = {
      chatRoomId: chatRoomId,
      nickname: "myNick", //파라미터 바인딩으로 변경
      memberId: 1, //파라미터 바인딩으로 변경
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
      <h2>채팅방 #{chatRoomId}</h2>
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
            <strong>{msg.nickname}:</strong> {msg.content}
          </div>
        ))}
      </div>

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

export default Chat;
