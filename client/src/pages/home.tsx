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
      <section className="hero-gradient py-16 lg:py-24 digital-smoke relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="font-mono text-hellfire-red/60 text-xs mb-4 leading-none infernal-text-glow">
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
              ▄▄▄██▀▀▀██   ▐█▀▀▀▀▀▀▀█▌     ▄▄▄██▀▀▀██   ▐█▀▀▀▀▀▀▀█▌  ██           ██       
              ▀▀▀██    ██   ▐█▄▄▄▄▄▄▄█▌     ▀▀▀██    ██   ▐█▄▄▄▄▄▄▄█▌  ██           ██       
                 ██    ██   ▐█▀▀▀▀▀▀▀█▌        ██    ██   ▐█▀▀▀▀▀▀▀█▌  ██           ██       
              ▄▄▄██    ██   ▐█▄▄▄▄▄▄▄█▌     ▄▄▄██    ██   ▐█▄▄▄▄▄▄▄█▌  ███████████  ███████████
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 infernal-text-glow">
              Descend into <span className="text-gradient">Digital Hell</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Welcome to the underworld of gaming hardware. Where only the most sinister builds survive and the weak are devoured by frame drops.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium hover-glow transition-all" data-testid="button-browse-products">
                <Link href="/category/graphics-cards">Enter the Arsenal</Link>
              </Button>
              <Button variant="outline" className="border border-infernal-orange text-infernal-orange hover:bg-infernal-orange hover:text-accent-foreground px-8 py-3 rounded-lg font-medium transition-all" data-testid="button-latest-reviews">
                <Link href="/news">Read the Prophecies</Link>
              </Button>
            </div>
          </div>
          
          {/* Featured Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 relative">
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

      {/* ASCII Section Divider */}
      <div className="text-center py-8">
        <div className="font-mono text-infernal-orange/40 text-xs leading-none">
          ░▒▓██████████ ⟄⟄⟄ SOULS BURNING ⟄⟄⟄ ██████████▓▒░
        </div>
      </div>

      {/* Product Categories */}
      <section className="py-16 bg-card digital-smoke relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 infernal-text-glow">Choose Your Weapon</h2>
            <p className="text-muted-foreground text-lg">Arm yourself from our cursed arsenal of digital destruction</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="hellfire-border rounded-lg p-6 text-center">
                  <Skeleton className="w-12 h-12 rounded-lg mx-auto mb-3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            ) : (
              categories?.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <div className="hellfire-border rounded-lg p-6 text-center hover-glow cursor-pointer" data-testid={`category-${category.slug}`}>
                    <div className={`w-12 h-12 bg-gradient-to-br from-hellfire-red to-infernal-orange rounded-lg mx-auto mb-3 flex items-center justify-center hellfire-glow`}>
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

      {/* ASCII Gaming Divider */}
      <div className="text-center py-8">
        <div className="font-mono text-demon-purple/40 text-xs leading-none">
          ██▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▓▓██
          █▓▒░  ▄████▄   █████▄ ██████▄ ███ ██████▄   ████▄  ████▄ ███     ░▒▓█
          █▓▒░  ██▄▄██   ██▄▄██ ██▄▄▄██ ███ ██▄▄▄██   ██▄██  ██▄██ ███     ░▒▓█
          █▓▒░  ▀████▀   █████▀ ███████ ███ ███████   ████▀  ████▀ ███████ ░▒▓█
          ██▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▓▓██
        </div>
      </div>

      {/* Hot Deals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 infernal-text-glow">Soul-Burning Bargains</h2>
              <p className="text-muted-foreground">Damned deals before they vanish into the void</p>
            </div>
            <Button variant="ghost" className="text-hellfire-red hover:text-hellfire-red/80 font-medium" data-testid="button-view-all-deals">
              Claim All Deals <i className="fas fa-arrow-right ml-2"></i>
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

      {/* ASCII News Divider */}
      <div className="text-center py-8">
        <div className="font-mono text-hellfire-red/40 text-xs leading-none">
          ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
          ██▓▒░    ☠ DARK PROPHECIES FROM THE DIGITAL REALM ☠    ░▒▓██
          ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
        </div>
      </div>

      {/* Gaming News & Reviews */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 infernal-text-glow">Unholy Chronicles</h2>
              <p className="text-muted-foreground">Dark secrets and forbidden knowledge from the digital underworld</p>
            </div>
            <Button variant="ghost" className="text-hellfire-red hover:text-hellfire-red/80 font-medium" data-testid="button-view-all-articles">
              <Link href="/news">Read All Prophecies <i className="fas fa-arrow-right ml-2"></i></Link>
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
                        article.category === 'REVIEW' ? 'bg-hellfire-red text-background' :
                        article.category === 'GUIDE' ? 'bg-infernal-orange text-background' :
                        'bg-demon-purple text-background'
                      } text-xs font-bold`}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{article.readTime} min read</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-hellfire-red rounded-full hellfire-glow"></div>
                        <span className="text-sm text-muted-foreground">{article.author}</span>
                      </div>
                      <Button variant="ghost" className="text-hellfire-red hover:text-hellfire-red/80 text-sm font-medium p-0" data-testid={`button-read-article-${article.slug}`}>
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
