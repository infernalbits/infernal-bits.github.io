# Overview

InfernalBits is a gaming hardware review and affiliate commerce platform that helps users discover the latest gaming components, read expert reviews, and find the best deals on PC gaming hardware. The application features product catalogs, detailed reviews, deal tracking, and newsletter functionality for gaming enthusiasts.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built as a React SPA using modern tooling:
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and API caching
- **Shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS** for styling with custom gaming-themed color palette
- **Dark mode** as the default theme with gaming aesthetics

## Backend Architecture
The server follows a REST API pattern:
- **Express.js** server with TypeScript
- **RESTful endpoints** for products, categories, articles, deals, and newsletter
- **In-memory storage** implementation with a clean interface for future database integration
- **Middleware** for request logging and error handling
- **Static file serving** for production builds

## Data Storage Design
Currently uses in-memory storage with a well-defined interface:
- **IStorage interface** defines all data operations
- **MemStorage class** provides initial implementation with seed data
- **Schema definitions** using Drizzle ORM types for type safety
- **Database-ready** structure with PostgreSQL schema definitions prepared

## Component Architecture
The UI is organized into reusable components:
- **Shared components** for product cards, search, newsletter signup
- **Page components** for different routes (home, category, product, news)
- **UI components** from Shadcn/ui for consistent design
- **Layout components** for header, footer, and page structure

## API Design
RESTful API structure:
- `/api/products` - Product CRUD and filtering (category, search, featured, sale)
- `/api/categories` - Category management
- `/api/articles` - Content management for reviews and guides
- `/api/deals` - Special offers and promotions
- `/api/newsletter` - Email subscription management

## State Management
- **TanStack Query** handles all server state, caching, and synchronization
- **Local component state** for UI interactions
- **React Context** for global UI state (toasts, theme)
- **Query invalidation** strategies for data consistency

## Routing Strategy
- **Wouter** provides client-side routing with a simple API
- **Dynamic routes** for products (`/product/:id`) and categories (`/category/:slug`)
- **Nested routes** for news articles (`/news/:slug`)
- **404 handling** with custom not-found pages

# External Dependencies

## Database Integration
- **Drizzle ORM** with PostgreSQL dialect configured
- **Neon Database** serverless PostgreSQL as the intended production database
- **Database migrations** set up through Drizzle Kit
- **Schema definitions** include all necessary tables for products, categories, articles, deals, and newsletter

## UI and Styling
- **Radix UI** primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling
- **Class Variance Authority** for component variant management
- **Lucide React** for consistent iconography

## Development Tools
- **TypeScript** for type safety across the entire stack
- **ESBuild** for fast production builds
- **PostCSS** with Autoprefixer for CSS processing
- **Replit integration** with development tooling and error overlays

## Email and Analytics
- **Newsletter functionality** prepared for email service integration
- **Form handling** with React Hook Form and Zod validation
- **Toast notifications** for user feedback

## Content Management
- **Article system** for reviews and guides
- **Category-based organization** for content
- **Search functionality** across products and content
- **Deal tracking** with expiration dates