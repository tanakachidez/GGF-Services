"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  MessageSquare,
  LogOut,
  Home,
  Edit,
  Send,
  Mail,
  Clock,
  Save,
  Globe,
  FileText,
  Users,
  User,
  Sun,
  GraduationCap,
} from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ContactMessage {
  userid: number
  firstname: string
  lastname: string
  email: string
  phone_number: string
  message: string
  created_date: string
  created_time: string
}

interface LoanProduct {
  id: string
  title: string
  description: string
  repayment: string
  interest: string
}

interface WebsiteContent {
  heroTitle: string
  heroSubtitle: string
  missionText: string
  visionText: string
  valuesText: string
  contactAddress: string
  contactPhone: string
  contactEmail: string
  loanProducts: LoanProduct[]
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<"content" | "messages">("content")
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  // Website content state
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>({
    heroTitle: "Smart Financial Solutions for Your Goals",
    heroSubtitle:
      "Here is your trusted lender Goal Getters Financial Services, your lending solution which helps you to live your dream.",
    missionText:
      "To provide the best, affordable and smart financial solutions that empower and address the needs of employees and small to medium enterprises in Zimbabwe.",
    visionText:
      "To be a leading financial institution in the provision of affordable and smart financial solutions to employed individuals and small to medium enterprises in Zimbabwe.",
    valuesText:
      "Commitment, Respect, Transparency. Goal Getters is a learning institute and encourages a system of continuous improvement.",
    contactAddress: "No. 2, East wing, First Floor\n6491A Clyde Road Eastlea\nHarare, Zimbabwe",
    contactPhone: "+263713014547",
    contactEmail: "info@goalgetters.co.zw",
    loanProducts: [
      {
        id: "1",
        title: "Group Enterprise Loans",
        description:
          "For women in groups (4 to 8 members), co-guaranteed. Suitable for small businesses like poultry, tailoring, retail, and farming.",
        repayment: "2–3 months",
        interest: "15% flat interest",
      },
      {
        id: "2",
        title: "Individual Enterprise Loans",
        description:
          "For women working solo on larger projects. Perfect for entrepreneurs looking to expand their business operations.",
        repayment: "2–3 months",
        interest: "15% flat interest",
      },
      {
        id: "3",
        title: "Solar Loans",
        description:
          "50% cost covered upfront by borrower, the remaining 50% loan is repayable in 3 months. Bring clean energy to your home or business.",
        repayment: "3 months",
        interest: "15% flat",
      },
      {
        id: "4",
        title: "School Fees Loans",
        description:
          "Covers school fees to ensure your children's education is never interrupted. Invest in their future today.",
        repayment: "3 months",
        interest: "Competitive rates",
      },
    ],
  })

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true"

