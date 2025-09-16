import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingCart, Package, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "2,543",
    description: "+12% from last month",
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "1,234",
    description: "+8% from last month",
    icon: ShoppingCart,
  },
  {
    title: "Total Products",
    value: "456",
    description: "+3% from last month",
    icon: Package,
  },
  {
    title: "Revenue",
    value: "$45,231",
    description: "+15% from last month",
    icon: TrendingUp,
  },
]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Overview of your business metrics and performance</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <Card key={stat.title} className="border border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">New user registered</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">Order #1234 completed</p>
                        <p className="text-xs text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">Product updated</p>
                        <p className="text-xs text-muted-foreground">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <button className="flex items-center justify-start p-3 text-sm font-medium text-card-foreground bg-muted hover:bg-accent rounded-md transition-colors">
                      <Users className="mr-3 h-4 w-4" />
                      Add New User
                    </button>
                    <button className="flex items-center justify-start p-3 text-sm font-medium text-card-foreground bg-muted hover:bg-accent rounded-md transition-colors">
                      <Package className="mr-3 h-4 w-4" />
                      Add New Product
                    </button>
                    <button className="flex items-center justify-start p-3 text-sm font-medium text-card-foreground bg-muted hover:bg-accent rounded-md transition-colors">
                      <ShoppingCart className="mr-3 h-4 w-4" />
                      View Orders
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
