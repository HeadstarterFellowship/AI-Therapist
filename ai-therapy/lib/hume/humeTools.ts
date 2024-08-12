import { Hume } from 'hume';
import { queryUserVectors } from '../pinecone.js';

async function handleToolCallMessage(
  toolCallMessage: Hume.empathicVoice.ToolCallMessage,
  socket: Hume.empathicVoice.chat.ChatSocket): Promise<void> {
  if (toolCallMessage.name === "get_longterm_memory") {
    // 1. Parse the parameters from the Tool Call message
    const args = JSON.parse(toolCallMessage.parameters) as {
      userId: string;
      messages: string;
    };
    // 2. Extract the individual arguments
    const { userId, messages } = args;
    // 3. Call fetch weather function with extracted arguments
    const memory = await queryUserVectors(userId, messages);
    // 4. Construct a Tool Response message containing the result
    const toolResponseMessage = {
      type: "tool_response",
      toolCallId: toolCallMessage.toolCallId,
      content: memory.toString(),
    };
    // 5. Send Tool Response message to the WebSocket
    socket.sendToolResponseMessage(toolResponseMessage);
  }
}
