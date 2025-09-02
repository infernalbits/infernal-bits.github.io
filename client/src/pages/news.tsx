import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { type Article } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User } from "lucide-react";

export default function NewsPage() {
  const { slug } = useParams<{ slug?: string }>();

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const { data: article, isLoading: articleLoading } = useQuery<Article>({
    queryKey: ["/api/articles", slug],
    enabled: !!slug,
  });

  // If we have a slug, show single article view
  if (slug) {
    if (articleLoading) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      );
    }

    if (!article) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button>
            <Link href="/news">Back to News</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-hellfire-red">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/news" className="hover:text-hellfire-red">News</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{article.title}</span>
          </nav>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={`${
                article.category === 'REVIEW' ? 'bg-hellfire-red text-background' :
                article.category === 'GUIDE' ? 'bg-infernal-orange text-background' :
                'bg-demon-purple text-background'
              }`}>
                {article.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime} min read
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-6" data-testid={`text-article-title-${article.slug}`}>
              {article.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">{article.excerpt}</p>
            
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg mb-8"
              data-testid={`img-article-${article.slug}`}
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-lg leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles
                ?.filter(a => a.id !== article.id && a.category === article.category)
                .slice(0, 3)
                .map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/news/${relatedArticle.slug}`}>
                    <Card className="hover-glow cursor-pointer" data-testid={`related-article-${relatedArticle.slug}`}>
                      <img 
                        src={relatedArticle.imageUrl} 
                        alt={relatedArticle.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2">{relatedArticle.category}</Badge>
                        <h4 className="font-semibold mb-2 line-clamp-2">{relatedArticle.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relatedArticle.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Article listing view
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 infernal-text-glow">Unholy Chronicles & Dark Reviews</h1>
        <p className="text-lg text-muted-foreground">
          Forbidden knowledge, cursed hardware reviews, and digital damnation guides
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8">
        <Button variant="default" className="bg-hellfire-red text-background" data-testid="filter-all">
          All Articles
        </Button>
        <Button variant="outline" data-testid="filter-reviews">Reviews</Button>
        <Button variant="outline" data-testid="filter-guides">Guides</Button>
        <Button variant="outline" data-testid="filter-builds">Builds</Button>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articlesLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
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
        ) : articles?.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Check back later for new content.</p>
          </div>
        ) : (
          articles?.map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`}>
              <Card className="hover-glow cursor-pointer overflow-hidden" data-testid={`article-card-${article.slug}`}>
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={`${
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
                      <div className="w-6 h-6 bg-hellfire-red rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{article.author}</span>
                    </div>
                    <span className="text-hellfire-red text-sm font-medium">Delve Deeper</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
