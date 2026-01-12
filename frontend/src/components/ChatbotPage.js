import React from "react";
import "./ChatbotPage.css";
import Navbar from "./Navbar";

const messages = [
  { sender: "user", text: "I want the fastest way." },
  { sender: "ai", text: "Ok! 🚗 The fastest route will get you there in 25 minutes covering 12 km. The skies are clear ☀️... But keep in mind pollution levels on the route are a bit high." },
  { sender: "user", text: "Show me a route with less pollution." },
  { sender: "ai", text: "Sure! I found an eco-friendly route for you. It takes 35 minutes for about 15 km. Pollution levels are low, and though you’ll spend more time, the air is fresher on the way. Shall I suggest rain-safe alternatives, or do you wish to go with this route?" },
];

function ChatbotPage() {
  return React.createElement(
    "div",
    { className: "chatbot-bg" },
    React.createElement(
      "div",
      { className: "chatbot-container" },
      React.createElement(
        "header",
        null,
        React.createElement("div", { className: "chatbot-userinfo" },
          React.createElement(Navbar, null)
        )
      ),
      React.createElement(
        "main",
        { className: "chatbot-main" },
        React.createElement("h1", { className: "chatbot-title" }, "Ask our AI anything"),
        React.createElement(
          "div",
          { className: "chatbot-chatwindow" },
          messages.map(function(msg, idx) {
            return React.createElement(
              "div",
              {
                key: idx,
                className:
                  "chatbot-bubble " +
                  (msg.sender === "user"
                    ? "chatbot-bubble-user"
                    : "chatbot-bubble-ai"),
              },
              msg.text
            );
          }),
          React.createElement(
            "form",
            { className: "chatbot-inputrow" },
            React.createElement("input", {
              type: "text",
              placeholder: "Ask me anything about OptimalRoute",
              className: "chatbot-input",
              disabled: true,
            }),
            React.createElement(
              "button",
              {
                type: "submit",
                className: "chatbot-btn",
                disabled: true,
              },
              "▶"
            )
          )
        )
      )
    )
  );
}

export default ChatbotPage;
