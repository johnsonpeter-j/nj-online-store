import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react"

export default function Profile() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
              <p className="text-muted-foreground">View and manage your profile information</p>
            </div>

            <div className="space-y-6">
              {/* Profile Overview Card */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Profile Overview</CardTitle>
                  <CardDescription>Your basic profile information and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                        <AvatarFallback className="text-lg">AD</AvatarFallback>
                      </Avatar>
                      <Badge variant="secondary" className="text-xs">
                        Administrator
                      </Badge>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">Admin User</h3>
                        <p className="text-muted-foreground">System Administrator</p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">admin@example.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">Joined March 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information Card */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-card-foreground">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        defaultValue="Admin"
                        className="border border-input bg-input text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-card-foreground">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        defaultValue="User"
                        className="border border-input bg-input text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-card-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="admin@example.com"
                        className="border border-input bg-input text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-card-foreground">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="border border-input bg-input text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-card-foreground">
                      Location
                    </Label>
                    <Input
                      id="location"
                      defaultValue="San Francisco, CA"
                      className="border border-input bg-input text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-card-foreground">
                      Bio
                    </Label>
                    <textarea
                      id="bio"
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-input bg-input text-foreground rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      defaultValue="Experienced system administrator with expertise in managing complex IT infrastructures and ensuring optimal system performance."
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                    <Button variant="outline" className="border-input bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Statistics Card */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Account Statistics</CardTitle>
                  <CardDescription>Overview of your account activity and usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">156</div>
                      <div className="text-sm text-muted-foreground">Total Logins</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">23</div>
                      <div className="text-sm text-muted-foreground">Projects Created</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">8.5</div>
                      <div className="text-sm text-muted-foreground">Months Active</div>
                    </div>
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
