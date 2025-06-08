import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, User, Sun, GraduationCap, ArrowLeft } from "lucide-react"

export default function LoansPage() {
  const loanProducts = [
    {
      title: "Group Enterprise Loans",
      icon: Users,
      description:
        "For women in groups (4 to 8 members), co-guaranteed. Suitable for small businesses like poultry, tailoring, retail, and farming.",
      repayment: "2–3 months",
      interest: "15% flat interest",
      color: "bg-goal-green",
      image: "/images/group-enterprise-loan.jpg",
    },
    {
      title: "Individual Enterprise Loans",
      icon: User,
      description:
        "For women working solo on larger projects. Perfect for entrepreneurs looking to expand their business operations.",
      repayment: "2–3 months",
      interest: "15% flat interest",
      color: "bg-goal-yellow text-gray-900",
      image: "/images/individual-enterprise-loan.jpg",
    },
    {
      title: "Solar Loans",
      icon: Sun,
      description:
        "50% cost covered upfront by borrower, the remaining 50% loan is repayable in 3 months. Bring clean energy to your home or business.",
      repayment: "3 months",
      interest: "15% flat",
      color: "bg-goal-green",
      image: "/images/solar-loan.jpg",
    },
    {
      title: "School Fees Loans",
      icon: GraduationCap,
      description:
        "Covers school fees to ensure your children's education is never interrupted. Invest in their future today.",
      repayment: "3 months",
      interest: "Competitive rates",
      color: "bg-goal-yellow text-gray-900",
      image: "/images/school-loan.jpg",
    },
  ]

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
              <Link href="/loans" className="text-goal-green font-medium">
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
      <section className="bg-gradient-to-r from-goal-green to-goal-green/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Loan Products</h2>
            <p className="text-xl text-green-50 max-w-3xl mx-auto">
              Flexible financing solutions designed to meet your unique needs and help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Loan Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {loanProducts.map((product, index) => {
              const IconComponent = product.icon
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.title} Image`}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-4 left-4 p-3 rounded-full ${product.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">{product.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-goal-green text-goal-green">
                        Repayment: {product.repayment}
                      </Badge>
                      <Badge variant="outline" className="border-goal-yellow text-goal-yellow">
                        {product.interest}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Apply?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards achieving your financial goals. Our team is here to guide you through the
            application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-goal-green hover:bg-goal-green/90">
              <Link href="/contact">Apply Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-goal-green text-goal-green hover:bg-goal-green hover:text-white"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
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
