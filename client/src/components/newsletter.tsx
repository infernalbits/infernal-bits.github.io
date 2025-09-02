import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thanks for joining our community. Check your email for confirmation.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      subscribeMutation.mutate(email.trim());
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <div className="font-mono text-gaming-neon/40 text-xs leading-none">
            ╔══════════════════════════════════════════════════════════════════════════╗
            ║  ██████╗ ██╗   ██╗██████╗ ███████╗ ██████╗██████╗ ██╗██████╗ ███████╗  ║
            ║  ██╔══██╗██║   ██║██╔══██╗██╔════╝██╔════╝██╔══██╗██║██╔══██╗██╔════╝  ║
            ║  ██████╔╝██║   ██║██████╔╝███████╗██║     ██████╔╝██║██████╔╝█████╗    ║
            ║  ██╔══██╗██║   ██║██╔══██╗╚════██║██║     ██╔══██╗██║██╔══██╗██╔══╝    ║
            ║  ██║  ██║╚██████╔╝██████╔╝███████║╚██████╗██║  ██║██║██████╔╝███████╗  ║
            ║  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝  ║
            ╚══════════════════════════════════════════════════════════════════════════╝
          </div>
        </div>
        <div className="neon-border rounded-lg p-8 lg:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Level Up Your Gaming Knowledge</h2>
            <p className="text-muted-foreground mb-8">
              Get exclusive deals, early access to reviews, and insider tips delivered to your inbox weekly.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit" 
                className="bg-gaming-neon hover:bg-gaming-neon/90 text-background px-6 py-3 rounded-lg font-medium whitespace-nowrap"
                disabled={subscribeMutation.isPending}
                data-testid="button-subscribe-newsletter"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            
            <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-gaming-neon" />
                No spam, ever
              </div>
              <div className="flex items-center">
                <X className="mr-2 h-4 w-4 text-gaming-neon" />
                Unsubscribe anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
