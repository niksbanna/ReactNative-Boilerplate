# Architecture Overview

This document provides a detailed overview of the React Native Boilerplate architecture.

## Table of Contents

- [High-Level Architecture](#high-level-architecture)
- [Navigation Flow](#navigation-flow)
- [State Management](#state-management)
- [Data Flow with RTK Query](#data-flow-with-rtk-query)
- [Authentication Flow](#authentication-flow)
- [Component Architecture](#component-architecture)

## High-Level Architecture

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[Screens] --> B[Components]
        B --> C[UI Primitives]
    end
    
    subgraph "Business Logic Layer"
        D[Navigation] --> A
        E[Redux Store] --> A
        F[Custom Hooks] --> A
    end
    
    subgraph "Data Layer"
        G[RTK Query] --> E
        H[HTTP Client] --> G
        I[Storage Service] --> E
    end
    
    subgraph "External"
        J[API Server] --> H
        K[Secure Storage] --> I
    end
```

## Navigation Flow

### Root Navigator (Auth Gate)

The application uses a root navigator that implements an authentication gate pattern:

```mermaid
graph LR
    A[App Launch] --> B{Check Auth}
    B -->|Token Found| C[Main Navigator]
    B -->|No Token| D[Auth Navigator]
    
    D --> E[Login Screen]
    D --> F[Register Screen]
    D --> G[Forgot Password]
    
    C --> H[Home Tab]
    C --> I[Profile Tab]
    
    E -->|Success| C
    F -->|Success| C
    I -->|Logout| D
```

### Navigation Structure

```
RootNavigator
├── AuthNavigator (Stack)
│   ├── Login
│   ├── Register
│   └── ForgotPassword
└── MainNavigator (Tabs)
    ├── Home
    └── Profile
```

## State Management

### Redux Store Architecture

```mermaid
graph TB
    A[Redux Store] --> B[Auth Slice]
    A --> C[RTK Query API]
    
    B --> D[User State]
    B --> E[Authentication Status]
    
    C --> F[Posts API]
    C --> G[... Other APIs]
    
    F --> H[Cached Data]
    F --> I[Loading States]
    F --> J[Error States]
```

### State Structure

```typescript
{
  auth: {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean
  },
  postsApi: {
    queries: {
      'getPosts()': { data, status, error },
      'getPost(1)': { data, status, error }
    },
    mutations: {}
  }
}
```

## Data Flow with RTK Query

### Query Flow

```mermaid
sequenceDiagram
    participant C as Component
    participant H as Hook (useGetPostsQuery)
    participant Q as RTK Query
    participant A as Axios Client
    participant S as API Server
    
    C->>H: Call hook
    H->>Q: Check cache
    alt Cache hit
        Q-->>H: Return cached data
    else Cache miss
        Q->>A: Make HTTP request
        A->>S: GET /posts
        S-->>A: Response
        A-->>Q: Parsed data
        Q-->>H: Return fresh data
    end
    H-->>C: { data, isLoading, error }
```

### Mutation Flow

```mermaid
sequenceDiagram
    participant C as Component
    participant M as Mutation Hook
    participant Q as RTK Query
    participant A as Axios Client
    participant S as API Server
    
    C->>M: Call mutation
    M->>Q: Trigger mutation
    Q->>A: Make HTTP request
    A->>S: POST /posts
    S-->>A: Response
    A-->>Q: New data
    Q->>Q: Invalidate tags
    Q->>Q: Refetch affected queries
    Q-->>M: Success
    M-->>C: Updated data
```

## Authentication Flow

### Login Flow

```mermaid
sequenceDiagram
    participant U as User
    participant L as Login Screen
    participant S as Storage Service
    participant R as Redux Store
    participant N as Navigator
    
    U->>L: Enter credentials
    L->>L: Validate form (Zod)
    L->>S: API call (mock)
    S-->>L: Token + User data
    L->>S: Save to secure storage
    L->>R: Dispatch setUser
    R->>N: Update navigation state
    N-->>U: Navigate to Main
```

### Token Refresh Flow

```mermaid
sequenceDiagram
    participant A as API Request
    participant I as Interceptor
    participant S as Storage
    participant R as Refresh Endpoint
    
    A->>I: Request with expired token
    I->>I: Receive 401 response
    I->>S: Get refresh token
    I->>R: POST /refresh
    R-->>I: New access token
    I->>S: Save new token
    I->>A: Retry original request
    A-->>I: Success response
```

### Logout Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Profile Screen
    participant R as Redux Store
    participant S as Storage Service
    participant N as Navigator
    
    U->>P: Click logout
    P->>R: Dispatch logout()
    R->>S: Clear tokens
    R->>R: Reset user state
    R->>N: Update navigation state
    N-->>U: Navigate to Auth
```

## Component Architecture

### Component Hierarchy

```
App
├── Provider (Redux)
│   └── ThemeProvider
│       └── SafeAreaProvider
│           └── NavigationContainer
│               └── RootNavigator
│                   ├── AuthNavigator
│                   │   └── LoginScreen
│                   │       ├── Input (with react-hook-form)
│                   │       └── Button
│                   └── MainNavigator
│                       └── HomeScreen
│                           ├── Card
│                           └── Text
```

### Component Design Pattern

All UI components follow a consistent pattern:

```typescript
// Component receives theme from context
const Component = ({ prop1, prop2 }) => {
  const { theme } = useTheme();
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.colors.background }
    ]}>
      {/* Content */}
    </View>
  );
};
```

### Form Handling

Forms use react-hook-form with Zod validation:

```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema)
});
```

## HTTP Client Architecture

### Axios Interceptor Flow

```mermaid
graph LR
    A[Request] --> B[Request Interceptor]
    B --> C{Has Token?}
    C -->|Yes| D[Add Auth Header]
    C -->|No| E[Continue]
    D --> E
    E --> F[Make Request]
    F --> G[Response Interceptor]
    G --> H{Status?}
    H -->|401| I[Refresh Token]
    H -->|Success| J[Return Data]
    H -->|Error| K[Handle Error]
    I --> L{Success?}
    L -->|Yes| M[Retry Request]
    L -->|No| N[Logout]
```

### Request/Response Pipeline

1. **Request Phase**
   - Retrieve access token from storage
   - Inject Authorization header
   - Log request in development

2. **Response Phase**
   - Log response in development
   - Handle 401 errors (token refresh)
   - Return data or propagate error

## Theme System

### Theme Architecture

```mermaid
graph TB
    A[ThemeContext] --> B[Theme Provider]
    B --> C{Color Scheme}
    C -->|Light| D[Light Theme]
    C -->|Dark| E[Dark Theme]
    
    D --> F[Components]
    E --> F
    
    F --> G[useTheme Hook]
    G --> H[Access Theme Values]
```

### Theme Tokens

- **Colors**: Primary, secondary, background, text, etc.
- **Spacing**: xs, sm, md, lg, xl, xxl
- **Typography**: Font sizes, weights, line heights
- **Border Radius**: sm, md, lg, xl, full
- **Shadows**: sm, md, lg

## Testing Architecture

### Test Structure

```
Component/Feature
├── Component.tsx
├── Component.test.tsx (Unit tests)
├── Component.stories.tsx (Storybook)
└── __integration__/
    └── Feature.test.tsx (Integration tests)
```

### Testing Layers

1. **Unit Tests**: Individual components and functions
2. **Integration Tests**: Component interactions and flows
3. **E2E Tests**: (Not included, but can be added)

## Security Considerations

### Token Storage

- Uses expo-secure-store for encrypted storage
- Tokens never stored in AsyncStorage or plain text
- Refresh token flow placeholder included

### API Security

- HTTPS only in production
- Request signing (can be added)
- Rate limiting (server-side)

### Input Validation

- Client-side validation with Zod
- Server-side validation required
- XSS prevention via React's built-in escaping

## Performance Optimizations

### React Optimizations

- Functional components with hooks
- React.memo for expensive components
- useCallback for event handlers
- useMemo for computed values

### Data Fetching

- RTK Query automatic caching
- Optimistic updates for mutations
- Background refetching
- Cache invalidation strategies

### Bundle Size

- Tree shaking enabled
- Code splitting (can be added)
- Image optimization
- Font subsetting

## Scalability Considerations

### Adding New Features

1. Create feature folder under `app/features/`
2. Add RTK Query service if needed
3. Create screens and components
4. Add navigation routes
5. Write tests

### Adding New API Endpoints

1. Define types in `app/types/`
2. Add endpoints to RTK Query service
3. Use hooks in components
4. Handle loading and error states

### Environment-Specific Config

- `.env.development`
- `.env.staging`
- `.env.production`

Each environment can have different:
- API base URLs
- Feature flags
- Analytics keys
- Logging levels
