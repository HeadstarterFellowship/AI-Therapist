import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const openai = new OpenAI();
const client = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = client.index("ai-therapy");

// Example data generation function, creates many (id, vector) pairs
const generateExampleData = (userId, message) => {
    // Here you would use an embedding model to generate the vector
    // This is just a placeholder
    const vector = openai.embeddings.create({
        model: "text-embedding-3-small",
        input: message,
        encoding_format: "float",
      });

    return {
        id: `${userId}-${Date.now()}`,
        values: vector,
        metadata: { userId: userId, message: message }
    };
};

// Upsert function
const upsertUserVector = async (userId, message) => {
    const vectorData = generateExampleData(userId, message);
    await index.upsert([vectorData]);
};