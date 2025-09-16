"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Shield } from "lucide-react"
import { useState } from "react"

const mockRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access with all permissions",
    permissions: [
      "products_view",
      "products_add",
      "products_edit",
      "products_delete",
      "categories_view",
      "categories_add",
      "categories_edit",
      "categories_delete",
      "subcategories_view",
      "subcategories_add",
      "subcategories_edit",
      "subcategories_delete",
      "customers_view",
      "customers_add",
      "customers_edit",
      "customers_delete",
      "orders_view",
      "orders_add",
      "orders_edit",
      "orders_delete",
      "roles_view",
      "roles_add",
      "roles_edit",
      "roles_delete",
    ],
    userCount: 2,
    createdDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Manager",
    description: "Management access with limited administrative permissions",
    permissions: ["products_view", "products_add", "categories_view", "customers_view", "orders_view"],
    userCount: 3,
    createdDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Customer",
    description: "Basic user access for customers",
    permissions: ["products_view"],
    userCount: 150,
    createdDate: "2024-01-01",
  },
  {
    id: 4,
    name: "Support",
    description: "Customer support access with read and limited write permissions",
    permissions: ["products_view", "products_add", "customers_view", "orders_view"],
    userCount: 5,
    createdDate: "2024-02-01",
  },
]

const permissionCategories = [
  {
    id: "products",
    label: "Products",
    description: "Manage product catalog",
    operations: [
      { id: "products_view", label: "View", description: "View products" },
      { id: "products_add", label: "Add", description: "Create new products" },
      { id: "products_edit", label: "Edit", description: "Modify existing products" },
      { id: "products_delete", label: "Delete", description: "Remove products" },
    ],
  },
  {
    id: "categories",
    label: "Categories",
    description: "Manage product categories",
    operations: [
      { id: "categories_view", label: "View", description: "View categories" },
      { id: "categories_add", label: "Add", description: "Create new categories" },
      { id: "categories_edit", label: "Edit", description: "Modify existing categories" },
      { id: "categories_delete", label: "Delete", description: "Remove categories" },
    ],
  },
  {
    id: "subcategories",
    label: "Sub Categories",
    description: "Manage product subcategories",
    operations: [
      { id: "subcategories_view", label: "View", description: "View subcategories" },
      { id: "subcategories_add", label: "Add", description: "Create new subcategories" },
      { id: "subcategories_edit", label: "Edit", description: "Modify existing subcategories" },
      { id: "subcategories_delete", label: "Delete", description: "Remove subcategories" },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    description: "Manage customer accounts",
    operations: [
      { id: "customers_view", label: "View", description: "View customer information" },
      { id: "customers_add", label: "Add", description: "Create new customer accounts" },
      { id: "customers_edit", label: "Edit", description: "Modify customer information" },
      { id: "customers_delete", label: "Delete", description: "Remove customer accounts" },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    description: "Manage customer orders",
    operations: [
      { id: "orders_view", label: "View", description: "View order information" },
      { id: "orders_add", label: "Add", description: "Create new orders" },
      { id: "orders_edit", label: "Edit", description: "Modify order details" },
      { id: "orders_delete", label: "Delete", description: "Cancel/remove orders" },
    ],
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    description: "Manage user roles and permissions",
    operations: [
      { id: "roles_view", label: "View", description: "View roles and permissions" },
      { id: "roles_add", label: "Add", description: "Create new roles" },
      { id: "roles_edit", label: "Edit", description: "Modify role permissions" },
      { id: "roles_delete", label: "Delete", description: "Remove roles" },
    ],
  },
]

export default function RolesPage() {
  const [roles, setRoles] = useState(mockRoles)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<any>(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRole = () => {
    const role = {
      id: roles.length + 1,
      ...newRole,
      userCount: 0,
      createdDate: new Date().toISOString().split("T")[0],
    }
    setRoles([...roles, role])
    setNewRole({ name: "", description: "", permissions: [] })
    setIsAddDialogOpen(false)
  }

  const handleEditRole = (role: any) => {
    setEditingRole(role)
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    })
  }

  const handleUpdateRole = () => {
    setRoles(roles.map((role) => (role.id === editingRole.id ? { ...role, ...newRole } : role)))
    setEditingRole(null)
    setNewRole({ name: "", description: "", permissions: [] })
  }

  const handleDeleteRole = (roleId: number) => {
    setRoles(roles.filter((role) => role.id !== roleId))
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setNewRole({ ...newRole, permissions: [...newRole.permissions, permissionId] })
    } else {
      setNewRole({ ...newRole, permissions: newRole.permissions.filter((p) => p !== permissionId) })
    }
  }

  const renderPermissions = () => (
    <div className="space-y-6">
      {permissionCategories.map((category) => (
        <div key={category.id} className="border rounded-lg p-4">
          <div className="mb-3">
            <h4 className="text-sm font-medium text-foreground">{category.label}</h4>
            <p className="text-xs text-muted-foreground">{category.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {category.operations.map((operation) => (
              <div key={operation.id} className="flex items-center space-x-2">
                <Checkbox
                  id={operation.id}
                  checked={newRole.permissions.includes(operation.id)}
                  onCheckedChange={(checked) => handlePermissionChange(operation.id, checked as boolean)}
                />
                <label
                  htmlFor={operation.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {operation.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Roles</h1>
                <p className="text-muted-foreground">Manage user roles and permissions</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Role
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Role</DialogTitle>
                    <DialogDescription>Create a new role with specific permissions.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Role Name</Label>
                      <Input
                        id="name"
                        value={newRole.name}
                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                        placeholder="Enter role name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newRole.description}
                        onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                        placeholder="Enter role description"
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Permissions</Label>
                      {renderPermissions()}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddRole}>Add Role</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                          {role.name}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{role.description}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 2).map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission.replace("_", " ")}
                            </Badge>
                          ))}
                          {role.permissions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{role.userCount} users</Badge>
                      </TableCell>
                      <TableCell>{role.createdDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditRole(role)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteRole(role.id)} className="text-destructive">
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

            <Dialog open={!!editingRole} onOpenChange={() => setEditingRole(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Role</DialogTitle>
                  <DialogDescription>Update the role details and permissions below.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Role Name</Label>
                    <Input
                      id="edit-name"
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      placeholder="Enter role name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={newRole.description}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                      placeholder="Enter role description"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Permissions</Label>
                    {renderPermissions()}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingRole(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateRole}>Update Role</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  )
}
