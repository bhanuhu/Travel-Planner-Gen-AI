
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "No prompt provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Received prompt:", prompt);

    // Generate a more coherent response based on the prompt
    const enhancedResponse = generateEnhancedResponse(prompt);
    
    console.log("Generated enhanced response");
    
    return new Response(
      JSON.stringify({ response: enhancedResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Function to generate more contextually relevant responses
function generateEnhancedResponse(prompt: string): string {
  // Clean and normalize the prompt
  const cleanPrompt = prompt.trim().toLowerCase();
  
  // Check for greeting patterns
  if (cleanPrompt.match(/^(hi|hello|hey|greetings|howdy)/)) {
    return "Hello! I'm an AI assistant ready to help you. What would you like to know about?";
  }
  
  // Check for questions about the AI
  if (cleanPrompt.match(/(who are you|what are you|about yourself|your name)/)) {
    return "I'm a simulated AI assistant designed to help answer your questions and provide information on various topics.";
  }

  // Check for how are you type questions
  if (cleanPrompt.match(/(how are you|how's it going|how do you feel|how are things)/)) {
    return "I'm functioning well, thank you for asking! How can I assist you today?";
  }
  
  // Check for thank you messages
  if (cleanPrompt.match(/(thank you|thanks|appreciate it|grateful)/)) {
    return "You're welcome! If you have more questions, feel free to ask.";
  }

  // Check for specific topic categories and provide appropriate responses
  
  // Technology and computers
  if (cleanPrompt.match(/(computer|technology|internet|software|hardware|programming|code|ai|artificial intelligence)/)) {
    return `Regarding ${prompt}, technology is constantly evolving. Recent advancements have made significant impacts across industries, from AI and machine learning to cloud computing and edge devices. What specific aspect interests you the most?`;
  }
  
  // Science
  if (cleanPrompt.match(/(science|scientific|physics|chemistry|biology|astronomy|space|planet|star|galaxy)/)) {
    return `${prompt} touches on fascinating scientific concepts. Science helps us understand the universe through systematic observation and experimentation. There have been remarkable discoveries in this field recently that have changed our understanding.`;
  }
  
  // History
  if (cleanPrompt.match(/(history|historical|ancient|medieval|century|war|civilization|empire|kingdom)/)) {
    return `When discussing ${prompt}, it's important to consider the historical context. History provides valuable lessons and insights into human development, societal structures, and how past events continue to shape our present world.`;
  }

  // Generic knowledgeable response if no specific pattern is matched
  const responses = [
    `Regarding ${prompt}, there are several key points to consider. First, context is essential for a complete understanding. Second, this topic has evolved significantly over time as new research has emerged.`,
    
    `${prompt} is a fascinating subject with multiple dimensions. Experts in the field have various perspectives, ranging from traditional interpretations to more contemporary analyses based on recent findings.`,
    
    `When examining ${prompt}, it's worth noting the interconnected factors that influence this topic. Recent developments have added new layers of understanding that challenge some previously held assumptions.`,
    
    `The topic of ${prompt} has been studied extensively across different disciplines. What makes this particularly interesting is how different fields contribute unique insights, creating a more comprehensive understanding.`,
    
    `Analyzing ${prompt} requires considering both theoretical frameworks and practical applications. The balance between these approaches helps develop a more nuanced understanding of the subject matter.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
