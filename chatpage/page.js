"use client";

import { useState } from "react";
import Link from "next/link";
import "@/app/queries.css";
import { async } from "./../../api/chat/route";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hey, It's Penny Here! I'm your Pantrack App Support agent, how do you want me to help?`,
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", contentL: "" },
    ]);
    const response = fetch("../api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || newInt8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages(messages, length - 1);
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden items-center flex flex-col items-center bg-gray-900">
      <div className="bg-gray navbar -800 h-20 w-full flex items-center justify-between gap-4 p-10 rounded-lg shadow-xl w-96">
        <div className="logo">
          <Link href="/pages/homepage">
            <h1 className="mainlogo text-sky-500 text-2xl ">
              Pantrack<span className="text-white">.</span>
            </h1>
          </Link>
          <p className="logodesc text-white text-xl ">
            Your One-stop inventory system.
          </p>
        </div>

        <div className=" nav flex gap-20 items-center">
          <Link
            href="/pages/homepage"
            className="home hidden link bg-sky-500 hover:shadow-xl w-46 flex transition ease-in-out gap-2 rounded-md hover:rounded-md hover:bg-sky-200 hover:text-indigo-900 p-2 text-xl"
          >
            {" "}
            <img src="../home.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/grocery"
            className="link bg-sky-500 hover:shadow-xl w-46 flex transition ease-in-out gap-2 rounded-md hover:rounded-md hover:bg-sky-200 hover:text-indigo-900 p-2 text-xl"
          >
            {" "}
            Grocery Cart <img src="../cart.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/pantry"
            className="link bg-sky-500 hover:shadow-xl w-46 hover:rounded-md transition ease-in-out hover:bg-sky-200 hover:text-indigo-900  rounded-md p-2 flex gap-2 text-xl"
          >
            {" "}
            My Pantry <img src="../pantry.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/recipes"
            className="link bg-sky-500 hover:shadow-xl w-46 hover:rounded-md transition ease-in-out hover:bg-sky-200 hover:text-indigo-900 rounded-md p-2 flex gap-2 text-xl"
          >
            {" "}
            My Recipes <img src="../recipe.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/chatpage"
            className="link bg-sky-500 hover:shadow-xl w-46 hover:rounded-md transition ease-in-out hover:bg-sky-200 hover:text-indigo-900 rounded-md p-2 flex gap-2 text-xl"
          >
            {" "}
            Chat Penny ! <img src="../old.svg" className="w-6"></img>
          </Link>
        </div>

        <button
          className=" logout link flex gap-2 hover:shadow-xl rounded-md transition ease-in-out p-2 bg-red-600 text-xl mb-5 hover:text-black hover:bg-red-900"
          onClick={() => {
            {
              signOut(auth);
            }
          }}
        >
          Log-Out <img src="../power.svg" className="log w-6"></img>
        </button>
      </div>
      <div className="w-screen h-screen gap-10 p-20 m-20 flex flex-col items-center justify-center bg-indigo-600">
        <div className="flex flex-col w-80vw h-5/6 border-4 rounded-2xl bg-indigo-900 overflow-auto border-black p-10  gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center p-5 ${
                message.role === "assistant" ? "content-start" : "content-end"
              }`}
            >
              <div
                className={`text-white rounded-3xl hover:text-black transition ease-in-out text-xl p-5 ${
                  message.role === "assistant" ? "bg-indigo-400" : "bg-sky-500"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex bg-indigo-900 rounded-2xl border-black border-2 p-10 items-center  justify-center gap-4">
          <input
            type="text"
            value={message}
            placeholder="Ask a question..."
            onChange={(e) => setMessage(e.target.value)}
            className=" send hover:shadow-xl rounded-xl w-100vw h-14px p-5 bg-indigo-700 text-black"
          ></input>
          <button
            onClick={sendMessage}
            className=" send hover:shadow-xl bg-indigo-700 p-5 w-auto h-14px rounded-xl"
          >
            {" "}
            <img src="../send.svg" className="w-6"></img>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
