import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function POST(request) {
  try {
    const { question, history } = await request.json();

    // Enhanced input validation
    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const trimmedQuestion = question.trim();
    
    // Check question length
    if (trimmedQuestion.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a more detailed question (at least 10 characters)' },
        { status: 400 }
      );
    }

    if (trimmedQuestion.length > 1000) {
      return NextResponse.json(
        { error: 'Question is too long. Please keep it under 1000 characters.' },
        { status: 400 }
      );
    }

    console.log(`Processing career question: ${trimmedQuestion.substring(0, 50)}...`);

    // Prepare context from history (improved formatting)
    let context = null;
    if (history && Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-3); // Last 3 interactions
      context = recentHistory
        .map(h => `${h.type === 'user' ? 'User' : 'Assistant'}: ${h.content}`)
        .join('\n');
    }

    // Call your orchestrator backend with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const backendResponse = await fetch(`${BACKEND_URL}/ask-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: trimmedQuestion,
          context: context
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!backendResponse.ok) {
        const errorData = await backendResponse.json().catch(() => ({}));
        console.error('Backend error:', {
          status: backendResponse.status,
          statusText: backendResponse.statusText,
          error: errorData
        });

        // Handle specific error codes
        if (backendResponse.status === 503) {
          return NextResponse.json(
            {
              answer: "The career analysis service is temporarily unavailable. Please try again in a few minutes.",
              error: true,
              retryable: true
            },
            { status: 503 }
          );
        }

        if (backendResponse.status === 422) {
          return NextResponse.json(
            {
              answer: "There was an issue with your question format. Please try rephrasing it.",
              error: true
            },
            { status: 400 }
          );
        }

        return NextResponse.json(
          {
            answer: "I'm having trouble connecting to the career analysis service. Please try again in a moment.",
            error: true,
            retryable: true
          },
          { status: 500 }
        );
      }

      const data = await backendResponse.json();
      
      // Validate response data
      if (!data.polished_response && !data.answer) {
        console.warn('Backend returned empty response:', data);
        return NextResponse.json(
          {
            answer: "I received an empty response from the career service. Please try asking your question again.",
            error: true
          },
          { status: 500 }
        );
      }

      // Return successful response
      const response = {
        answer: data.polished_response || data.answer || 'Unable to generate response',
        prediction: data.prediction || null,
        confidence: data.prediction?.confidence || null,
        original_input: data.original_input || trimmedQuestion,
        processing_time: data.processing_time || null,
        success: true
      };

      console.log(`Career question processed successfully in ${data.processing_time || 'unknown'}s`);
      return NextResponse.json(response);

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('Request timeout');
        return NextResponse.json(
          {
            answer: "The request took too long to process. Please try asking a shorter question or try again later.",
            error: true,
            timeout: true
          },
          { status: 408 }
        );
      }
      
      throw fetchError; // Re-throw to be handled by outer catch
    }

  } catch (error) {
    console.error('API Route Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    // Handle different types of errors
    if (error.name === 'SyntaxError') {
      return NextResponse.json(
        {
          answer: "There was an issue processing your request format. Please try again.",
          error: true
        },
        { status: 400 }
      );
    }

    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        {
          answer: "The career analysis service is currently offline. Please try again later.",
          error: true,
          retryable: true
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        answer: "There was an unexpected error processing your question. Please check your connection and try again.",
        error: true,
        retryable: true
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}