import { type Product, type InsertProduct, type Category, type InsertCategory, type Article, type InsertArticle, type Deal, type InsertDeal, type Newsletter, type InsertNewsletter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsOnSale(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Articles
  getArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;

  // Deals
  getActiveDeals(): Promise<(Deal & { product: Product })[]>;
  createDeal(deal: InsertDeal): Promise<Deal>;

  // Newsletter
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private categories: Map<string, Category>;
  private articles: Map<string, Article>;
  private deals: Map<string, Deal>;
  private newsletters: Map<string, Newsletter>;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.deals = new Map();
    this.newsletters = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData: InsertCategory[] = [
      { name: "Graphics Cards", slug: "graphics-cards", description: "High-performance GPUs for gaming", icon: "microchip", color: "gaming-neon" },
      { name: "Processors", slug: "processors", description: "CPUs for ultimate gaming performance", icon: "memory", color: "gaming-blue" },
      { name: "Storage", slug: "storage", description: "Fast SSDs and storage solutions", icon: "hdd", color: "gaming-red" },
      { name: "Peripherals", slug: "peripherals", description: "Gaming keyboards, mice, and accessories", icon: "keyboard", color: "gaming-neon" },
      { name: "Monitors", slug: "monitors", description: "High-refresh gaming displays", icon: "desktop", color: "gaming-blue" },
      { name: "Cooling", slug: "cooling", description: "Keep your system running cool", icon: "fan", color: "gaming-red" },
    ];

    categoriesData.forEach(cat => this.createCategory(cat));

    // Initialize products
    const productsData: InsertProduct[] = [
      {
        name: "NVIDIA RTX 4090",
        description: "Ultimate 4K gaming performance with ray tracing",
        price: "1599.00",
        category: "graphics-cards",
        brand: "NVIDIA",
        imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        affiliateUrl: "https://example.com/rtx-4090",
        rating: "4.9",
        reviewCount: 124,
        isFeatured: true,
        specifications: { cores: "16384", memory: "24GB GDDR6X", tdp: "450W" }
      },
      {
        name: "AMD Ryzen 9 7950X",
        description: "16-core powerhouse for gaming and content creation",
        price: "699.00",
        category: "processors",
        brand: "AMD",
        imageUrl: "https://pixabay.com/get/g5e1c0c03345941ea3a99c75b0e634084d4a0325f235c3e54236534c10df622e48da833696dc0eb15428ce1966e098418a9aa046956c82f749129a0841fc77d45_1280.jpg",
        affiliateUrl: "https://example.com/ryzen-7950x",
        rating: "4.7",
        reviewCount: 89,
        isFeatured: true,
        specifications: { cores: "16", threads: "32", baseClock: "4.5GHz", boostClock: "5.7GHz" }
      },
      {
        name: "Corsair K95 RGB",
        description: "Mechanical gaming keyboard with Cherry MX switches",
        price: "199.00",
        category: "peripherals",
        brand: "Corsair",
        imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        affiliateUrl: "https://example.com/k95-rgb",
        rating: "4.8",
        reviewCount: 156,
        isFeatured: true,
        specifications: { switches: "Cherry MX", backlighting: "RGB", connectivity: "USB" }
      },
      // Sale items
      {
        name: "Logitech G Pro X",
        description: "Professional wireless gaming mouse",
        price: "89.00",
        originalPrice: "129.00",
        category: "peripherals",
        brand: "Logitech",
        imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        affiliateUrl: "https://example.com/g-pro-x",
        rating: "4.8",
        reviewCount: 89,
        isOnSale: true,
        specifications: { sensor: "HERO 25K", battery: "70 hours", weight: "63g" }
      },
      {
        name: "SteelSeries Arctis 7",
        description: "Wireless gaming headset with DTS Headphone:X",
        price: "149.00",
        originalPrice: "199.00",
        category: "peripherals",
        brand: "SteelSeries",
        imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        affiliateUrl: "https://example.com/arctis-7",
        rating: "4.6",
        reviewCount: 234,
        isOnSale: true,
        specifications: { driver: "40mm", battery: "24 hours", connection: "2.4GHz Wireless" }
      },
      {
        name: "ASUS ROG Swift 27\"",
        description: "27-inch 144Hz gaming monitor with G-SYNC",
        price: "399.00",
        originalPrice: "499.00",
        category: "monitors",
        brand: "ASUS",
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        affiliateUrl: "https://example.com/rog-swift",
        rating: "4.9",
        reviewCount: 167,
        isOnSale: true,
        specifications: { size: "27 inches", resolution: "2560x1440", refreshRate: "144Hz" }
      },
      {
        name: "G.Skill Trident Z5 32GB",
        description: "DDR5-6000 RGB gaming memory kit",
        price: "249.00",
        originalPrice: "299.00",
        category: "storage",
        brand: "G.Skill",
        imageUrl: "https://pixabay.com/get/g87f91c18cf04aaad2843dfedb2d176effc4883fe0b956b48337716d647286cf5fc36fa7396a40a900f12dd980e8ab9c9cbf6c33ab2e7981f5f116e89179c7d7d_1280.jpg",
        affiliateUrl: "https://example.com/trident-z5",
        rating: "4.7",
        reviewCount: 98,
        isOnSale: true,
        specifications: { capacity: "32GB", speed: "DDR5-6000", timings: "CL36-36-36-96" }
      },
      // Trending products
      {
        name: "AMD Ryzen 7 7800X3D",
        description: "Gaming-optimized CPU with 3D V-Cache",
        price: "449.00",
        category: "processors",
        brand: "AMD",
        imageUrl: "https://pixabay.com/get/ge3ad3098f658d35bfa95a0aa751e6d498b91d6141fcfa4ee572ea83a171d3652a6bae65e49b384447f86bb3f9664f45d8641d48084282a5aabf80faa4bcdbef7_1280.jpg",
        affiliateUrl: "https://example.com/7800x3d",
        rating: "4.9",
        reviewCount: 201,
        specifications: { cores: "8", threads: "16", cache: "96MB", tdp: "120W" }
      },
      {
        name: "Secretlab Omega",
        description: "Premium gaming chair with ergonomic design",
        price: "399.00",
        category: "peripherals",
        brand: "Secretlab",
        imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        affiliateUrl: "https://example.com/omega-chair",
        rating: "4.7",
        reviewCount: 345,
        specifications: { material: "Premium leatherette", weight: "150kg max", warranty: "5 years" }
      },
      {
        name: "Samsung 980 PRO 2TB",
        description: "High-performance NVMe SSD for gaming",
        price: "199.00",
        category: "storage",
        brand: "Samsung",
        imageUrl: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        affiliateUrl: "https://example.com/980-pro",
        rating: "4.8",
        reviewCount: 412,
        specifications: { capacity: "2TB", interface: "PCIe 4.0", speed: "7000 MB/s read" }
      },
      {
        name: "ASUS ROG X670E",
        description: "Premium AM5 motherboard for Ryzen 7000",
        price: "699.00",
        category: "processors",
        brand: "ASUS",
        imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        affiliateUrl: "https://example.com/x670e",
        rating: "4.6",
        reviewCount: 78,
        specifications: { socket: "AM5", chipset: "X670E", wifi: "WiFi 6E", usb: "USB 4.0" }
      }
    ];

    productsData.forEach(product => this.createProduct(product));

    // Initialize articles
    const articlesData: InsertArticle[] = [
      {
        title: "Best Gaming Monitors Under $500: Our Top Picks for 2024",
        slug: "best-gaming-monitors-under-500-2024",
        excerpt: "We've tested the latest budget gaming monitors to find the perfect balance of performance and value for competitive gaming.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        author: "Alex Chen",
        category: "REVIEW",
        readTime: 8
      },
      {
        title: "Mechanical Keyboard Switches Explained: Cherry MX vs Alternatives",
        slug: "mechanical-keyboard-switches-guide-2024",
        excerpt: "Understanding different switch types can dramatically improve your gaming experience. Here's our comprehensive guide to finding the perfect switches.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        author: "Sarah Kim",
        category: "GUIDE",
        readTime: 12
      },
      {
        title: "$2000 Gaming PC Build Guide: Maximum Performance for Your Budget",
        slug: "2000-dollar-gaming-pc-build-guide-2024",
        excerpt: "Building a high-performance gaming PC doesn't have to break the bank. Follow our optimized build guide for the best price-to-performance ratio.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        author: "Mike Torres",
        category: "BUILD",
        readTime: 15
      }
    ];

    articlesData.forEach(article => this.createArticle(article));
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isFeatured);
  }

  async getProductsOnSale(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isOnSale);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
      rating: insertProduct.rating || "0",
      reviewCount: insertProduct.reviewCount || 0,
      isFeatured: insertProduct.isFeatured || false,
      isOnSale: insertProduct.isOnSale || false,
      specifications: insertProduct.specifications || {},
      originalPrice: insertProduct.originalPrice || null
    };
    this.products.set(id, product);
    return product;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description || null
    };
    this.categories.set(id, category);
    return category;
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort((a, b) => 
      new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    );
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.slug === slug);
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(article => article.category === category);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = {
      ...insertArticle,
      id,
      publishedAt: new Date(),
      readTime: insertArticle.readTime || 5
    };
    this.articles.set(id, article);
    return article;
  }

  async getActiveDeals(): Promise<(Deal & { product: Product })[]> {
    const deals = Array.from(this.deals.values()).filter(deal => 
      deal.isActive && new Date() < new Date(deal.endDate)
    );
    
    return deals.map(deal => {
      const product = this.products.get(deal.productId);
      if (!product) throw new Error(`Product not found for deal ${deal.id}`);
      return { ...deal, product };
    });
  }

  async createDeal(insertDeal: InsertDeal): Promise<Deal> {
    const id = randomUUID();
    const deal: Deal = { ...insertDeal, id, isActive: true };
    this.deals.set(id, deal);
    return deal;
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      subscribedAt: new Date(),
      isActive: true
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
}

export const storage = new MemStorage();
