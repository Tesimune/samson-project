import { useState } from "react";
import { Link } from "react-router-dom";
import OpenAI from "openai";
import { AiOutlineSend } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "../assets/react.svg";

export default function ImageGenerator() {
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);
  const [images, setImage] = useState([
    {
      url: Image,
      content: "I'm a user, I ask the questions",
    },
  ]);
  
  const API_KEY = import.meta.env;
  const OPENAI_API_KEY = API_KEY.VITE_REACT_APP_OPENAI;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description.trim() === "") {
      alert("Description can not be empty")
    }

    setActive(true);
    
    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.images.generate({
        prompt: description,
        n: 1,
        size: "1024x1024",
      });

      setDescription("");
      const image = response.data[0].url;
      console.log(response)
      setImage([
        { url: image, content: description },
        ...images,
      ]);
    } catch (error) {
      console.error(error);
    }

    setActive(false);
  };

  return (
    <main className="grid lg:flex min-h-screen flex-col items-center lg:justify-between py-3 lg:py-9 px-3 lg:px-20">
      <div className="mb-16 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
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

      <form
        className="mb-9 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between gap-1 w-full">
          <input
            className="border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 h-12 w-full p-3 outline-none border rounded-md"
            autoComplete="off"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Image description"
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
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>

      <div className="mb-32 grid gap-5 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {images.map((img, index) => (
          <div key={index} className="grid gap-3">
            <div className="flex justify-center items-center bg-slate-50 h-56 w-full rounded-lg shadow-lg">
              <img
                className="object-cover rounded-lg"
                src={img.url}
                alt="..."
              />
            </div>
            <Link to={img.url} download={img.content} target="blank" className="flex justify-center w-full outline-none border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Download
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
