"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { value: "profile", label: "Profile" },
    { value: "security", label: "Security" },
    { value: "notifications", label: "Notifications" },
    { value: "appearance", label: "Appearance" },
    { value: "billing", label: "Billing" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account and application preferences</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="block sm:hidden">
                <Select value={activeTab} onValueChange={setActiveTab}>
                  <SelectTrigger className="w-full">
                    <SelectValue>{tabs.find((tab) => tab.value === activeTab)?.label}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {tabs.map((tab) => (
                      <SelectItem key={tab.value} value={tab.value}>
                        {tab.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden sm:block">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
                  <TabsTrigger value="profile" className="text-xs sm:text-sm">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="security" className="text-xs sm:text-sm">
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="text-xs sm:text-sm">
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="text-xs sm:text-sm">
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="text-xs sm:text-sm">
                    Billing
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="hidden sm:block md:hidden">
                <div className="overflow-x-auto">
                  <TabsList className="inline-flex w-max space-x-1">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="profile" className="space-y-6">
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Profile Information</CardTitle>
                    <CardDescription>Update your personal information and contact details</CardDescription>
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
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-card-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="admin@example.com"
                        className="border border-input bg-input text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-card-foreground">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        className="border border-input bg-input text-foreground"
                      />
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Password</CardTitle>
                    <CardDescription>Change your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-card-foreground">
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        className="border border-input bg-input text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-card-foreground">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="border border-input bg-input text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-card-foreground">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="border border-input bg-input text-foreground"
                      />
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update Password</Button>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-card-foreground">Enable 2FA</Label>
                        <p className="text-sm text-muted-foreground">Use an authenticator app to secure your account</p>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline">Setup Authenticator</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Email Notifications</CardTitle>
                    <CardDescription>Choose what email notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-card-foreground">Account Updates</Label>
                        <p className="text-sm text-muted-foreground">Important updates about your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-card-foreground">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">Notifications about security events</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-card-foreground">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Push Notifications</CardTitle>
                    <CardDescription>Manage your browser and mobile notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-card-foreground">Browser Notifications</Label>
                        <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-card-foreground">Mobile Push</Label>
                        <p className="text-sm text-muted-foreground">Send notifications to your mobile device</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Theme</CardTitle>
                    <CardDescription>Customize the appearance of your dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-card-foreground">Theme Mode</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-card-foreground">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-card-foreground">Compact Mode</Label>
                        <p className="text-sm text-muted-foreground">Use a more compact layout</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Current Plan</CardTitle>
                    <CardDescription>Manage your subscription and billing information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-card-foreground">Pro Plan</h3>
                        <p className="text-sm text-muted-foreground">$29/month • Billed monthly</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="outline">Cancel Subscription</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Payment Method</CardTitle>
                    <CardDescription>Update your payment information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-card-foreground">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Billing History</CardTitle>
                    <CardDescription>View your past invoices and payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-card-foreground">Invoice #001</p>
                          <p className="text-sm text-muted-foreground">December 1, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-card-foreground">$29.00</p>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-card-foreground">Invoice #002</p>
                          <p className="text-sm text-muted-foreground">November 1, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-card-foreground">$29.00</p>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
