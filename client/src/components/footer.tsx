import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Flame, Twitter, Youtube, MessageCircle, Vote, Info } from "lucide-react";

export default function Footer() {
  const categories = [
    { name: "Graphics Cards", href: "/category/graphics-cards" },
    { name: "Processors", href: "/category/processors" },
    { name: "Motherboards", href: "/category/motherboards" },
    { name: "Gaming Monitors", href: "/category/monitors" },
    { name: "Peripherals", href: "/category/peripherals" },
  ];

  const resources = [
    { name: "Build Guides", href: "/news?category=BUILD" },
    { name: "Reviews", href: "/news?category=REVIEW" },
    { name: "Comparisons", href: "/news?category=GUIDE" },
    { name: "Gaming News", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <div className="font-mono text-gaming-neon/60 text-xs leading-none mb-2">
                ╔════════════════════════════════════════╗
                ║  ██╗███╗   ██╗███████╗███████╗██████╗  ║
                ║  ██║████╗  ██║██╔════╝██╔════╝██╔══██╗ ║
                ║  ██║██╔██╗ ██║█████╗  █████╗  ██████╔╝ ║
                ║  ██║██║╚██╗██║██╔══╝  ██╔══╝  ██╔══██╗ ║
                ║  ██║██║ ╚████║██║     ███████╗██║  ██║ ║
                ║  ╚═╝╚═╝  ╚═══╝╚═╝     ╚══════╝╚═╝  ╚═╝ ║
                ╚════════════════════════════════════════╝
              </div>
              <span className="text-xl font-bold text-gradient">InfernalBits</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted source for gaming hardware reviews, comparisons, and the best deals on PC gaming components.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gaming-neon" data-testid="social-twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gaming-neon" data-testid="social-youtube">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gaming-neon" data-testid="social-discord">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gaming-neon" data-testid="social-reddit">
                <Vote className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href}>
                    <span className="text-muted-foreground hover:text-gaming-neon transition-colors" data-testid={`footer-category-${category.name.toLowerCase().replace(' ', '-')}`}>
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link href={resource.href}>
                    <span className="text-muted-foreground hover:text-gaming-neon transition-colors" data-testid={`footer-resource-${resource.name.toLowerCase().replace(' ', '-')}`}>
                      {resource.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-muted-foreground hover:text-gaming-neon transition-colors" data-testid={`footer-legal-${item.name.toLowerCase().replace(' ', '-')}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Affiliate Disclosure */}
        <div className="border-t border-border pt-8">
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="text-gaming-neon mt-1 h-5 w-5" />
              <div>
                <h4 className="font-medium text-sm mb-1">Affiliate Disclosure</h4>
                <p className="text-xs text-muted-foreground">
                  InfernalBits.com participates in affiliate programs and may earn commissions from qualifying purchases made through our links. 
                  This does not affect our editorial independence or the price you pay. We only recommend products we genuinely believe in.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-4">
            <p className="text-sm text-muted-foreground">© 2024 InfernalBits.com. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-muted-foreground">
              <span>Built for gamers, by gamers</span>
              <span>•</span>
              <span>Powered by React & Express</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
