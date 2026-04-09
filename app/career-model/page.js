'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BrainCircuit, Loader2, Send, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'

export default function CareerModelPage() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState([])
  const [error, setError] = useState(null)

  const askModel = async () => {
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion) return

    // Input validation
    if (trimmedQuestion.length < 10) {
      setError('Please provide a more detailed question (at least 10 characters)')
      return
    }

    if (trimmedQuestion.length > 1000) {
      setError('Question is too long. Please keep it under 1000 characters.')
      return
    }

    setLoading(true)
    setError(null)
    setQuestion('')

    try {
      const startTime = Date.now()
      
      const response = await fetch('/api/ask-career-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question: trimmedQuestion,
          history: conversationHistory 
        }),
      })

      const processingTime = Date.now() - startTime

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        // Handle specific error cases
        if (response.status === 503) {
          setError('Career analysis service is temporarily unavailable. Please try again in a few minutes.')
        } else if (response.status === 408) {
          setError('Request timed out. Please try asking a shorter question.')
        } else if (response.status === 400) {
          setError(errorData.error || 'There was an issue with your question format. Please try rephrasing it.')
        } else {
          setError('Unable to process your question right now. Please try again.')
        }
        
        // Add failed question to history for context
        setConversationHistory(prev => [...prev, 
          { type: 'question', content: trimmedQuestion, timestamp: new Date().toISOString() },
          { 
            type: 'error', 
            content: errorData.error || 'Failed to get response',
            retryable: errorData.retryable || false,
            timestamp: new Date().toISOString()
          }
        ])
        return
      }

      const data = await response.json()
      
      if (data.error) {
        setError(data.answer || 'An error occurred while processing your question')
        setConversationHistory(prev => [...prev, 
          { type: 'question', content: trimmedQuestion, timestamp: new Date().toISOString() },
          { 
            type: 'error', 
            content: data.answer,
            retryable: data.retryable || false,
            timestamp: new Date().toISOString()
          }
        ])
        return
      }

      const modelAnswer = data.answer || 'I apologize, but I could not generate an answer at this time.'
      
      // Add successful interaction to history
      setConversationHistory(prev => [...prev, 
        { type: 'question', content: trimmedQuestion, timestamp: new Date().toISOString() },
        { 
          type: 'answer', 
          content: modelAnswer,
          prediction: data.prediction,
          confidence: data.confidence,
          processing_time: data.processing_time || processingTime / 1000,
          timestamp: new Date().toISOString()
        }
      ])

    } catch (error) {
      console.error('Error asking model:', error)
      setError('Network error. Please check your connection and try again.')
      
      setConversationHistory(prev => [...prev, 
        { type: 'question', content: trimmedQuestion, timestamp: new Date().toISOString() },
        { 
          type: 'error', 
          content: 'Network error occurred',
          retryable: true,
          timestamp: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const retryLastQuestion = () => {
    const lastQuestion = conversationHistory
      .filter(item => item.type === 'question')
      .pop()

    if (lastQuestion) {
      setQuestion(lastQuestion.content)
      setError(null)
    }
  }

  const clearConversation = () => {
    setConversationHistory([])
    setError(null)
    setQuestion('')
  }

  const formatTime = (seconds) => {
    return seconds ? `${seconds.toFixed(1)}s` : ''
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Career Advisor
          </h1>
          <p className="text-muted-foreground">
            Get personalized career advice from our AI model powered by Gemini
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6">
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                <div className="flex-1">
                  <p className="text-destructive font-medium">Error</p>
                  <p className="text-muted-foreground">{error}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setError(null)}
                    className="mt-2"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Question Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BrainCircuit className="w-5 h-5 mr-2" />
              Ask Your Question
            </CardTitle>
            <CardDescription>
              Ask any career-related question and get AI-powered advice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="question">Your Career Question</Label>
              <Textarea
                id="question"
                placeholder="e.g., What skills should I develop to transition into data science? How can I negotiate a better salary? What are the growth prospects in AI/ML?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    askModel()
                  }
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Min 10 characters</span>
                <span>{question.length}/1000</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={askModel} 
                disabled={!question.trim() || loading || question.trim().length < 10}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Ask Model
                  </>
                )}
              </Button>
              {conversationHistory.length > 0 && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={clearConversation}
                    disabled={loading}
                  >
                    Clear
                  </Button>
                  {conversationHistory.some(item => item.type === 'error' && item.retryable) && (
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={retryLastQuestion}
                      disabled={loading}
                      title="Retry last question"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Answer Display Section */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation History</CardTitle>
            <CardDescription>
              {conversationHistory.length > 0 
                ? `${Math.ceil(conversationHistory.filter(item => item.type === 'question').length)} questions asked`
                : 'AI-powered career advice will appear here'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {conversationHistory.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {conversationHistory.map((item, index) => (
                  <div key={index}>
                    {item.type === 'question' ? (
                      <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                        <p className="text-sm font-medium text-primary mb-1">Your Question</p>
                        <p className="text-foreground">{item.content}</p>
                      </div>
                    ) : item.type === 'answer' ? (
                      <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                            <p className="text-sm font-medium text-secondary-foreground">AI Response</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.confidence && (
                              <Badge variant="secondary" className="text-xs">
                                {(item.confidence * 100).toFixed(1)}% confidence
                              </Badge>
                            )}
                            {item.processing_time && (
                              <Badge variant="outline" className="text-xs">
                                {formatTime(item.processing_time)}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-foreground whitespace-pre-wrap">{item.content}</p>
                        {item.prediction && (
                          <div className="mt-2 p-2 bg-background rounded border">
                            <p className="text-xs text-muted-foreground">Predicted Career Field:</p>
                            <p className="font-medium">{item.prediction.label}</p>
                          </div>
                        )}
                      </div>
                    ) : item.type === 'error' ? (
                      <div className="p-4 bg-destructive/10 rounded-lg border-l-4 border-destructive">
                        <div className="flex items-center mb-2">
                          <AlertCircle className="w-4 h-4 mr-2 text-destructive" />
                          <p className="text-sm font-medium text-destructive">Error</p>
                        </div>
                        <p className="text-foreground">{item.content}</p>
                        {item.retryable && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={retryLastQuestion}
                            className="mt-2"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retry
                          </Button>
                        )}
                      </div>
                    ) : null}
                  </div>
                ))}
                {loading && (
                  <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-secondary">
                    <p className="text-sm font-medium text-secondary-foreground mb-1">AI Response</p>
                    <div className="flex items-center text-muted-foreground">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating personalized career advice...
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <BrainCircuit className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Ask a career-related question to get started</p>
                <p className="text-sm mt-2">Examples: Career transitions, skill development, salary negotiation</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}