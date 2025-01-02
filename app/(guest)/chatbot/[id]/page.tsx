// "use client";

// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import startNewChat from "@/lib/startNewChat";
// import Avatar from "@/components/Avatar";
// import {
//   GetChatbotByIdResponse,
//   Message,
//   MessagesByChatSessionIdResponse,
//   MessagesByChatSessionIdVariables,
// } from "@/types/types";
// import { useQuery } from "@apollo/client";
// import {
//   GET_CHATBOT_BY_ID,
//   GET_MESSAGES_BY_CHAT_SESSION_ID,
// } from "@/graphql/queries/queries";
// import Messages from "@/components/Messages";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormProvider, useForm } from "react-hook-form";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// // Form validation schema
// const formSchema = z.object({
//   message: z.string().min(2, "Your Message is too short!"),
// });

// function ChatbotPage({ params }: { params: { id: string } }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const [chatId, setChatId] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [id, setId] = useState<string | null>(null);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       message: "",
//     },
//   });

//   useEffect(() => {
//     // Resolve `params` and set the `id` state
//     (async () => {
//       const resolvedParams = await params;
//       setId(resolvedParams.id);
//     })();
//   }, [params]);

//   const { data: chatBotData } = useQuery<GetChatbotByIdResponse>(
//     GET_CHATBOT_BY_ID,
//     {
//       variables: { id },
//       skip: !id,
//     }
//   );

//   const {
//     loading: loadingQuery,
//     error,
//     data,
//   } = useQuery<MessagesByChatSessionIdResponse, MessagesByChatSessionIdVariables>(
//     GET_MESSAGES_BY_CHAT_SESSION_ID,
//     {
//       variables: { chat_session_id: chatId },
//       skip: !chatId,
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       setMessages(data.chat_sessions.messages);
//     }
//   }, [data]);

//   const handleInformationSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const newChatId = await startNewChat(name, email, Number(id));
//     setChatId(newChatId);
//     setLoading(false);
//     setIsOpen(false);
//   };

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setLoading(true);
//     const { message } = values;
//     form.reset();

//     if (!name || !email) {
//       setIsOpen(true);
//       setLoading(false);
//       return;
//     }

//     if (!message.trim()) {
//       return; // Do not submit if the message is empty
//     }

//     // Optimistically update the UI with the user's message
//     const userMessage: Message = {
//       id: Date.now(),
//       content: message,
//       created_at: new Date().toISOString(),
//       chat_session_id: chatId,
//       sender: "user",
//     };

//     const loadingMessage: Message = {
//       id: Date.now() + 1,
//       content: "Thinking...",
//       created_at: new Date().toISOString(),
//       chat_session_id: chatId,
//       sender: "ai",
//     };

//     setMessages((prevMessages) => [...prevMessages, userMessage, loadingMessage]);

//     try {
//       const response = await fetch("/api/send-message", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           chat_session_id: chatId,
//           chatbot_id: id,
//           content: message,
//         }),
//       });

//       const result = await response.json();

//       setMessages((prevMessages) =>
//         prevMessages.map((msg) =>
//           msg.id === loadingMessage.id
//             ? { ...msg, content: result.content, id: result.id }
//             : msg
//         )
//       );
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   }

//   return (
//     <div className="w-full flex bg-gray-100">
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <form onSubmit={handleInformationSubmit}>
//             <DialogHeader>
//               <DialogTitle>Let's help you out!</DialogTitle>
//               <DialogDescription>
//                 I just need a few details to get started.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">
//                   Name
//                 </Label>
//                 <Input
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="John Doe"
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="email" className="text-right">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="john@appleseed.com"
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button type="submit" disabled={!name || !email || loading}>
//                 {!loading ? "Continue" : "Loading..."}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <div className="flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-t-lg shadow-2xl md:mt-10">
//         <div className="pb-4 border-b sticky top-0 z-50 bg-[#4D7DFB] py-5 px-10 text-white md:rounded-t-lg flex items-center space-x-4">
//           <Avatar
//             seed={chatBotData?.chatbots.name ?? "default-seed"}
//             className="h-12 w-12 bg-white rounded-full border-2 border-white"
//           />
//           <div>
//             <h1 className="truncate text-lg">{chatBotData?.chatbots.name}</h1>
//             <p className="text-sm text-gray-300">Typically replies instantly</p>
//           </div>
//         </div>
//         <Messages messages={messages} chatbotName={chatBotData?.chatbots.name!} />
//         <FormProvider {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="flex items-start sticky bottom-0 z-50 space-x-4 drop-shadow-lg p-4 bg-gray-100 rounded-md"
//           >
//             <FormField
//               control={form.control}
//               name="message"
//               render={({ field }) => (
//                 <FormItem className="flex-1">
//                   <FormLabel hidden>Message</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Type a message..." {...field} className="p-8" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               className="h-full"
//               disabled={form.formState.isSubmitting || !form.formState.isValid}
//             >
//               Send
//             </Button>
//           </form>
//         </FormProvider>
//       </div>
//     </div>
//   );
// }

// export default ChatbotPage;
