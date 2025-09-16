"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Layers,
  Menu,
  X,
  ShoppingCart,
  Store,
  Users,
  BarChart3,
  ChevronDown,
  ChevronRight,
  FolderTree,
  Tags,
  Shield,
  Ruler,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navigationCategories = [
  {
    name: "Overview",
    items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    name: "Sales",
    items: [
      { name: "Orders", href: "/orders", icon: ShoppingCart },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    name: "Catalog",
    items: [
      { name: "Products", href: "/products", icon: Package },
      { name: "Categories", href: "/categories", icon: FolderTree },
      { name: "Subcategories", href: "/subcategories", icon: Tags },
      { name: "Sizes", href: "/sizes", icon: Ruler },
      { name: "Colors", href: "/colors", icon: Palette },
      { name: "Components", href: "/components", icon: Layers },
    ],
  },
  {
    name: "Management",
    items: [
      { name: "Customers", href: "/customers", icon: Users },
      { name: "Roles", href: "/roles", icon: Shield },
      { name: "Store", href: "/store", icon: Store },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Overview", "Sales", "Catalog", "Management"])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="h-9 w-9"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-foreground">Admin Dashboard</h1>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationCategories.map((category) => (
              <div key={category.name} className="space-y-1">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider hover:text-sidebar-foreground transition-colors"
                >
                  <span>{category.name}</span>
                  {expandedCategories.includes(category.name) ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>

                {/* Category Items */}
                {expandedCategories.includes(category.name) && (
                  <div className="space-y-1 ml-2">
                    {category.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                            isActive
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          )}
                        >
                          <item.icon className="mr-3 h-4 w-4" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
