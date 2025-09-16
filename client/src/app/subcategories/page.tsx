"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2, X } from "lucide-react"

interface Subcategory {
  id: number
  name: string
  description: string
  categories: string[]
  status: "Active" | "Inactive"
  createdAt: string
}

const availableCategories = ["Electronics", "Home & Garden", "Sports", "Clothing", "Books"]

const initialSubcategories: Subcategory[] = [
  {
    id: 1,
    name: "Smartphones",
    description: "Mobile phones and accessories",
    categories: ["Electronics"],
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Laptops",
    description: "Portable computers and accessories",
    categories: ["Electronics"],
    status: "Active",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Garden Tools",
    description: "Tools for gardening and landscaping",
    categories: ["Home & Garden"],
    status: "Active",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    name: "Running Shoes",
    description: "Athletic footwear for running",
    categories: ["Sports", "Clothing"],
    status: "Active",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Fiction Books",
    description: "Novels and story books",
    categories: ["Books"],
    status: "Inactive",
    createdAt: "2024-02-15",
  },
]

export default function SubcategoriesPage() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>(initialSubcategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null)
  const [formData, setFormData] = useState({ name: "", description: "", categories: [] as string[] })
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredSubcategories = subcategories.filter(
    (subcategory) =>
      subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subcategory.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSubcategory) {
      setSubcategories(
        subcategories.map((sub) =>
          sub.id === editingSubcategory.id
            ? { ...sub, name: formData.name, description: formData.description, categories: formData.categories }
            : sub,
        ),
      )
    } else {
      const newSubcategory: Subcategory = {
        id: Math.max(...subcategories.map((s) => s.id)) + 1,
        name: formData.name,
        description: formData.description,
        categories: formData.categories,
        status: "Active",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setSubcategories([...subcategories, newSubcategory])
    }
    setIsDialogOpen(false)
    setEditingSubcategory(null)
    setFormData({ name: "", description: "", categories: [] })
  }

  const handleEdit = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory)
    setFormData({
      name: subcategory.name,
      description: subcategory.description,
      categories: subcategory.categories,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setSubcategories(subcategories.filter((sub) => sub.id !== id))
  }

  const openAddDialog = () => {
    setEditingSubcategory(null)
    setFormData({ name: "", description: "", categories: [] })
    setIsDialogOpen(true)
  }

  const addCategory = () => {
    if (selectedCategory && !formData.categories.includes(selectedCategory)) {
      setFormData({ ...formData, categories: [...formData.categories, selectedCategory] })
      setSelectedCategory("")
    }
  }

  const removeCategory = (categoryToRemove: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((cat) => cat !== categoryToRemove),
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Subcategories</h1>
              <p className="text-gray-600 mt-2">Manage your product subcategories</p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Subcategory Management</CardTitle>
                    <CardDescription>Create and manage product subcategories</CardDescription>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={openAddDialog}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Subcategory
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}</DialogTitle>
                        <DialogDescription>
                          {editingSubcategory ? "Update subcategory information" : "Create a new product subcategory"}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Subcategory Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Enter subcategory name"
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              placeholder="Enter subcategory description"
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Categories</Label>
                            <div className="flex gap-2">
                              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="flex-1">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableCategories
                                    .filter((cat) => !formData.categories.includes(cat))
                                    .map((category) => (
                                      <SelectItem key={category} value={category}>
                                        {category}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <Button type="button" onClick={addCategory} disabled={!selectedCategory}>
                                Add
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {formData.categories.map((category) => (
                                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                                  {category}
                                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeCategory(category)} />
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">{editingSubcategory ? "Update Subcategory" : "Add Subcategory"}</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search subcategories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubcategories.map((subcategory) => (
                      <TableRow key={subcategory.id}>
                        <TableCell className="font-medium">{subcategory.name}</TableCell>
                        <TableCell className="text-gray-600">{subcategory.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {subcategory.categories.map((category) => (
                              <Badge key={category} variant="outline" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={subcategory.status === "Active" ? "default" : "secondary"}>
                            {subcategory.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{subcategory.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => console.log("View", subcategory.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(subcategory)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(subcategory.id)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