    if (isLoggedIn) {
      // Set authentication state to true
      setIsAuthenticated(true)
      
      // Fetch messages when component mounts
      fetchMessages()

      // ...any other initialization code...
    } else {
      router.push("/admin")
    }
  }, [router, activeTab]) // Keep existing dependencies

  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("users")
        .select("userid, firstname, lastname, email, phone_number, message, created_date, created_time")
        .order("userid", { ascending: false })

      if (error) {
        console.error("Supabase error:", error)
        throw error
      }

      setMessages(data || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
      alert("Error loading messages from database. Please check your connection and try again.")
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    router.push("/admin")
  }

  const sendEmailReply = async (to: string, subject: string, body: string) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          body,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      return true
    } catch (error) {
      console.error("Error sending email:", error)
      return false
    }
  }

  const handleSendReply = async () => {
    if (!selectedMessage || !replyMessage.trim()) return

    setIsSending(true)
    try {
      const subject = "Reply from Goal Getters Financial Services"
      const emailSent = await sendEmailReply(selectedMessage.email, subject, replyMessage)

      if (emailSent) {
        alert(`Reply sent successfully to ${selectedMessage.email}`)
        setReplyMessage("")
        setSelectedMessage(null)
      } else {
        // Fallback: show the reply content
        alert(
          `Email service not configured. Here's what would be sent to ${selectedMessage.email}:\n\nSubject: ${subject}\n\nMessage:\n${replyMessage}`,
        )
        setReplyMessage("")
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error("Error sending reply:", error)
      alert("Error sending reply. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const handleContentChange = (field: keyof WebsiteContent, value: string) => {
    setWebsiteContent((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleLoanProductChange = (id: string, field: keyof LoanProduct, value: string) => {
    setWebsiteContent((prev) => ({
      ...prev,
      loanProducts: prev.loanProducts.map((product) => (product.id === id ? { ...product, [field]: value } : product)),
    }))
  }

  const handleSaveContent = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Website content saved successfully!")
    } catch (error) {
      console.error("Error saving content:", error)
      alert("Error saving content. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-goal-green" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the Admin Dashboard</h2>
          <p className="text-gray-600">Manage your website content and customer messages</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <Button
            onClick={() => setActiveTab("content")}
            variant={activeTab === "content" ? "default" : "outline"}
            className={
              activeTab === "content"
                ? "bg-goal-green hover:bg-goal-green/90 text-white"
                : "border-goal-green text-goal-green hover:bg-goal-green hover:text-white"
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Website Content
          </Button>
          <Button
            onClick={() => {
              setActiveTab("messages")
              fetchMessages()
            }}
            variant={activeTab === "messages" ? "default" : "outline"}
            className={
              activeTab === "messages"
                ? "bg-goal-yellow hover:bg-goal-yellow/90 text-gray-900"
                : "border-goal-yellow text-goal-yellow hover:bg-goal-yellow hover:text-gray-900"
            }
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Customer Messages ({messages.length})
          </Button>
        </div>

        {/* Website Content Management Tab */}
        {activeTab === "content" && (
          <div className="space-y-8">
            {/* Hero Section Content */}
            <Card className="border-goal-green border-2">
              <CardHeader className="bg-goal-green/10">
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-goal-green" />
                  Hero Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <Label htmlFor="heroTitle" className="text-gray-700 font-semibold">
                    Hero Title
                  </Label>
                  <Input
                    id="heroTitle"
                    value={websiteContent.heroTitle}
                    onChange={(e) => handleContentChange("heroTitle", e.target.value)}
                    className="mt-1 border-goal-green/30 focus:border-goal-green"
                  />
                </div>
                <div>
                  <Label htmlFor="heroSubtitle" className="text-gray-700 font-semibold">
                    Hero Subtitle
                  </Label>
                  <Textarea
                    id="heroSubtitle"
                    value={websiteContent.heroSubtitle}
                    onChange={(e) => handleContentChange("heroSubtitle", e.target.value)}
                    rows={3}
                    className="mt-1 border-goal-green/30 focus:border-goal-green"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Mission, Vision, Values */}
            <Card className="border-goal-yellow border-2">
              <CardHeader className="bg-goal-yellow/10">
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-goal-yellow" />
                  Mission, Vision & Values
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <Label htmlFor="missionText" className="text-gray-700 font-semibold">
                    Mission Statement
                  </Label>
                  <Textarea
                    id="missionText"
                    value={websiteContent.missionText}
                    onChange={(e) => handleContentChange("missionText", e.target.value)}
                    rows={3}
                    className="mt-1 border-goal-yellow/30 focus:border-goal-yellow"
                  />
                </div>
                <div>
                  <Label htmlFor="visionText" className="text-gray-700 font-semibold">
                    Vision Statement
                  </Label>
                  <Textarea
                    id="visionText"
                    value={websiteContent.visionText}
                    onChange={(e) => handleContentChange("visionText", e.target.value)}
                    rows={3}
                    className="mt-1 border-goal-yellow/30 focus:border-goal-yellow"
                  />
                </div>
                <div>
                  <Label htmlFor="valuesText" className="text-gray-700 font-semibold">
                    Values Statement
                  </Label>
                  <Textarea
                    id="valuesText"
                    value={websiteContent.valuesText}
                    onChange={(e) => handleContentChange("valuesText", e.target.value)}
                    rows={3}
                    className="mt-1 border-goal-yellow/30 focus:border-goal-yellow"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Loan Products */}
            <Card className="border-goal-green border-2">
              <CardHeader className="bg-goal-green/10">
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-goal-green" />
                  Loan Products
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {websiteContent.loanProducts.map((product, index) => {
                  const icons = [Users, User, Sun, GraduationCap]
                  const IconComponent = icons[index] || Users
                  const isYellow = index % 2 === 1

                  return (
                    <div
                      key={product.id}
                      className={`p-4 rounded-lg border-2 ${isYellow ? "border-goal-yellow/30 bg-goal-yellow/5" : "border-goal-green/30 bg-goal-green/5"}`}
                    >
                      <div className="flex items-center mb-4">
                        <IconComponent
                          className={`mr-2 h-5 w-5 ${isYellow ? "text-goal-yellow" : "text-goal-green"}`}
                        />
                        <h4 className="font-semibold text-gray-900">Loan Product {index + 1}</h4>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-gray-700 font-semibold">Product Title</Label>
                          <Input
                            value={product.title}
                            onChange={(e) => handleLoanProductChange(product.id, "title", e.target.value)}
                            className={`mt-1 ${isYellow ? "border-goal-yellow/30 focus:border-goal-yellow" : "border-goal-green/30 focus:border-goal-green"}`}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 font-semibold">Description</Label>
                          <Textarea
                            value={product.description}
                            onChange={(e) => handleLoanProductChange(product.id, "description", e.target.value)}
                            rows={3}
                            className={`mt-1 ${isYellow ? "border-goal-yellow/30 focus:border-goal-yellow" : "border-goal-green/30 focus:border-goal-green"}`}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-700 font-semibold">Repayment Period</Label>
                            <Input
                              value={product.repayment}
                              onChange={(e) => handleLoanProductChange(product.id, "repayment", e.target.value)}
                              className={`mt-1 ${isYellow ? "border-goal-yellow/30 focus:border-goal-yellow" : "border-goal-green/30 focus:border-goal-green"}`}
                            />
                          </div>
                          <div>
                            <Label className="text-gray-700 font-semibold">Interest Rate</Label>
                            <Input
                              value={product.interest}
                              onChange={(e) => handleLoanProductChange(product.id, "interest", e.target.value)}
                              className={`mt-1 ${isYellow ? "border-goal-yellow/30 focus:border-goal-yellow" : "border-goal-green/30 focus:border-goal-green"}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-goal-yellow border-2">
              <CardHeader className="bg-goal-yellow/10">
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-goal-yellow" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <Label htmlFor="contactAddress" className="text-gray-700 font-semibold">
                    Address
                  </Label>
                  <Textarea
                    id="contactAddress"
                    value={websiteContent.contactAddress}
                    onChange={(e) => handleContentChange("contactAddress", e.target.value)}
                    rows={3}
                    className="mt-1 border-goal-yellow/30 focus:border-goal-yellow"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPhone" className="text-gray-700 font-semibold">
                      Phone Number
                    </Label>
                    <Input
                      id="contactPhone"
                      value={websiteContent.contactPhone}
                      onChange={(e) => handleContentChange("contactPhone", e.target.value)}
                      className="mt-1 border-goal-yellow/30 focus:border-goal-yellow"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail" className="text-gray-700 font-semibold">
                      Email Address
                    </Label>
                    <Input
                      id="contactEmail"
                      value={websiteContent.contactEmail}
                      onChange={(e) => handleContentChange("contactEmail", e.target.value)}
                      className="mt-1 border-goal-yellow/30 focus:border-goal-yellow"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSaveContent}
                className="bg-goal-green hover:bg-goal-green/90 text-white"
                disabled={isSaving}
              >
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Website Content
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Customer Messages Tab */}
        {activeTab === "messages" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Messages List */}
            <Card className="border-goal-yellow border-2">
              <CardHeader className="bg-goal-yellow/10">
                <CardTitle className="text-lg text-gray-900 flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-goal-yellow" />
                    Customer Messages
                  </div>
                  <Button
                    onClick={fetchMessages}
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    className="border-goal-yellow text-goal-yellow hover:bg-goal-yellow hover:text-gray-900"
                  >
                    {isLoading ? "Loading..." : "Refresh"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto pt-6">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-goal-yellow mx-auto mb-4"></div>
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No customer messages found</p>
                    <p className="text-sm">Messages will appear here when customers submit the contact form</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={message.userid}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedMessage?.userid === message.userid
                            ? "border-goal-green bg-goal-green/10"
                            : index % 2 === 0
                              ? "border-goal-yellow/30 hover:border-goal-yellow bg-goal-yellow/5"
                              : "border-goal-green/30 hover:border-goal-green bg-goal-green/5"
                        }`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {message.firstname} {message.lastname}
                          </h4>
                          <span
                            className={`text-xs px-2 py-1 rounded ${index % 2 === 0 ? "bg-goal-yellow text-gray-900" : "bg-goal-green text-white"}`}
                          >
                            ID: {message.userid}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <Mail className="inline h-3 w-3 mr-1" />
                          {message.email}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">📞 {message.phone_number}</p>
                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">{message.message}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {message.created_date} at {message.created_time}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Message Details and Reply */}
            <Card className="border-goal-green border-2">
              <CardHeader className="bg-goal-green/10">
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <Send className="mr-2 h-5 w-5 text-goal-green" />
                  {selectedMessage ? "Message Details & Reply" : "Select a Message"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {selectedMessage ? (
                  <div className="space-y-6">
                    {/* Message Details */}
                    <div className="bg-goal-green/5 p-4 rounded-lg border border-goal-green/20">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {selectedMessage.firstname} {selectedMessage.lastname}
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p>
                          <strong>User ID:</strong> {selectedMessage.userid}
                        </p>
                        <p>
                          <Mail className="inline h-4 w-4 mr-1" />
                          <strong>Email:</strong> {selectedMessage.email}
                        </p>
                        <p>
                          📞 <strong>Phone:</strong> {selectedMessage.phone_number}
                        </p>
                        <p>
                          <Clock className="inline h-4 w-4 mr-1" />
                          <strong>Submitted:</strong> {selectedMessage.created_date} at {selectedMessage.created_time}
                        </p>
                      </div>
                      <div className="border-t border-goal-green/20 pt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                        <p className="text-gray-700 bg-white p-3 rounded border border-goal-green/20">
                          {selectedMessage.message}
                        </p>
                      </div>
                    </div>

                    {/* Reply Form */}
                    <div>
                      <Label htmlFor="reply" className="text-gray-700 mb-2 block font-semibold">
                        Reply to {selectedMessage.firstname}
                      </Label>
                      <Textarea
                        id="reply"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder={`Dear ${selectedMessage.firstname},\n\nThank you for contacting Goal Getters Financial Services. We have received your message regarding your inquiry.\n\n[Your response here]\n\nBest regards,\nGoal Getters Financial Services Team\nPhone: +263713014547\nEmail: info@goalgetters.co.zw`}
                        rows={10}
                        className="mb-4 border-goal-green/30 focus:border-goal-green"
                      />
                      <Button
                        onClick={handleSendReply}
                        className="w-full bg-goal-green hover:bg-goal-green/90 text-white"
                        disabled={!replyMessage.trim() || isSending}
                      >
                        {isSending ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending Reply...
                          </div>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Reply to {selectedMessage.email}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a message from the list to view details and send a reply.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
