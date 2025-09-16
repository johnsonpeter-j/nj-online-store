
"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronsUpDown, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { MultiSelect, type MultiSelectOption } from "@/components/ui/multi-select"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

const multiselectOptions: MultiSelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "alpine", label: "Alpine.js" },
  { value: "lit", label: "Lit" },
  { value: "stencil", label: "Stencil" },
]

export default function Components() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState("option1")
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: true,
    item3: false,
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Components Showcase</h1>
              <p className="text-muted-foreground">Explore all available UI components and their variations</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Input Components */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Input Fields</CardTitle>
                  <CardDescription>Various input field types with borders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-input" className="text-card-foreground">
                      Text Input
                    </Label>
                    <Input
                      id="text-input"
                      type="text"
                      placeholder="Enter text here"
                      className="border border-input bg-input text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-input" className="text-card-foreground">
                      Email Input
                    </Label>
                    <Input
                      id="email-input"
                      type="email"
                      placeholder="email@example.com"
                      className="border border-input bg-input text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-input" className="text-card-foreground">
                      Password Input
                    </Label>
                    <Input
                      id="password-input"
                      type="password"
                      placeholder="Enter password"
                      className="border border-input bg-input text-foreground"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Autocomplete */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Autocomplete</CardTitle>
                  <CardDescription>Searchable dropdown with bordered styling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label className="text-card-foreground">Framework</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between border border-input bg-input text-foreground"
                        >
                          {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Select framework..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search framework..." />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {frameworks.map((framework) => (
                                <CommandItem
                                  key={framework.value}
                                  value={framework.value}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === framework.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {framework.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
              </Card>

              {/* MultiSelect Autocomplete */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Multi-Select Autocomplete</CardTitle>
                  <CardDescription>Searchable dropdown with multiple selection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label className="text-card-foreground">Technologies</Label>
                    <MultiSelect
                      options={multiselectOptions}
                      selected={selectedFrameworks}
                      onChange={setSelectedFrameworks}
                      placeholder="Select technologies..."
                      maxCount={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Select Dropdown */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Select Dropdown</CardTitle>
                  <CardDescription>Bordered select dropdown component</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label className="text-card-foreground">Category</Label>
                    <Select>
                      <SelectTrigger className="border border-input bg-input text-foreground">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Radio Buttons */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Radio Buttons</CardTitle>
                  <CardDescription>Radio button group for single selection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label className="text-card-foreground">Choose an option</Label>
                    <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="option1" />
                        <Label htmlFor="option1" className="text-card-foreground">
                          Option 1
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="option2" />
                        <Label htmlFor="option2" className="text-card-foreground">
                          Option 2
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option3" id="option3" />
                        <Label htmlFor="option3" className="text-card-foreground">
                          Option 3
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Checkboxes */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Checkboxes</CardTitle>
                  <CardDescription>Checkbox components for multiple selection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="item1"
                        checked={checkedItems.item1}
                        onCheckedChange={(checked) => setCheckedItems({ ...checkedItems, item1: checked as boolean })}
                      />
                      <Label htmlFor="item1" className="text-card-foreground">
                        Item 1
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="item2"
                        checked={checkedItems.item2}
                        onCheckedChange={(checked) => setCheckedItems({ ...checkedItems, item2: checked as boolean })}
                      />
                      <Label htmlFor="item2" className="text-card-foreground">
                        Item 2 (Default checked)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="item3"
                        checked={checkedItems.item3}
                        onCheckedChange={(checked) => setCheckedItems({ ...checkedItems, item3: checked as boolean })}
                      />
                      <Label htmlFor="item3" className="text-card-foreground">
                        Item 3
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modal */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Modal Dialog</CardTitle>
                  <CardDescription>Modal component with open/close functionality</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Open Modal
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-card border border-border">
                      <DialogHeader>
                        <DialogTitle className="text-card-foreground">Modal Title</DialogTitle>
                        <DialogDescription>
                          This is a modal dialog example. You can add any content here.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-card-foreground">
                          This modal demonstrates the dialog component with proper styling and theming.
                        </p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border border-input">
                          Cancel
                        </Button>
                        <Button
                          onClick={() => setIsModalOpen(false)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Buttons */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Buttons</CardTitle>
                  <CardDescription>Various button styles and variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Primary Button
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Secondary Button
                  </Button>
                  <Button variant="outline" className="w-full border border-input bg-transparent">
                    Outline Button
                  </Button>
                  <Button variant="ghost" className="w-full">
                    Ghost Button
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Destructive Button
                  </Button>
                </CardContent>
              </Card>

              {/* Avatar */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Avatar</CardTitle>
                  <CardDescription>User profile image placeholders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/diverse-user-avatars.png" alt="User 1" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/diverse-user-avatars.png" alt="User 2" />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Badges</CardTitle>
                  <CardDescription>Status indicators and labels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      Default
                    </Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline" className="border border-input">
                      Outline
                    </Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Success
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Warning
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      <XCircle className="mr-1 h-3 w-3" />
                      Error
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Popover */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Popover</CardTitle>
                  <CardDescription>Popover component example</CardDescription>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full border border-input bg-transparent">
                        Open Popover
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-popover border border-border">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none text-popover-foreground">Popover Content</h4>
                          <p className="text-sm text-muted-foreground">
                            This is a popover with some example content. You can put any content here.
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="popover-input" className="text-popover-foreground">
                            Input in Popover
                          </Label>
                          <Input
                            id="popover-input"
                            placeholder="Type something..."
                            className="border border-input bg-input text-foreground"
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
