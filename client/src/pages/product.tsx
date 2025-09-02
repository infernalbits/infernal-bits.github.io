import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Star, Heart, Shield } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ["/api/products", `category=${product?.category}`],
    enabled: !!product?.category,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
        <Button>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-gaming-neon">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-gaming-neon capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
            data-testid={`img-product-${product.id}`}
          />
          {product.isOnSale && (
            <Badge className="absolute top-4 left-4 bg-gaming-red text-background">
              {discountPercentage}% OFF
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/80 backdrop-blur hover:bg-background"
            data-testid="button-favorite"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.brand}</Badge>
              <Badge variant="outline" className="capitalize">{product.category.replace('-', ' ')}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-4" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(parseFloat(product.rating || "0"))
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gaming-neon" data-testid={`text-price-${product.id}`}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.isOnSale && (
              <p className="text-sm text-gaming-red font-medium">
                Save ${(parseFloat(product.originalPrice || "0") - parseFloat(product.price)).toFixed(2)}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button 
              className="w-full bg-gaming-neon hover:bg-gaming-neon/90 text-background py-6 text-lg font-medium hover-glow"
              asChild
              data-testid={`button-view-deal-${product.id}`}
            >
              <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                View Deal <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            
            {/* Affiliate Disclosure */}
            <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
              <Shield className="h-4 w-4 text-gaming-neon mt-0.5" />
              <p className="text-xs text-muted-foreground">
                This is an affiliate link. We may earn a commission if you make a purchase, 
                at no additional cost to you. This helps support our reviews and content.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications as Record<string, string>).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border">
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <div className="product-card rounded-lg p-4 hover-glow cursor-pointer" data-testid={`related-product-${relatedProduct.id}`}>
                    <img 
                      src={relatedProduct.imageUrl} 
                      alt={relatedProduct.name}
                      className="rounded-lg w-full h-32 object-cover mb-4"
                    />
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gaming-neon">${relatedProduct.price}</span>
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs ml-1">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
