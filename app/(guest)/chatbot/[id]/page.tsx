"use client";;
import { use } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ChatbotPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);

  const {
    id
  } = params;

  return <div>ChatbotPage: {id}</div>;
}

export default ChatbotPage;
