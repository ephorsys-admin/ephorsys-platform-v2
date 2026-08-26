"use client";

import { useState, useEffect, useRef } from "react";
import { Send, X } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const getBotResponse = (input: string): string => {
  const query = input.toLowerCase();

  if (
    query.includes("hello") ||
    query.includes("hi") ||
    query.includes("hey") ||
    query.includes("greetings")
  ) {
    return "Hello! I'm the Ephorsys AI assistant. How can I help you today?";
  }

  if (
    query.includes("service") ||
    query.includes("what you do") ||
    query.includes("capabilities") ||
    query.includes("web") ||
    query.includes("app") ||
    query.includes("seo")
  ) {
    return "We specialize in Custom Software Development, Web Development (Next.js, React), Mobile App Development (React Native, Flutter), AI/LLM Integration, and Digital Marketing/SEO. We'd love to help you build your product!";
  }

  if (
    query.includes("team") ||
    query.includes("member") ||
    query.includes("leader") ||
    query.includes("developer") ||
    query.includes("marketing") ||
    query.includes("bde")
  ) {
    return "Our expert team is organized into four sections: Leadership, Core Developers, Core Digital Marketing, and Business Development Executives. You can see our team details on our /team page!";
  }

  if (
    query.includes("portfolio") ||
    query.includes("work") ||
    query.includes("project") ||
    query.includes("case study")
  ) {
    return "We have successfully delivered 13+ digital products. Check out our /portfolio page to see our full list of projects, technologies used, and client details!";
  }

  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("call") ||
    query.includes("address") ||
    query.includes("office")
  ) {
    return "You can reach us directly at contact@ephorsys.com or call +91-9556536002. You can also fill out the form on our /contact page, and we'll reply within 24 hours.";
  }

  if (
    query.includes("career") ||
    query.includes("job") ||
    query.includes("hiring") ||
    query.includes("join")
  ) {
    return "We're always looking for talented and passionate developers, designers, and marketers! Please head to our /career page to view all open positions and apply.";
  }

  if (
    query.includes("price") ||
    query.includes("cost") ||
    query.includes("quote") ||
    query.includes("budget")
  ) {
    return "We provide flexible milestone-based pricing tailored to your project requirements. Feel free to contact our solutions team at contact@ephorsys.com with your project brief for a free proposal!";
  }

  return "I'd be glad to help you! You can ask me about our services, portfolio projects, team members, careers, or how to contact our sales team. What would you like to know?";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi there! I'm your Ephorsys AI assistant. How can I help you today? Ask me about our services, team, portfolio, or how to get a quote!",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const userInput = input.trim();

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: getBotResponse(userInput),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* ================================
          FLOATING AI AGENT BUTTON
      ================================= */}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        className="
          fixed
          right-3 sm:right-5 lg:right-6
          bottom-24 sm:bottom-24 lg:bottom-24
          z-[60]
          w-16 h-16
          sm:w-20 sm:h-20
          lg:w-24 lg:h-24
          flex items-center justify-center
          transition-all duration-300
          hover:scale-105
          active:scale-95
          focus:outline-none
        "
      >
        <img
          src="/agent.png"
          alt="Ephorsys Agent"
          className="
            w-14 h-14
            sm:w-18 sm:h-18
            lg:w-20 lg:h-20
            object-contain
            transition-transform duration-300
          "
        />
      </button>

      {/* ================================
          CHAT WINDOW
      ================================= */}

      {isOpen && (
        <div
          className="
            fixed
            z-[70]

            /* Mobile */
            left-3 right-3
            bottom-24
            h-[calc(100dvh-7rem)]

            /* Small devices */
            sm:left-auto
            sm:right-4
            sm:bottom-28
            sm:w-[390px]
            sm:h-[min(580px,calc(100dvh-8rem))]

            /* Tablet/Desktop */
            md:right-5
            md:w-[420px]
            md:h-[min(600px,calc(100dvh-8rem))]

            /* Large Desktop */
            lg:right-6
            lg:w-[430px]
            lg:h-[430px]

            max-w-[calc(100vw-1.5rem)]

            bg-zinc-950/95
            
            rounded-2xl sm:rounded-3xl
            shadow-[0_12px_45px_rgba(0,0,0,0.75)]
            backdrop-blur-md

            flex flex-col
            overflow-hidden
            text-white

            animate-fade-in
          "
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          {/* ================================
              HEADER
          ================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              px-4 py-3
              sm:px-5 sm:py-4
              bg-zinc-900
              border-b border-zinc-800
              shrink-0
            "
          >
            {/* Agent Info */}

            <div className="flex items-center gap-3 min-w-0">
              <div
                className="
                  relative
                  w-10 h-10
                  sm:w-11 sm:h-11
                  rounded-full
                  overflow-hidden
                  border
                  border-[#74c316]
                  shrink-0
                "
              >
                <img
                  src="/agent.png"
                  alt="Agent Avatar"
                  className="w-full h-full object-cover"
                />

                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-2.5 h-2.5
                    sm:w-3 sm:h-3
                    bg-green-500
                    border-2
                    border-zinc-900
                    rounded-full
                    animate-pulse
                  "
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-xs
                    sm:text-sm
                    font-black
                    tracking-wide
                    uppercase
                    text-white
                    truncate
                  "
                >
                  Ephorsys AI Agent
                </p>

                <p
                  className="
                    text-[9px]
                    sm:text-[10px]
                    text-green-400
                    font-extrabold
                    tracking-widest
                    uppercase
                    mt-0.5
                  "
                >
                  Online
                </p>
              </div>
            </div>

            {/* Close */}

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="
                p-2
                hover:bg-zinc-800
                rounded-lg
                text-zinc-400
                hover:text-white
                transition-colors
                shrink-0
              "
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ================================
              MESSAGES
          ================================= */}

          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
              overscroll-contain
              px-3 py-4
              sm:px-4 sm:py-5
              space-y-3 sm:space-y-4
              scrollbar-thin
              scrollbar-thumb-zinc-800
              scrollbar-track-transparent
            "
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[88%]
                    sm:max-w-[82%]
                    rounded-2xl
                    px-3.5 py-2.5
                    sm:px-4 sm:py-3
                    text-xs
                    sm:text-sm
                    leading-relaxed
                    shadow-sm
                    break-words

                    ${
                      m.sender === "user"
                        ? `
                          bg-[#74c316]
                          text-[#021004]
                          font-semibold
                          rounded-tr-xs
                        `
                        : `
                          bg-zinc-900
                          text-zinc-200
                          border
                          border-zinc-800/80
                          rounded-tl-xs
                        `
                    }
                  `}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing */}

            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="
                    bg-zinc-900
                    border
                    border-zinc-800/80
                    rounded-2xl
                    rounded-tl-xs
                    px-4 py-3
                    flex
                    items-center
                    gap-1
                    shadow-sm
                  "
                >
                  <span
                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />

                  <span
                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />

                  <span
                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ================================
              INPUT
          ================================= */}

          <form
            onSubmit={handleSend}
            className="
              shrink-0
              p-3
              sm:p-4
              border-t
              border-zinc-800/80
              bg-zinc-900/70
              flex
              gap-2
              sm:gap-2.5
              items-center
            "
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="
                min-w-0
                flex-1
                bg-zinc-950
                border
                border-zinc-800
                focus:border-[#74c316]
                rounded-xl
                px-3
                sm:px-4
                py-2.5
                sm:py-3
                text-xs
                sm:text-sm
                text-white
                outline-none
                focus:ring-2
                focus:ring-[#74c316]/10
                transition-all
                placeholder-zinc-500
              "
            />

            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="
                shrink-0
                w-10 h-10
                sm:w-11 sm:h-11
                bg-[#74c316]
                hover:bg-[#62a611]
                disabled:opacity-40
                disabled:cursor-not-allowed
                text-[#021004]
                rounded-xl
                hover:scale-105
                active:scale-95
                transition-all
                flex
                items-center
                justify-center
              "
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
