import { useEffect, useState, useRef } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws/chat/");

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data.message]);
    };

    return () => socketRef.current.close();
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    socketRef.current.send(JSON.stringify({ message }));
    setMessage("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatBox}>
        <div style={styles.header}>💬 My Chatbot</div>

        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <div key={i} style={styles.message}>
              {msg}
            </div>
          ))}
        </div>

        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button style={styles.button} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #fce7f3, #fbcfe8, #ede9fe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },

  chatBox: {
    width: "420px",
    height: "550px",
    background: "rgba(255, 255, 255, 0.85)",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
    backdropFilter: "blur(10px)",
  },

  header: {
    padding: "18px",
    background: "linear-gradient(90deg, #f472b6, #c084fc)",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "20px",
    letterSpacing: "1px",
  },

  messages: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "linear-gradient(#fdf2f8, #faf5ff)",
  },

  message: {
    background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)",
    color: "#4a044e",
    padding: "10px 14px",
    borderRadius: "18px",
    alignSelf: "flex-start",
    maxWidth: "75%",
    fontSize: "14px",
    boxShadow: "0 4px 10px rgba(192, 132, 252, 0.4)",
  },

  inputArea: {
    display: "flex",
    padding: "12px",
    background: "linear-gradient(90deg, #fbcfe8, #ede9fe)",
    borderTop: "1px solid #f9a8d4",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "20px",
    border: "1px solid #f9a8d4",
    outline: "none",
    fontSize: "14px",
    background: "#fff",
  },

  button: {
    marginLeft: "10px",
    padding: "10px 18px",
    background: "linear-gradient(135deg, #f472b6, #c084fc)",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(236, 72, 153, 0.4)",
  },
};

export default Chat;
