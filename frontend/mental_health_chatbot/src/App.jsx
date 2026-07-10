import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5000";

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // -----------------------------
  // Send message
  // -----------------------------
  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      sender: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const chatHistory = messages
      .slice(-8)
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

    try {
      const res = await fetch(`${backendUrl}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, chat_history: chatHistory }),
      });

      const data = await res.json();

      let botText = data.reply || "I’m sorry, something went wrong.";
      const risk = data?.analysis?.risk_level || "low";

      // Emoji for mood
      if (data?.analysis) {
        const emotion = data.analysis.emotion;
        if (emotion === "joy") botText = "😊 " + botText;
        else if (emotion === "sadness") botText = "😔 " + botText;
        else if (emotion === "fear") botText = "😨 " + botText;
        else if (emotion === "anger") botText = "😡 " + botText;
        else botText = "💬 " + botText;
      }

      const botMsg = {
        sender: "bot",
        text: botText,
        risk,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I’m having trouble connecting right now. Please try again.",
          risk: "error",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Enter key sends message
  // -----------------------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // -----------------------------
  // Start new chat
  // -----------------------------
  const startNewChat = () => {
    setMessages([]);
    setInput("");
    localStorage.removeItem("mh_chat_history");
  };

  // -----------------------------
  // Dynamic background gradient
  // -----------------------------
  const getBackgroundGradient = () => {
    if (!messages.length) return "linear-gradient(to right, #f0f4f8, #d9e2ec)";
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.sender === "bot" && lastMsg.risk === "high") return "linear-gradient(to right, #ffcccc, #ffe6e6)";
    if (lastMsg.sender === "bot" && lastMsg.risk === "medium") return "linear-gradient(to right, #fff0b3, #fff7cc)";

    const emotion = lastMsg.text.includes("😊")
      ? "joy"
      : lastMsg.text.includes("😔")
      ? "sadness"
      : lastMsg.text.includes("😨")
      ? "fear"
      : lastMsg.text.includes("😡")
      ? "anger"
      : "neutral";

    switch (emotion) {
      case "joy":
        return "linear-gradient(to right, #d6f7d6, #a3e4a1)";
      case "sadness":
        return "linear-gradient(to right, #e6f0ff, #cce0ff)";
      case "fear":
        return "linear-gradient(to right, #fff5e6, #ffe0cc)";
      case "anger":
        return "linear-gradient(to right, #ffe6e6, #ffb3b3)";
      default:
        return "linear-gradient(to right, #f0f4f8, #d9e2ec)";
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="app-wrapper" style={{ background: getBackgroundGradient(), minHeight: "100vh" }}>
      <div className="app-container">
        <header className="app-header">
          <h1>Mental Wellness Chat</h1>
          <p className="disclaimer">
            Not a substitute for professional help. If you are in crisis, contact emergency services immediately.
          </p>

          <button className="new-chat-btn" onClick={startNewChat}>
            Start New Chat
          </button>
        </header>

        <div className="chat-window" ref={chatRef}>
          {messages.length === 0 && (
            <div className="bot-message initial">
              <p>
                Hi, I’m here for you. I’m not a professional, but I can offer basic emotional support. How are you feeling today?
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender}-message ${msg.risk === "high" ? "high-risk" : ""} ${msg.risk === "medium" ? "med-risk" : ""}`}
            >
              <p>{msg.text}</p>
              <span className="timestamp">{msg.time}</span>
            </div>
          ))}

          {loading && (
            <div className="message bot-message typing">
              <p>Typing...</p>
            </div>
          )}
        </div>

        <form
          className="input-area"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type how you're feeling…"
            rows={3}
            disabled={loading}
          />
          <button disabled={loading || !input.trim()}>
            {loading ? "Thinking…" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
