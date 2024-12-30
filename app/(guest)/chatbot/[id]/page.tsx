"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ChatbotPage({ params: { id } }: { params: { id: string } }) {
  return <div>ChatbotPage: {id}</div>;
}

export default ChatbotPage;
