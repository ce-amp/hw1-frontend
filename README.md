# سوال‌پیچ (Quiz Platform)

A modern quiz platform built with Next.js, TypeScript, and Tailwind CSS, featuring a beautiful UI and comprehensive functionality for both quiz designers and players. The platform supports RTL languages and provides an intuitive interface for creating, managing, and participating in quizzes.

## Features

### For Quiz Designers

- Create and manage questions with different difficulty levels
- Organize questions into categories with custom taxonomies
- Edit and delete existing questions with version history
- Manage question categories with hierarchical support
- View personal profile and detailed statistics
- Track question performance and user engagement
- Bulk question import/export functionality
- Rich text editor for question content
- Media support for questions (images, audio)
- Question preview before publishing

### For Players

- Answer questions based on difficulty levels (Easy, Medium, Hard)
- Play random quizzes across all difficulty levels
- View comprehensive leaderboard and rankings
- Follow other users and track their progress
- Track personal progress and detailed statistics
- Manage user profile and preferences
- Earn achievements and badges
- View question history and performance analytics
- Participate in daily challenges
- Compare scores with friends
- Save favorite questions for later practice

## Tech Stack

### Core Technologies

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: shadcn/ui with Radix UI primitives
- **Authentication**: Custom JWT implementation with refresh tokens
- **State Management**: React Hooks & Context API
- **HTTP Client**: Axios with custom interceptors
- **Form Handling**: Native React forms with custom validation
- **Icons**: Lucide React with custom icon components

### Development Tools

- **Package Manager**: npm
- **Code Quality**: ESLint with custom rules
- **Code Formatting**: Prettier
- **Git Hooks**: husky with lint-staged
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Next.js built-in compiler
- **Development Server**: Next.js development server

## Detailed Project Structure

```
├── public/                  # Static assets
│   ├── images/             # Image assets
│   └── fonts/              # Custom fonts
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── designer/       # Designer-specific pages
│   │   │   ├── questions/  # Question management
│   │   │   ├── categories/ # Category management
│   │   │   └── stats/     # Statistics and analytics
│   │   ├── player/        # Player-specific pages
│   │   │   ├── quiz/      # Quiz gameplay
│   │   │   ├── profile/   # User profile
│   │   │   └── stats/     # Player statistics
│   │   ├── login/         # Authentication pages
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── layout.tsx     # Root layout
│   │   └── globals.css    # Global styles
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI components
│   │   │   ├── button/   # Button components
│   │   │   ├── card/     # Card components
│   │   │   ├── dialog/   # Dialog components
│   │   │   ├── form/     # Form components
│   │   │   └── icons/    # Icon components
│   │   ├── features/     # Feature-specific components
│   │   │   ├── auth/     # Authentication components
│   │   │   ├── quiz/     # Quiz-related components
│   │   │   └── profile/  # Profile components
│   │   ├── layout/       # Layout components
│   │   ├── auth-provider.tsx # Authentication context
│   │   └── theme-provider.tsx # Theme context
│   ├── lib/              # Utility functions and helpers
│   │   ├── api/         # API client and endpoints
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Utility functions
│   │   └── constants/   # Constants and configurations
│   └── types/           # TypeScript type definitions
├── styles/              # Additional styles
│   └── tailwind/       # Tailwind configuration
├── config/             # Configuration files
│   ├── site.ts        # Site configuration
│   └── navigation.ts  # Navigation configuration
└── scripts/           # Build and utility scripts
```

## Component Architecture

### Core Components

#### Authentication Components

- `AuthProvider`: Manages authentication state and token handling
- `LoginForm`: Handles user login with validation
- `RegisterForm`: User registration with field validation
- `ProtectedRoute`: HOC for route protection

#### Quiz Components

- `QuestionCard`: Displays individual questions
- `QuizContainer`: Manages quiz state and progression
- `AnswerInput`: Handles user answer submission
- `Timer`: Countdown timer for timed quizzes
- `ScoreDisplay`: Shows current score and progress

#### UI Components

- `Button`: Custom button component with variants
- `Card`: Flexible card component for content display
- `Dialog`: Modal dialog for confirmations and forms
- `Toast`: Notification system
- `Tabs`: Tabbed interface component

## State Management

### Authentication State

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
```

### Quiz State

```typescript
interface QuizState {
  currentQuestion: Question;
  score: number;
  timeRemaining: number;
  answers: Answer[];
}
```

## API Integration

### Endpoints Structure

```typescript
const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
  },
  questions: {
    list: "/questions",
    create: "/questions/create",
    update: "/questions/:id",
    delete: "/questions/:id",
  },
  categories: {
    list: "/categories",
    create: "/categories/create",
    update: "/categories/:id",
    delete: "/categories/:id",
  },
  players: {
    profile: "/players/profile",
    stats: "/players/stats",
    leaderboard: "/players/leaderboard",
  },
};
```

## Environment Configuration

### Required Environment Variables

```bash
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_API_VERSION=v1

# Authentication
NEXT_PUBLIC_JWT_EXPIRY=3600
NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY=604800

# Feature Flags
NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## Build and Deployment

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Production

```bash
# Build production bundle
npm run build

# Start production server
npm start

# Analyze bundle size
npm run analyze
```

## Performance Optimization

### Implemented Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Static page generation where applicable
- API response caching
- Debounced API calls
- Optimized fonts loading
- Tailwind CSS purging

### Caching Strategy

- Static page caching
- API response caching
- Authentication token caching
- Quiz state persistence

## Security Measures

- JWT token rotation
- CSRF protection
- XSS prevention
- Rate limiting
- Input sanitization
- Secure HTTP headers
- Protected API routes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode guidelines
- Maintain component documentation
- Write unit tests for new features
- Follow the established code style
- Update README for significant changes

## Testing

### Unit Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- path/to/test
```

### E2E Testing

```bash
# Run Cypress tests
npm run cypress

# Open Cypress UI
npm run cypress:open
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- shadcn/ui for the beautiful UI components
- Radix UI for accessible primitives
- Next.js team for the amazing framework
- The open-source community for various tools and libraries
