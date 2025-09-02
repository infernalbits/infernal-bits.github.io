import { useQuery } from "@tanstack/react-query";
import { type Product, type Category, type Article } from "@shared/schema";
import ProductCard from "@/components/product-card";
import Newsletter from "@/components/newsletter";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { data: featuredProducts, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", "featured=true"],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: saleProducts, isLoading: saleLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", "sale=true"],
  });

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Unleash Your <span className="text-gradient">Gaming Potential</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the latest gaming hardware, in-depth reviews, and exclusive deals on top-tier components to build your ultimate gaming rig.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium hover-glow transition-all" data-testid="button-browse-products">
                <Link href="/category/graphics-cards">Browse Products</Link>
              </Button>
              <Button variant="outline" className="border border-gaming-blue text-gaming-blue hover:bg-gaming-blue hover:text-accent-foreground px-8 py-3 rounded-lg font-medium transition-all" data-testid="button-latest-reviews">
                <Link href="/news">Latest Reviews</Link>
              </Button>
            </div>
          </div>
          
          {/* Featured Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {productsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="product-card rounded-lg p-6">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))
            ) : (
              featuredProducts?.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">Find the perfect components for your gaming setup</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="neon-border rounded-lg p-6 text-center">
                  <Skeleton className="w-12 h-12 rounded-lg mx-auto mb-3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            ) : (
              categories?.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <div className="neon-border rounded-lg p-6 text-center hover-glow cursor-pointer" data-testid={`category-${category.slug}`}>
                    <div className={`w-12 h-12 bg-gradient-to-br from-gaming-neon to-gaming-blue rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                      <i className={`fas fa-${category.icon} text-background text-xl`}></i>
                    </div>
                    <h3 className="font-medium text-sm">{category.name}</h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Hot Deals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Hot Deals 🔥</h2>
              <p className="text-muted-foreground">Limited time offers on top gaming gear</p>
            </div>
            <Button variant="ghost" className="text-gaming-neon hover:text-gaming-neon/80 font-medium" data-testid="button-view-all-deals">
              View All Deals <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="product-card rounded-lg overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))
            ) : (
              saleProducts?.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} showDiscount />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Gaming News & Reviews */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Gaming News & Reviews</h2>
              <p className="text-muted-foreground">Stay updated with the latest in gaming hardware</p>
            </div>
            <Button variant="ghost" className="text-gaming-neon hover:text-gaming-neon/80 font-medium" data-testid="button-view-all-articles">
              <Link href="/news">View All Articles <i className="fas fa-arrow-right ml-2"></i></Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="product-card rounded-lg overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              articles?.slice(0, 3).map((article) => (
                <article key={article.id} className="product-card rounded-lg overflow-hidden hover-glow" data-testid={`article-${article.slug}`}>
                  <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary" className={`${
                        article.category === 'REVIEW' ? 'bg-gaming-neon text-background' :
                        article.category === 'GUIDE' ? 'bg-gaming-blue text-background' :
                        'bg-gaming-red text-background'
                      } text-xs font-bold`}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{article.readTime} min read</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gaming-neon rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{article.author}</span>
                      </div>
                      <Button variant="ghost" className="text-gaming-neon hover:text-gaming-neon/80 text-sm font-medium p-0" data-testid={`button-read-article-${article.slug}`}>
                        <Link href={`/news/${article.slug}`}>Read More</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
