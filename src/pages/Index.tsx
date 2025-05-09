
import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ArrowUp, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Message {
  content: string;
  isUser: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: Message = { content: message, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Add AI response to chat
      const botMessage: Message = { content: data.response, isUser: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Connection Error",
        description: "Could not connect to the GPT-2 service.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white shadow-sm border-b">
        <div className="container max-w-4xl mx-auto flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold">GPT-2 Chat Interface</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <Card className="max-w-4xl mx-auto bg-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Chat Session</CardTitle>
            <CardDescription>Start chatting with GPT-2 AI model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-y-auto max-h-[calc(100vh-240px)] p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                  <ArrowUp className="mb-2 h-6 w-6" />
                  <p className="text-sm text-center">Start a conversation by typing a message</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    content={message.content}
                    isUser={message.isUser}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="pt-2 border-t">
              <ChatInput onSend={sendMessage} isLoading={loading} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
