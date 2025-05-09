
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { pipeline } from "https://esm.sh/@huggingface/transformers@3.5.1";

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

    try {
      // Initialize the text generation pipeline
      const generator = await pipeline("text-generation", "gpt2");

      // Generate response
      const result = await generator(prompt, { 
        max_length: 50,
        do_sample: true
      });

      console.log("Generated result:", result);
      
      // Extract the generated text
      const response = result[0].generated_text;

      return new Response(
        JSON.stringify({ response }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (inferenceError) {
      console.error("Error during model inference:", inferenceError);
      return new Response(
        JSON.stringify({ 
          error: "AI model error", 
          details: "There was an error processing your request with the AI model."
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
