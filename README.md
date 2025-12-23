# SuaStore - E-Commerce Platform

Modern e-commerce marketplace platform built with Next.js 14, NestJS, and Prisma.

## 🚀 Tech Stack

### Frontend (apps/web)
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching & caching
- **Zustand** - State management
- **Lucide React** - Icons

### Backend (apps/api)
- **NestJS** - Node.js framework
- **Prisma** - ORM
- **MySQL** - Database
- **JWT** - Authentication
- **Xendit** - Payment gateway

## 📁 Project Structure

```
suastore/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities, hooks, API
│   └── api/              # NestJS backend
│       ├── src/modules/  # Feature modules
│       └── src/shared/   # Shared services
├── packages/
│   ├── database/         # Prisma schema
│   ├── core/             # Shared utilities
│   └── typescript-config/# TS configs
└── turbo.json
```

## 🎨 Frontend Pages

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage with flash sale, categories |
| `/product/[slug]` | Product detail |
| `/category/[slug]` | Category products |
| `/store/[slug]` | Store page |
| `/search` | Search results |
| `/cart` | Shopping cart |
| `/checkout` | Checkout flow |

### Auth Pages
| Route | Description |
|-------|-------------|
| `/auth/login` | Login |
| `/auth/register` | Registration |

### User Pages
| Route | Description |
|-------|-------------|
| `/profile` | User profile |
| `/profile/orders` | Order history |
| `/profile/wishlist` | Wishlist |
| `/chat` | Chat with sellers |

### Seller Dashboard
| Route | Description |
|-------|-------------|
| `/seller` | Dashboard overview |
| `/seller/products` | Product management |
| `/seller/products/new` | Add new product |
| `/seller/orders` | Order management |
| `/seller/finance` | Finance & withdrawals |
| `/seller/chat` | Chat with buyers |
| `/seller/reviews` | Review management |
| `/seller/vouchers` | Voucher management |
| `/seller/stats` | Analytics |
| `/seller/settings` | Store settings |

## 🔌 API Endpoints

### Auth
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `GET /api/v1/auth/profile`

### Products
- `GET /api/v1/products`
- `GET /api/v1/products/:slug`
- `GET /api/v1/products/flash-sale`
- `GET /api/v1/products/featured`

### Categories
- `GET /api/v1/categories`
- `GET /api/v1/categories/:slug`

### Cart
- `GET /api/v1/cart`
- `POST /api/v1/cart`
- `PUT /api/v1/cart/:id`
- `DELETE /api/v1/cart/:id`

### Orders
- `GET /api/v1/orders`
- `GET /api/v1/orders/:id`
- `POST /api/v1/orders`

### Payment (Xendit)
- `GET /api/v1/payment/methods`
- `POST /api/v1/payment/invoice`
- `POST /api/v1/payment/virtual-account`
- `POST /api/v1/payment/ewallet`
- `POST /api/v1/payment/qris`

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8+
- npm or pnpm

### Installation

1. **Clone & Install**
```bash
git clone https://github.com/your-repo/suastore.git
cd suastore
npm install
```

2. **Setup Database**
```bash
# Create MySQL database
mysql -u root -e "CREATE DATABASE suastore"

# Copy env files
cp apps/api/env.sample apps/api/.env
cp apps/web/env.sample apps/web/.env.local

# Update DATABASE_URL in apps/api/.env

# Push schema
cd packages/database
npx prisma db push
```

3. **Run Development**
```bash
# Start API (port 4000)
npm run dev -w @suastore/api

# Start Web (port 3000)
npm run dev -w @suastore/web
```

### Environment Variables

**apps/api/.env**
```env
DATABASE_URL="mysql://root:@localhost:3306/suastore"
JWT_SECRET="your-secret-key"
XENDIT_SECRET_KEY="xnd_development_xxx"
```

**apps/web/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_APP_NAME=SuaStore
```

## 💳 Payment Integration

Xendit payment methods supported:
- **Virtual Account**: BCA, BNI, BRI, Mandiri, Permata
- **E-Wallet**: OVO, DANA, ShopeePay, GoPay, LinkAja
- **QRIS**: Universal QR code

## 📱 Features

- ✅ Product catalog with search & filters
- ✅ Shopping cart
- ✅ Wishlist
- ✅ User authentication
- ✅ Order management
- ✅ Seller dashboard
- ✅ Real-time chat
- ✅ Voucher system
- ✅ Payment gateway integration
- ✅ Responsive design & dark mode

## 📄 License

MIT
