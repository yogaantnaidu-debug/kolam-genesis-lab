import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to help you with kolam designs and patterns. Ask me anything about traditional kolam art, design principles, or how to use this platform!",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot response (replace with actual API call)
    try {
      const botResponse = await generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateBotResponse = async (userInput: string): Promise<string> => {
    // Simple keyword-based responses for kolam-related queries
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("kolam") || lowerInput.includes("design")) {
      return "Kolam is a traditional Indian art form where geometric patterns are drawn using rice flour or chalk powder. The designs often follow mathematical principles like symmetry, fractals, and geometric progressions. Would you like to know more about specific design patterns?";
    }
    
    if (lowerInput.includes("generate") || lowerInput.includes("create")) {
      return "To generate a kolam design, click on the 'Generate Kolam Design' card above. Our AI system uses traditional design principles to create authentic patterns. You can specify parameters like complexity, size, and style preferences.";
    }
    
    if (lowerInput.includes("analyze") || lowerInput.includes("upload")) {
      return "To analyze a kolam design, use the 'Analyze Kolam Design' feature. Upload an image of your kolam, and our system will identify the underlying mathematical patterns, symmetries, and design principles used in the artwork.";
    }
    
    if (lowerInput.includes("principle") || lowerInput.includes("pattern")) {
      return "Kolam designs are based on several key principles: symmetry (rotational and reflective), geometric progression, fractal patterns, and grid-based construction. These mathematical foundations make each design both beautiful and structurally sound.";
    }
    
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hello! I'm excited to help you explore the fascinating world of kolam designs. What would you like to know about traditional patterns or our design tools?";
    }
    
    return "That's an interesting question about kolam designs! While I specialize in traditional kolam patterns and design principles, I'd be happy to help you with generating designs, analyzing patterns, or learning about the mathematical foundations of this beautiful art form. What specific aspect interests you most?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={cn(
        "w-80 h-96 shadow-xl transition-all duration-300",
        isMinimized && "h-12"
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer" 
                   onClick={() => setIsMinimized(!isMinimized)}>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Kolam Assistant
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                      Typing...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about kolam designs..."
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}