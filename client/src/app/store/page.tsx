"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Store, Palette, CreditCard, Truck, Globe, Mail, MapPin, Save, Eye, Edit, Upload } from "lucide-react"

export default function StorePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between space-y-2 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Store Management</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Store
                </Button>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Store className="mr-2 h-5 w-5" />
                        Store Information
                      </CardTitle>
                      <CardDescription>Basic information about your store</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="store-name">Store Name</Label>
                          <Input id="store-name" placeholder="My Awesome Store" defaultValue="TechHub Store" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-url">Store URL</Label>
                          <Input id="store-url" placeholder="mystore.com" defaultValue="techhub.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-description">Store Description</Label>
                        <Textarea
                          id="store-description"
                          placeholder="Describe your store..."
                          defaultValue="Your one-stop destination for the latest technology and gadgets."
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="store-email">Contact Email</Label>
                          <Input
                            id="store-email"
                            type="email"
                            placeholder="contact@store.com"
                            defaultValue="contact@techhub.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-phone">Phone Number</Label>
                          <Input id="store-phone" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 987-6543" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5" />
                        Store Address
                      </CardTitle>
                      <CardDescription>Physical location of your store</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" placeholder="123 Main Street" defaultValue="456 Tech Avenue" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" defaultValue="San Francisco" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="NY" defaultValue="CA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" placeholder="10001" defaultValue="94105" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Store Status</CardTitle>
                      <CardDescription>Control your store's availability</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Store Online</Label>
                          <div className="text-sm text-muted-foreground">Make your store visible to customers</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Maintenance Mode</Label>
                          <div className="text-sm text-muted-foreground">Temporarily disable store access</div>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="mr-2 h-5 w-5" />
                      Theme & Branding
                    </CardTitle>
                    <CardDescription>Customize your store's appearance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Store Logo</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Store className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-blue-600 rounded border"></div>
                          <Input defaultValue="#3B82F6" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Secondary Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-gray-600 rounded border"></div>
                          <Input defaultValue="#6B7280" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select defaultValue="modern">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Methods
                    </CardTitle>
                    <CardDescription>Configure how customers can pay</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Credit/Debit Cards", description: "Visa, Mastercard, American Express", enabled: true },
                      { name: "PayPal", description: "PayPal payments and PayPal Credit", enabled: true },
                      { name: "Apple Pay", description: "Quick payments with Touch ID", enabled: false },
                      { name: "Google Pay", description: "Fast checkout with Google", enabled: false },
                      { name: "Bank Transfer", description: "Direct bank transfers", enabled: true },
                    ].map((method, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">{method.description}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={method.enabled ? "default" : "secondary"}>
                            {method.enabled ? "Enabled" : "Disabled"}
                          </Badge>
                          <Switch defaultChecked={method.enabled} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="mr-2 h-5 w-5" />
                      Shipping Options
                    </CardTitle>
                    <CardDescription>Configure shipping methods and rates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Standard Shipping", time: "5-7 business days", price: "$5.99", enabled: true },
                      { name: "Express Shipping", time: "2-3 business days", price: "$12.99", enabled: true },
                      { name: "Overnight Shipping", time: "1 business day", price: "$24.99", enabled: false },
                      {
                        name: "Free Shipping",
                        time: "7-10 business days",
                        price: "Free (orders over $50)",
                        enabled: true,
                      },
                    ].map((option, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{option.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {option.time} • {option.price}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked={option.enabled} />
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="mr-2 h-5 w-5" />
                      Email Notifications
                    </CardTitle>
                    <CardDescription>Configure automated email notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Order Confirmation", description: "Send when order is placed", enabled: true },
                      { name: "Order Shipped", description: "Send when order is shipped", enabled: true },
                      { name: "Order Delivered", description: "Send when order is delivered", enabled: false },
                      { name: "Low Stock Alert", description: "Send when inventory is low", enabled: true },
                      { name: "New Customer Welcome", description: "Send to new customers", enabled: true },
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{notification.name}</div>
                          <div className="text-sm text-muted-foreground">{notification.description}</div>
                        </div>
                        <Switch defaultChecked={notification.enabled} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="mr-2 h-5 w-5" />
                      SEO Settings
                    </CardTitle>
                    <CardDescription>Optimize your store for search engines</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meta-title">Meta Title</Label>
                      <Input
                        id="meta-title"
                        placeholder="Your Store - Best Products Online"
                        defaultValue="TechHub - Latest Technology & Gadgets"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta-description">Meta Description</Label>
                      <Textarea
                        id="meta-description"
                        placeholder="Describe your store for search engines..."
                        defaultValue="Discover the latest technology and gadgets at TechHub. Fast shipping, great prices, and excellent customer service."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input
                        id="keywords"
                        placeholder="technology, gadgets, electronics"
                        defaultValue="technology, gadgets, electronics, smartphones, laptops"
                      />
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
