# Next.js Grok-Beta XAI Boilerplate

<div align="left">
  <h3>A minimal boilerplate for Grok-Beta XAI integration with Next.js</h3>
  <p>Features X/Twitter OAuth2.0 authentication and API integration</p>
</div>
<img width="1720" alt="Screenshot 2024-11-04 at 5 33 32 PM" src="https://github.com/user-attachments/assets/08f8a148-0542-47bd-879b-984e9f7e77f0">

## 🤖 About

A starter template for building applications with Grok-Beta XAI. Includes authentication setup with X/Twitter OAuth2.0 and basic API integration patterns.

## ✨ Features

- 🧠 **Grok-Beta XAI Integration** - Ready-to-use API setup
- 🔒 **X Auth** - Preconfigured X/Twitter OAuth 2.0 with NextAuth.js
- ⚡ **API Routes** - Structured API endpoints for Grok-Beta
- 🎯 **TypeScript** - Full type safety and modern development experience
- 📝 **Examples** - Basic implementation patterns and usage samples

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Authentication**: NextAuth.js
- **API Integration**: Grok-Beta XAI
- **Language**: TypeScript

## 🚀 Getting Started

1. Clone and install:

```bash
git clone https://github.com/yourusername/grok-beta-boilerplate.git
cd grok-beta-boilerplate
npm install
```

2. Configure environment variables:

```env
# Auth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# X/Twitter OAuth
TWITTER_CLIENT_ID=your-x-client-id
TWITTER_CLIENT_SECRET=your-x-client-secret

# Grok-Beta API
GROK_API_KEY=your-grok-beta-api-key
```

3. Start development:

```bash
npm run dev
```

## 📁 Project Structure
```
├── src/                      # Source code directory
│   ├── app/                  # Main application files
│   │   ├── api/              # API routes
│   │   │   └── auth/         # Authentication API route
│   │   ├── layout.tsx        # Application layout component
│   │   ├── page.tsx          # Main page component
│   │   └── providers.tsx     # Context and provider setups
│   ├── components/           # UI components
│   │   └── forms/            # Form components like chat-form
│   ├── context/              # Context providers (e.g., Chat context)
│   ├── hooks/                # Custom React hooks
│   ├── styles/               # Styling files (e.g., global styles)
│   ├── utils/                # Utility functions (e.g., Axios instance)
│   └── middleware.ts         # Middleware for handling requests
├── .env.local  
```
## 🔗 Resources

- [Grok-Beta Documentation](https://grok.x.ai/docs)
- [NextAuth.js Guide](https://next-auth.js.org/)
- [X OAuth Documentation](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
