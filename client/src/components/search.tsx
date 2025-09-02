import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type Product } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchProps {
  placeholder?: string;
}

export default function Search({ placeholder = "Search products..." }: SearchProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [, setLocation] = useLocation();

  const { data: searchResults, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", `search=${query}`],
    enabled: query.length > 2,
  });

  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(value.length > 2);
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
    setShowResults(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="pl-10 pr-10"
          data-testid="input-search"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8"
            onClick={clearSearch}
            data-testid="button-clear-search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                Searching...
              </div>
            ) : searchResults?.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No products found for "{query}"
              </div>
            ) : (
              <div className="space-y-1">
                {searchResults?.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleProductClick(product.id)}
                    data-testid={`search-result-${product.id}`}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
                {searchResults && searchResults.length > 5 && (
                  <div className="p-3 text-center text-sm text-muted-foreground border-t">
                    {searchResults.length - 5} more results...
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
