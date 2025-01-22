# Workflow Automation Platform

A powerful, web-based workflow automation platform built with Next.js that enables users to create, manage, and execute automated workflows through an intuitive visual interface. Leveraging serverless architecture with Neon Database for optimal scalability and performance.

## Features

- 🔄 Visual Workflow Editor powered by React Flow
- 🤖 Automated task execution engine
- 🔐 Multi-provider authentication (Facebook, GitHub, Email)
- 📊 Serverless Postgres with Neon Database
- 🎯 Multiple task executors including web scraping
- ⚡ Real-time workflow status monitoring
- 📱 Responsive design for desktop and mobile
- 🚀 Edge-ready with Neon's serverless driver

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose (optional)
- npm or yarn package manager
- Neon Database local initialization
- OAuth credentials (Facebook/GitHub)

## Installation

### Using Docker (Development)

1. Clone the repository:
```bash
git clone https://github.com/your-username/workflow-automation-platform.git
cd workflow-automation-platform
```

2. Copy the example environment file:
```bash
cp .env.example .env
```

3. Start the Docker containers:
```bash
docker-compose up -d
```

The application will be available at http://localhost:3000

### Manual Installation

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/workflow-automation-platform.git
cd workflow-automation-platform
npm install
```

2. Set up the environment variables:
```bash
cp .env.example .env
```

3. Start the development server using [pnpm](https://pnpm.io/):
```bash
pnpm run dev
```

4. Start the development server using [npm](https://npm.io/):
```bash
npm run dev
```


## Environment Variables

Create a `.env` file with the following variables:

# Database
AUTH_DRIZZLE_URL="postgres://user:password@hostname:5432/database"

# Authentication
AUTH_SECRET=your-auth-secret-key
NODE_ENV=development
NEXT_PUBLIC_URL=http://localhost:3000

# OAuth Providers
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
AUTH_FACEBOOK_ID=your-facebook-client-id
AUTH_FACEBOOK_SECRET=your-facebook-client-secret

# Email Service
RESEND_API_KEY=your-resend-api-key

# API and Security
API_SECRET=your-api-secret-key
ENCRYPTION_KEY=your-encryption-key

# Stripe Integration
STRIPE_API_KEY=your-stripe-api-key
STRIPE_PRICE_ID_SMALL=price_xxxxxxxxxxxxx_small
STRIPE_PRICE_ID_MEDIUM=price_xxxxxxxxxxxxx_medium
STRIPE_PRICE_ID_LARGE=price_xxxxxxxxxxxxx_large
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
```

## Development

### Database Management
```bash
npm run db:push     # Push schema changes to database
npm run db:studio   # Open Prisma Studio
```

### Running Tests
```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
```

### Code Linting and Formatting
```bash
npm run lint        # Run ESLint
npm run format      # Run Prettier
```

## Tech Stack

- **Frontend:**
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Flow for workflow visualization
- Shadcn UI components

- **Backend:**
- Next.js API Routes
- Auth.js (NextAuth) with multiple providers
    - Facebook OAuth
    - GitHub OAuth
    - Email Magic Links
- Neon Database (Serverless Postgres)
    - Connection pooling
    - Auto-scaling
    - Branching capability
- Prisma ORM with Edge compatibility

- **Development Tools:**
- Docker
- ESLint
- Prettier
- Jest
- Cypress

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/         # API routes
│   │   ├── auth/        # Authentication pages
│   │   └── workflows/   # Workflow pages
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn UI components
│   │   └── workflow/    # Workflow-specific components
│   ├── lib/             # Utility functions and services
│   ├── types/           # TypeScript definitions
│   └── styles/          # Global styles
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── tests/             # Test files
└── docker/            # Docker configuration files
```

## Contributing

We welcome contributions to the Workflow Automation Platform! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Run tests (`npm run test`)
5. Commit your changes (`git commit -am 'Add new feature'`)
6. Push to the branch (`git push origin feature/improvement`)
7. Create a Pull Request

Please ensure your PR description clearly describes the changes and includes any relevant issue numbers.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help or have questions:
- Open an issue
- Check the documentation
- Contact the maintainers

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React Flow](https://reactflow.dev/)
- [Neon Database](https://neon.tech)
- [Auth.js](https://authjs.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
