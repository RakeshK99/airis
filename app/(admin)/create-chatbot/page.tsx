'use client'

import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CREATE_CHATBOT } from "@/graphql/mutations/mutations";
import { useMutation } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function CreateChatbot() {
    const { user } = useUser();
    const [name, setName] = useState("");
    const router = useRouter();

    const [createChatbot, { loading, error }] = useMutation(CREATE_CHATBOT);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await createChatbot({
                variables: {
                    clerk_user_id: user?.id, // Pass the user's ID
                    name, // Pass the chatbot name
                },
            });

            // Navigate to the edit page using the returned chatbot ID
            router.push(`/edit-chatbot/${data.insertChatbots.id}`);
            setName(""); // Clear the form field
        } catch (err) {
            console.error("Error creating chatbot:", err);
        }
    };

    if (!user) {
        return null; // Return nothing if user is not logged in
    }

    return (
        <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
            <Avatar seed="create-chatbot" />
            <div>
                <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
                <h2 className="font-light">
                    Create a new chatbot to assist you in your conversations with your customers.
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mt-5">
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Chatbot Name..."
                        className="max-w-lg"
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Chatbot"}
                    </Button>
                </form>
                {error && <p className="text-red-500 mt-3">Error: {error.message}</p>}
                <p className="text-gray-300 mt-5">Example: Customer Support Chatbot</p>
            </div>
        </div>
    );
}

export default CreateChatbot;
