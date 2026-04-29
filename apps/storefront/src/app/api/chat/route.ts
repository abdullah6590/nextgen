import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // We default to llama3, assuming local ollama instance running on port 11434
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        })),
        stream: true
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama Error:', errorText);
      return NextResponse.json({ error: 'Failed to communicate with Ollama' }, { status: 500 });
    }

    // Transform the JSON-line stream from Ollama into a plain text stream 
    // of just the message content chunks for the frontend to easily decode.
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split('\n').filter(Boolean);
        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.message?.content) {
              controller.enqueue(new TextEncoder().encode(json.message.content));
            }
          } catch (e) {
            console.error('Error parsing stream chunk', e);
          }
        }
      }
    });

    return new Response(response.body?.pipeThrough(transformStream), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
