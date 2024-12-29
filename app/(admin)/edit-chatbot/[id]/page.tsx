'use client';

import { BASE_URL } from "@/graphql/apolloClient";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import Avatar from "@/components/Avatar";

export default function EditChatbot(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const { id } = (params);
    // No need to await since params is not a Promise
    const [url, setUrl] = useState<string>("");
    const [chatbotName, setChatbotName] = useState<string>("");


    useEffect(() => {
        if (id) {
            const generatedUrl = `${BASE_URL}/chatbot/${id}`;
            setUrl(generatedUrl);
        }
    }, [id]);

    return (
        <div className="px-0 md:p-10">
            <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]">
                <h2 className="text-white text-sm font-bold">Link to Chat</h2>
                <p className="text-sm italic text-white">
                    Share this link with your customers to start conversations with your chatbot
                </p>
                <div className="flex items-center space-x-2">
                    <Link href={url} className="w-full cursor-pointer hover:opacity-50">
                        <Input value={url} readOnly className="cursor-pointer" />
                    </Link>
                    <Button
                        size="sm"
                        className="px-3"
                        onClick={() => {
                            navigator.clipboard.writeText(url);
                            toast.success("Copied to clipboard");
                        }}
                    >
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <section className="relative mt-5 bg-white p-5 md:p-10 rounded-lg">
                <Button variant="destructive" className="absolute top-2 right-2 h-8 w-2"
                // onCLick={() => handleDelete(id)}
                >
                    X</Button>
                <div>
                        <Avatar seed={chatbotName} />
                </div>
            </section>
        </div>
    );
}
