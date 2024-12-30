import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="p-10 m-10 rounded-md w-full"
      style={{
        background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)", // Subtle gradient background
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow for a polished look
      }}
    >
      <h1 className="text-4xl font-light">
        Welcome to{" "}
        <span
          className="font-semibold"
          style={{
            background: "linear-gradient(90deg, #4d7dfb, #2991ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AIris
        </span>
      </h1>
      <h2 className="mt-2 mb-10 text-gray-600">
        Your customisable AI chat agent that helps you manage your customer
        conversations.
      </h2>
      <Link href="/create-chatbot">
        <Button
          className="bg-[#4d7dfb] hover:bg-[#2991ee] text-white font-semibold px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          Let's get started by creating your first chatbot
        </Button>
      </Link>
    </main>
  );
}
