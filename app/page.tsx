import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Shield, Users, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/contact" className="text-gray-700 hover:text-goal-green font-medium">
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
      <section className="bg-gradient-to-r from-goal-green to-goal-green/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Smart Financial Solutions for Your Goals</h2>
              <p className="text-xl mb-8 text-green-50">
                Here is your trusted lender Goal Getters Financial Services, your lending solution which helps you to
                live your dream.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-goal-yellow text-gray-900 hover:bg-goal-yellow/90">
                  <Link href="/loans">Explore Loan Products</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white border-2 text-white bg-transparent hover:bg-white hover:text-goal-green font-semibold"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/images/company-logo.jpg"
                alt="Goal Getters Financial Services Logo"
                width={400}
                height={400}
                className="rounded-full shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values - Vertical Layout */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Goal Getters Financial</h2>
            <p className="text-xl text-gray-600">Our foundation built on strong principles</p>
          </div>

          <div className="space-y-16">
            {/* Mission */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-6">
                  <Shield className="h-10 w-10 text-goal-green mr-4" />
                  <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-l-goal-green">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    To provide the best, affordable and smart financial solutions that empower and address the needs of
                    employees and small to medium enterprises in Zimbabwe.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <Image
                    src="/images/mission-image.jpg"
                    alt="Our Mission - Supporting Agricultural Communities"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-xl w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-goal-green/20 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-1">
                <div className="relative">
                  <Image
                    src="/images/vision-image.jpg"
                    alt="Our Vision - Empowering Small Business Owners"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-xl w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-goal-yellow/20 rounded-lg"></div>
                </div>
              </div>
              <div className="order-2">
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-10 w-10 text-goal-yellow mr-4" />
                  <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-l-goal-yellow">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    To be a leading financial institution in the provision of affordable and smart financial solutions
                    to employed individuals and small to medium enterprises in Zimbabwe.
                  </p>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-6">
                  <Users className="h-10 w-10 text-goal-green mr-4" />
                  <h3 className="text-3xl font-bold text-gray-900">Our Values</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-l-goal-green">
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    <strong className="text-goal-green">Commitment, Respect, Transparency.</strong>
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Goal Getters is a learning institute and encourages a system of continuous improvement.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <Image
                    src="/images/values-image.jpg"
                    alt="Our Values - Professional Collaboration"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-xl w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-goal-green/20 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Protection Principles - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Client Protection Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unwavering commitment to responsible financial services and client welfare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[
              { text: "Appropriate product design and delivery", color: "green" },
              { text: "Prevention of over-indebtedness", color: "yellow" },
              { text: "Transparency", color: "green" },
              { text: "Responsible Pricing", color: "yellow" },
              { text: "Fair and Respectful treatment of clients", color: "green" },
              { text: "Privacy of client data", color: "yellow" },
              { text: "Mechanism of complaint resolution", color: "green" },
            ].map((principle, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                  principle.color === "green"
                    ? "border-goal-green hover:border-goal-green/70 bg-gradient-to-br from-goal-green/5 to-goal-green/10"
                    : "border-goal-yellow hover:border-goal-yellow/70 bg-gradient-to-br from-goal-yellow/5 to-goal-yellow/10"
                }`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <div
                      className={`w-4 h-4 rounded-full mt-2 mr-4 flex-shrink-0 ${
                        principle.color === "green" ? "bg-goal-green" : "bg-goal-yellow"
                      }`}
                    ></div>
                    <p className="text-gray-800 font-semibold text-lg leading-relaxed">{principle.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Find Us Section */}
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
