import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

// Initialize Pinecone and OpenAI clients
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = client.index("ai-therapist");

// Data generation function, creates many (id, vector) pairs
export const generateVectorValues = async (userId, message) => {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: message,
    });
    const vector = response.data[0].embedding;

    return {
        id: `${userId}-${Date.now()}`,
        values: vector,
        metadata: { userId: userId, message: message }
    };
};

// Upsert function
export const upsertUserVector = async (userId, message) => {
    const vectorData = await generateVectorValues(userId, message);
    const namespace = index.namespace(userId);
    await namespace.upsert([vectorData]);
};

export const queryUserVectors = async (userId, message) => {
    const vectorData = await generateVectorValues(userId, message);
    const namespace = index.namespace(userId);

    const queryVector = vectorData.values;
    const results = await namespace.query({
        vector: queryVector,
        topK: 3,
        includeMetadata: true
    });

    return results.matches;

}