"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, MoreHorizontal, Edit, Trash2, X } from "lucide-react"

interface Size {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  attributes: { key: string; value: string }[]
}

const mockSizes: Size[] = [
  {
    id: "1",
    name: "Small",
    description: "Small size for clothing items",
    category: "Clothing",
    tags: ["apparel", "basic"],
    attributes: [
      { key: "chest", value: "36 inches" },
      { key: "waist", value: "30 inches" },
    ],
  },
  {
    id: "2",
    name: "Medium",
    description: "Medium size for clothing items",
    category: "Clothing",
    tags: ["apparel", "basic"],
    attributes: [
      { key: "chest", value: "40 inches" },
      { key: "waist", value: "34 inches" },
    ],
  },
  {
    id: "3",
    name: "Large",
    description: "Large size for clothing items",
    category: "Clothing",
    tags: ["apparel", "basic"],
    attributes: [
      { key: "chest", value: "44 inches" },
      { key: "waist", value: "38 inches" },
    ],
  },
]

const categories = ["Clothing", "Shoes", "Accessories", "Electronics"]
const availableTags = ["apparel", "basic", "premium", "casual", "formal", "sport"]

export default function SizesPage() {
  const [sizes, setSizes] = useState<Size[]>(mockSizes)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSize, setEditingSize] = useState<Size | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: [] as string[],
    attributes: [{ key: "", value: "" }],
  })

  const filteredSizes = sizes.filter(
    (size) =>
      size.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      size.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      size.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingSize) {
      setSizes(sizes.map((size) => (size.id === editingSize.id ? { ...editingSize, ...formData } : size)))
    } else {
      const newSize: Size = {
        id: Date.now().toString(),
        ...formData,
      }
      setSizes([...sizes, newSize])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      tags: [],
      attributes: [{ key: "", value: "" }],
    })
    setEditingSize(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (size: Size) => {
    setEditingSize(size)
    setFormData({
      name: size.name,
      description: size.description,
      category: size.category,
      tags: size.tags,
      attributes: size.attributes.length > 0 ? size.attributes : [{ key: "", value: "" }],
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setSizes(sizes.filter((size) => size.id !== id))
  }

  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { key: "", value: "" }],
    })
  }

  const removeAttribute = (index: number) => {
    setFormData({
      ...formData,
      attributes: formData.attributes.filter((_, i) => i !== index),
    })
  }

  const updateAttribute = (index: number, field: "key" | "value", value: string) => {
    const newAttributes = [...formData.attributes]
    newAttributes[index][field] = value
    setFormData({ ...formData, attributes: newAttributes })
  }

  const toggleTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag) ? formData.tags.filter((t) => t !== tag) : [...formData.tags, tag],
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Sizes</h1>
                <p className="text-muted-foreground">Manage product sizes and their attributes</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => resetForm()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Size
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingSize ? "Edit Size" : "Add New Size"}</DialogTitle>
                    <DialogDescription>
                      {editingSize ? "Update the size details below." : "Create a new size with attributes."}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter size name"
                          className="border"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="border">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter size description"
                        className="border"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                        {availableTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={formData.tags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Attributes</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addAttribute}>
                          <Plus className="mr-1 h-3 w-3" />
                          Add Attribute
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {formData.attributes.map((attr, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <Input
                              placeholder="Key"
                              value={attr.key}
                              onChange={(e) => updateAttribute(index, "key", e.target.value)}
                              className="border flex-1"
                            />
                            <Input
                              placeholder="Value"
                              value={attr.value}
                              onChange={(e) => updateAttribute(index, "value", e.target.value)}
                              className="border flex-1"
                            />
                            {formData.attributes.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeAttribute(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit">{editingSize ? "Update Size" : "Create Size"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Size Management</CardTitle>
                <CardDescription>View and manage all product sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search sizes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 border"
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Attributes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSizes.map((size) => (
                        <TableRow key={size.id}>
                          <TableCell className="font-medium">{size.name}</TableCell>
                          <TableCell>{size.description}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{size.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {size.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {size.attributes.map((attr, index) => (
                                <div key={index} className="text-xs text-muted-foreground">
                                  {attr.key}: {attr.value}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(size)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(size.id)} className="text-destructive">
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
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
