import { NextResponse } from 'next/server'
import axios from 'axios'

// Backend API configuration
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// Configure axios with timeout and retry logic
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
})

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  }
)

export async function GET(request, { params }) {
  const path = params.path?.join('/') || ''
  
  try {
    // Handle health check
    if (path === 'health') {
      const response = await apiClient.get('/health')
      return NextResponse.json(response.data)
    }

    return NextResponse.json({
      message: `GET endpoint /${path} - No handler configured`,
      path: path
    })
  } catch (error) {
    console.error(`GET /${path} error:`, error.message)
    return NextResponse.json(
      { 
        error: 'Backend service unavailable',
        message: error.message 
      },
      { status: 503 }
    )
  }
}

export async function POST(request, { params }) {
  const path = params.path?.join('/') || ''
  
  try {
    const body = await request.json()
    
    // Handle different API endpoints
    switch (path) {
      case 'generate-questions':
        return await handleGenerateQuestions(body)
      
      case 'ask-career-model':
        return await handleAskCareerModel(body)
      
      case 'predict-career':
        return await handlePredictCareer(body)
        
      default:
        return NextResponse.json({
          message: `POST endpoint /${path} - No handler configured`,
          path: path,
          body: body
        })
    }
  } catch (error) {
    console.error(`POST /${path} error:`, error.message)
    return NextResponse.json(
      { 
        error: 'Request failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// Handler for career prediction
async function handlePredictCareer(body) {
  try {
    if (!body.text || body.text.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide at least 10 characters describing your interests or background' },
        { status: 400 }
      )
    }

    console.log('Sending career prediction request to backend...')
    const response = await apiClient.post('/predict-career', {
      text: body.text.trim()
    })

    return NextResponse.json({
      success: true,
      ...response.data
    })
  } catch (error) {
    console.error('Career prediction error:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Career prediction service is currently unavailable. Please try again later.' },
        { status: 503 }
      )
    }
    
    if (error.response?.status === 422) {
      return NextResponse.json(
        { error: 'Invalid input. Please check your text and try again.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to get career prediction. Please try again.' },
      { status: 500 }
    )
  }
}

// Handler for asking career questions
async function handleAskCareerModel(body) {
  try {
    if (!body.question || body.question.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a question with at least 10 characters' },
        { status: 400 }
      )
    }

    console.log('Sending question to career model...')
    const response = await apiClient.post('/ask-question', {
      question: body.question.trim(),
      context: body.context || null
    })

    return NextResponse.json({
      success: true,
      ...response.data
    })
  } catch (error) {
    console.error('Ask career model error:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Career advice service is currently unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to get career advice. Please try again.' },
      { status: 500 }
    )
  }
}

// Handler for generating interview questions
async function handleGenerateQuestions(body) {
  try {
    if (!body.field || body.field.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please specify a career field' },
        { status: 400 }
      )
    }

    // You can extend this to call your Python backend for AI-generated questions
    // For now, using intelligent static questions based on the field
    const field = body.field.trim()
    const questions = generateFieldSpecificQuestions(field)

    return NextResponse.json({
      success: true,
      message: `Generated interview questions for ${field}`,
      questions: questions,
      field: field
    })
  } catch (error) {
    console.error('Generate questions error:', error.message)
    return NextResponse.json(
      { error: 'Failed to generate questions. Please try again.' },
      { status: 500 }
    )
  }
}

// Helper function to generate field-specific questions
function generateFieldSpecificQuestions(field) {
  const baseQuestions = [
    `What are the key skills required for a ${field} role?`,
    `Describe a challenging project you've worked on in ${field}.`,
    `How do you stay updated with the latest trends in ${field}?`,
    `What motivates you to work in ${field}?`,
    `How do you handle tight deadlines in ${field} projects?`
  ]

  // Add field-specific questions
  const fieldSpecific = {
    'software engineering': [
      'Explain the difference between REST and GraphQL APIs.',
      'How do you approach debugging complex software issues?',
      'Describe your experience with version control systems like Git.'
    ],
    'data science': [
      'How do you handle missing data in your datasets?',
      'Explain the bias-variance tradeoff in machine learning.',
      'Describe your experience with data visualization tools.'
    ],
    'marketing': [
      'How do you measure the success of a marketing campaign?',
      'Describe your experience with digital marketing channels.',
      'How do you identify and target your ideal customer?'
    ],
    'finance': [
      'Explain how you would perform a financial risk assessment.',
      'Describe your experience with financial modeling.',
      'How do you stay updated with market trends and regulations?'
    ],
    'healthcare': [
      'How do you ensure patient confidentiality and data security?',
      'Describe a time when you had to work under pressure in healthcare.',
      'How do you stay current with medical best practices?'
    ]
  }

  const lowerField = field.toLowerCase()
  const specificQuestions = fieldSpecific[lowerField] || []
  
  return [...baseQuestions, ...specificQuestions]
}

export async function PUT(request, { params }) {
  const path = params.path?.join('/') || ''
  const body = await request.json()
  
  return NextResponse.json({
    message: `PUT endpoint /${path} - No handler configured`,
    path: path,
    body: body
  })
}

export async function DELETE(request, { params }) {
  const path = params.path?.join('/') || ''
  
  return NextResponse.json({
    message: `DELETE endpoint /${path} - No handler configured`,
    path: path
  })
}