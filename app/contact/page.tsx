"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TrendingUp, MapPin, Phone, Mail, Send, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showAnimation, setShowAnimation] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const { error } = await supabase.from("users").insert([
        {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          message: formData.message,
        },
      ])

      if (error) {
        // Handle duplicate email error specifically
        if (error.code === "23505" && error.message.includes("users_email_key")) {
          // Email already exists, update the existing record instead
          const { error: updateError } = await supabase
            .from("users")
            .update({
              firstname: formData.firstName,
              lastname: formData.lastName,
              phone_number: formData.phone,
              message: formData.message,
              created_date: new Date().toISOString().split("T")[0],
              created_time: new Date().toTimeString().split(" ")[0],
            })
            .eq("email", formData.email)

          if (updateError) {
            throw updateError
          }
        } else {
          throw error
        }
      }

      setSubmitStatus("success")
      setShowAnimation(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      })

      // Hide animation after 3 seconds
      setTimeout(() => {
        setShowAnimation(false)
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-goal-green" />
              <h1 className="text-2xl font-bold text-gray-900">Goal Getters Financial Services</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-goal-green font-medium">
                Home
              </Link>
              <Link href="/loans" className="text-gray-700 hover:text-goal-green font-medium">
                Loan Products
              </Link>
              <Link href="/contact" className="text-goal-green font-medium">
                Contact
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-goal-green font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-goal-green to-goal-green/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl text-green-50 max-w-3xl mx-auto">
              Ready to start your financial journey? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Success Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center success-animation">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg
                className="w-16 h-16 text-goal-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path
                  className="checkmark"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 12 2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 bounce-in">Message Sent Successfully!</h3>
            <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center justify-center">
                  <Send className="mr-3 h-6 w-6 text-goal-green" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="mt-1"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800">
                        Sorry, there was an error sending your message. Please try again or contact us directly at
                        info@goalgetters.co.zw
                      </p>
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-goal-green hover:bg-goal-green/90" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Button
            asChild
            variant="outline"
            className="border-goal-green text-goal-green hover:bg-goal-green hover:text-white"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Information at Bottom */}
      <section className="py-16 bg-goal-green text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-xl text-green-50">Get in touch with our team</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="h-12 w-12 mb-4 text-goal-yellow" />
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-green-50">
                No. 2, East wing, First Floor
                <br />
                6491A Clyde Road Eastlea
                <br />
                Harare, Zimbabwe
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Phone className="h-12 w-12 mb-4 text-goal-yellow" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-green-50">+263713014547</p>
            </div>

            <div className="flex flex-col items-center">
              <Mail className="h-12 w-12 mb-4 text-goal-yellow" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-green-50">info@goalgetters.co.zw</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <TrendingUp className="h-6 w-6 text-goal-green" />
              <span className="text-lg font-semibold">Goal Getters Financial Services</span>
            </div>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Goal Getters Financial Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
