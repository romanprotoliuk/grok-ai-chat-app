import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { APIResponse } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' } as APIResponse, 
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful assistant.' 
        },
        { role: 'user', content: prompt }
      ],
    });

    return NextResponse.json({
      message: completion.choices[0].message
    } as APIResponse);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' } as APIResponse, 
      { status: 500 }
    );
  }
}
