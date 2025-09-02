import { Link } from "wouter";
import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ExternalLink } from "lucide-react";

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

export default function ProductCard({ product, showDiscount = false }: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  const getColorByCategory = (category: string) => {
    switch (category) {
      case 'graphics-cards':
        return 'hellfire-red';
      case 'processors':
        return 'infernal-orange';
      case 'peripherals':
        return 'demon-purple';
      case 'monitors':
        return 'infernal-orange';
      case 'storage':
        return 'demon-purple';
      default:
        return 'hellfire-red';
    }
  };

  const color = getColorByCategory(product.category);

  return (
    <div className="product-card rounded-lg overflow-hidden hover-glow" data-testid={`product-card-${product.id}`}>
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
            data-testid={`img-product-${product.id}`}
          />
        </Link>
        {showDiscount && product.originalPrice && (
          <Badge className="absolute top-2 left-2 bg-hellfire-red text-background">
            {discountPercentage}% OFF
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur rounded-full p-2 hover:bg-background"
          data-testid={`button-favorite-${product.id}`}
        >
          <Heart className="h-4 w-4 text-foreground hover:text-hellfire-red" />
        </Button>
      </div>
      
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-hellfire-red cursor-pointer" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center space-x-2">
            {showDiscount && product.originalPrice ? (
              <>
                <span className={`text-lg font-bold text-${color}`} data-testid={`text-sale-price-${product.id}`}>
                  ${product.price}
                </span>
                <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${product.id}`}>
                  ${product.originalPrice}
                </span>
              </>
            ) : (
              <span className={`text-lg font-bold text-${color}`} data-testid={`text-price-${product.id}`}>
                ${product.price}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(parseFloat(product.rating || "0"))
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          
          <Button 
            className={`bg-${color} hover:bg-${color}/90 text-background px-4 py-2 rounded text-sm font-medium`}
            asChild
            data-testid={`button-view-deal-${product.id}`}
          >
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
              View Deal <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
