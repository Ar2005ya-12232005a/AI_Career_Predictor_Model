'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BrainCircuit, MessageSquare, Target, Zap, Shield, Clock } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: BrainCircuit,
      title: "AI Career Advisor",
      description: "Get personalized career advice powered by advanced AI and Gemini integration",
      href: "/career-model",
      buttonText: "Ask AI Advisor",
      highlight: "Most Popular",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      icon: MessageSquare,
      title: "Interview Prep",
      description: "Generate field-specific interview questions tailored to your career interests",
      href: "/interview-questions",
      buttonText: "Generate Questions",
      highlight: null,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      icon: Target,
      title: "Career Analysis",
      description: "Discover career paths that match your skills and interests using AI prediction",
      href: "/career-prediction",
      buttonText: "Analyze Career Path",
      highlight: "Coming Soon",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      disabled: true
    }
  ]

  const stats = [
    { icon: Zap, label: "AI-Powered", value: "Advanced ML Models" },
    { icon: Shield, label: "Secure", value: "Privacy Protected" },
    { icon: Clock, label: "Fast", value: "Real-time Responses" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <header className="text-center mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Your AI-Powered
            <span className="text-primary block">Career Assistant</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your career journey with personalized AI guidance. Get expert advice, 
            practice interviews, and discover new opportunities tailored specifically for you.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 p-4 bg-muted/30 rounded-lg">
                <stat.icon className="w-5 h-5 text-primary" />
                <div className="text-center">
                  <p className="font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Career Tool</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative ${
                feature.disabled ? 'opacity-60' : ''
              }`}
            >
              {feature.highlight && (
                <Badge 
                  className="absolute -top-3 left-4 z-10" 
                  variant={feature.highlight === "Most Popular" ? "default" : "secondary"}
                >
                  {feature.highlight}
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.bgColor}`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Link href={feature.disabled ? "#" : feature.href} className={feature.disabled ? "pointer-events-none" : ""}>
                  <Button 
                    className="w-full" 
                    variant={feature.highlight === "Most Popular" ? "default" : "outline"}
                    disabled={feature.disabled}
                  >
                    {feature.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="font-semibold mb-2">Share Your Goals</h3>
            <p className="text-muted-foreground">Tell us about your career interests, skills, or questions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            <p className="text-muted-foreground">Our AI analyzes your input and provides personalized insights</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="font-semibold mb-2">Get Guidance</h3>
            <p className="text-muted-foreground">Receive actionable advice and next steps for your career</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-muted/30 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your Career?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who are already using AI to advance their careers
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/career-model">
            <Button size="lg" className="min-w-48">
              Start with AI Advisor
            </Button>
          </Link>
          <Link href="/interview-questions">
            <Button variant="outline" size="lg" className="min-w-48">
              Practice Interviews
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}