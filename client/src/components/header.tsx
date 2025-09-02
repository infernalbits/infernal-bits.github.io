import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Search from "@/components/search";
import { Menu, Flame } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "GPUs", href: "/category/graphics-cards" },
    { name: "CPUs", href: "/category/processors" },
    { name: "Peripherals", href: "/category/peripherals" },
    { name: "Reviews", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer" data-testid="logo-infernalbits">
                <div className="w-8 h-8 bg-gradient-to-br from-gaming-neon to-gaming-blue rounded-lg flex items-center justify-center">
                  <Flame className="text-background text-lg" />
                </div>
                <span className="text-xl font-bold text-gradient">InfernalBits</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span 
                    className={`text-sm font-medium transition-colors hover:text-gaming-neon ${
                      isActive(item.href) ? "text-gaming-neon" : "text-foreground"
                    }`}
                    data-testid={`nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex relative">
              <Search placeholder="Search products..." />
            </div>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="sm:hidden">
                    <Search placeholder="Search products..." />
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span 
                          className={`text-lg font-medium transition-colors hover:text-gaming-neon ${
                            isActive(item.href) ? "text-gaming-neon" : "text-foreground"
                          }`}
                          onClick={() => setIsOpen(false)}
                          data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
