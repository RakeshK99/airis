'use client';

import { ChatbotCharacteristic } from "@/types/types";
import { OctagonX } from "lucide-react";
import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_CHARACTERISTIC } from "@/graphql/mutations/mutations";
import { toast } from "sonner";

function Characteristic({
  characteristic,
}: {
  characteristic: ChatbotCharacteristic;
}) {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"], // Ensures the list refreshes after deletion
  });

  const handleRemoveCharacteristic = async (id: number) => {
    try {
      const promise = removeCharacteristic({
        variables: {
          id, // Correct variable name for the mutation
        },
      });

      // Display success/failure toast messages
      await toast.promise(promise, {
        loading: "Removing...",
        success: "Characteristic removed",
        error: "Failed to remove characteristic",
      });
    } catch (error) {
      console.error("Error removing characteristic:", error);
      toast.error("Failed to remove characteristic. Please try again.");
    }
  };

  return (
    <li key={characteristic.id} className="relative p-10 bg-white border rounded-md">
      {characteristic.content}
      <OctagonX
        className="w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
        onClick={() => handleRemoveCharacteristic(characteristic.id)}
      />
    </li>
  );
}

export default Characteristic;
