import { useState } from "react";
import OpenAI from "openai";
import { SiOpenai } from "react-icons/si";
import { AiOutlineSend } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function ChatGPT() {
  const API_KEY = import.meta.env;

  const OPENAI_API_KEY = API_KEY.VITE_REACT_APP_OPENAI;

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "user",
      content: "I'm a user, I ask the questions",
      text: "I'm an AI, and I answers the questions...",
    },
  ]);
  const [active, setActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (question.trim() === "") {
      setMessages([
        ...messages,
        {
          role: "user",
          content: question,
          text: "Input field cannot be empty",
        },
      ]);
      return;
    }

    setActive(true);
    setMessages([
      ...messages,
      { role: "user", content: question, text: "Loading..." },
    ]);

    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
      });

      setQuestion("");
      console.log(response)
      const responseData = response.choices[0].message.content;
      setMessages([
        ...messages,
        { role: "user", content: question, text: responseData },
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...messages,
        { role: "user", content: question, text: "Error occurred" },
      ]);
    }

    setActive(false);
  };
  return (
    <main className="grid lg:flex min-h-screen flex-col items-center lg:justify-between py-3 lg:py-9 px-3 lg:px-20">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link
          to="/"
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          Get started with Sampic&nbsp;
        </Link>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            to="/"
          >
            By{" "}
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Samson
            </p>
          </Link>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>

      <div className="grid gap-3 z-10 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 outline-none border rounded-md max-w-5xl w-full p-3">
        <div className="flex flex-col h-[400px] w-full overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index}>
              <div className="my-2 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 outline-none border rounded-md flex gap-3 w-full p-3">
                <div className="">
                  <div className="bg-blue-900 p-1.5 rounded-md">
                    <CiUser className="w-5 h-5" />
                  </div>
                </div>
                <p className="w-full">{message.content}</p>
              </div>
              {message.text && (
                <div className="border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 outline-none border rounded-md flex gap-3 w-full p-3">
                  <div className="flex gap-3 w-full">
                    <div className="">
                      <div className="bg-green-900 p-1.5 rounded-md">
                        <SiOpenai className="w-5 h-5" />
                      </div>
                    </div>
                    <p>{message.text}</p>
                  </div>
                  {/* <ClipBoard text={message.text} /> */}
                </div>
              )}
            </div>
          ))}
        </div>
        <form
          className="flex w-full items-center justify-center font-mono text-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between gap-1 w-full">
            <span
              className="border-gray-300 text-red-500 cursor-pointer bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 p-3 rounded-md"
              onClick={() => {
                setMessages([]);
              }}
            >
              <BiTrash className="w-5 h-5" />
            </span>
            <input
              autoComplete="off"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 h-12 w-full p-3 outline-none border rounded-md"
            />
            <button
              disabled={active}
              className="border-gray-300 text-white bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 p-3 rounded-md"
              type="submit"
            >
              {active ? (
                <HiOutlineDotsHorizontal className="w-5 h-5" />
              ) : (
                <AiOutlineSend className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
