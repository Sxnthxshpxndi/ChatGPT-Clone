import "./App.css";
import gptLogo from "/Users/santhoshpandi/Documents/clone/src/assets  /chatgpt.svg";
import addBtn from "/Users/santhoshpandi/Documents/clone/src/assets  /add-30.png";
import msgIcon from "/Users/santhoshpandi/Documents/clone/src/assets  /message.svg";
import home from "/Users/santhoshpandi/Documents/clone/src/assets  /home.svg";
import saved from "/Users/santhoshpandi/Documents/clone/src/assets  /bookmark.svg";
import rocket from "/Users/santhoshpandi/Documents/clone/src/assets  /rocket.svg";
import sendBtn from "/Users/santhoshpandi/Documents/clone/src/assets  /send.svg";
import userIcon from "/Users/santhoshpandi/Documents/clone/src/assets  /user-icon.png";
import gptImgLogo from "/Users/santhoshpandi/Documents/clone/src/assets  /chatgptLogo.svg";
import { sendMsgToOpenAI } from "./openai";
import { useEffect, useState, useRef } from "react";

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi , I am ChatGPT. How can I help you?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(input);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  const handleEnter = async (e) => {
    if (e.target === "Enter") await handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;

    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            {" "}
            <img src={gptLogo} alt="Logo" className="logo" />{" "}
            <snap className="brand">ChatGPT</snap>
          </div>

          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={addBtn} alt="" className="addBtn" /> New Chat
          </button>

          <div className="upperSideBottom">
            <button
              className="query"
              onClick={handleQuery}
              value={" What is programming?"}
            >
              <img src={msgIcon} alt="Query" />
              What is programming?
            </button>
            <button
              className="query"
              onClick={handleQuery}
              value={" How to use an API?"}
            >
              <img src={msgIcon} alt="Query" />
              How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="" className="listItemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="" className="listItemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="" className="listItemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          <div className="chat">
            <img className="chatimg" src={userIcon} alt="" />
            <p className="txt">lorem20</p>
          </div>

          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatimg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt=""
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>
            ChatGPT may produce inaccurate information about people , places ,
            or facts. ChatGPT August 20 Version.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
