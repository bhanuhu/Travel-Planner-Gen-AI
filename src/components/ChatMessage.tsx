
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
}

const ChatMessage = ({ content, isUser }: ChatMessageProps) => {
  return (
    <div className={cn("flex items-end gap-2 mb-4", isUser ? "flex-row-reverse" : "")}>
      <div 
        className={cn(
          "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
          isUser ? "bg-blue-500" : "bg-gray-200"
        )}
      >
        <MessageSquare 
          className={cn("h-4 w-4", isUser ? "text-white" : "text-gray-600")} 
        />
      </div>
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl shadow-sm",
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        )}
      >
        <p className="break-words text-sm">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
