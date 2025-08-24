# MMSH Logistics Management System - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Core Modules](#core-modules)
6. [API Integration](#api-integration)
7. [Real-time Communication](#real-time-communication)
8. [Authentication & Authorization](#authentication--authorization)
9. [UI Components & Design System](#ui-components--design-system)
10. [Data Management](#data-management)
11. [File Structure Analysis](#file-structure-analysis)
12. [Development Guidelines](#development-guidelines)

## Project Overview

**MMSH App** is a comprehensive logistics management web application built for managing transportation, freight, and company operations. The system provides end-to-end solutions for logistics companies including load management, HR operations, company administration, and real-time communication features.

### Key Features
- **Company Management**: Complete company registration, profile management, and organizational structure
- **Human Resources**: Employee onboarding, contract management, and face recognition integration
- **Load Management**: Freight booking, route planning, and shipment tracking
- **Real-time Communication**: Video calls, messaging, and live notifications
- **Document Management**: File uploads, document processing, and storage
- **Multi-language Support**: Internationalization with i18next
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Architecture

### Application Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Company   │  │     HR      │  │    Load     │        │
│  │ Management  │  │ Management  │  │ Management  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Real-time   │  │    Auth     │  │   Profile   │        │
│  │    Comm     │  │   System    │  │ Management  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                 Context Providers                          │
│  • ClientContext  • SignalRContext  • ModuleContexts      │
├─────────────────────────────────────────────────────────────┤
│                    API Layer                               │
│  • REST APIs  • SignalR Hubs  • File Upload               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend Services                             │
│  • MMSH API (http://mmsh.digital/api/)                     │
│  • SignalR Hub (MMSHHUB/Notification)                      │
│  • Document Storage & Processing                           │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns Used
- **Context Pattern**: For state management across components
- **Provider Pattern**: For dependency injection and service access
- **Factory Pattern**: For creating different types of components
- **Observer Pattern**: For real-time updates via SignalR
- **Compound Component Pattern**: For complex UI components

## Technology Stack

### Frontend Technologies
- **Framework**: Next.js 15.0.4 (App Router)
- **Language**: TypeScript 5.6.3
- **UI Library**: HeroUI v2.6.14 (Custom component library)
- **Styling**: Tailwind CSS 3.4.16 + Tailwind Variants
- **State Management**: React Context API + Custom Hooks
- **Animations**: Framer Motion 11.13.1
- **Icons**: Iconify React, React Icons, Lucide React

### Communication & Real-time Features
- **Real-time Communication**: Microsoft SignalR 8.0.7
- **Video Calls**: Simple-peer 9.11.1 (WebRTC)
- **HTTP Client**: Axios 1.7.9
- **Internationalization**: i18next 24.2.2 + react-i18next

### Media & File Processing
- **Image Processing**: react-image-crop, react-image-file-resizer
- **Face Detection**: face-api.js 0.22.2
- **OCR**: tesseract.js 6.0.1
- **PDF Processing**: pdfjs-dist 4.10.38
- **Camera Access**: react-webcam 7.2.0

### Form & Input Handling
- **Form Management**: react-hook-form 7.54.2
- **Phone Input**: react-international-phone, google-libphonenumber
- **File Upload**: react-dropzone 14.3.8
- **Date/Time**: moment 2.30.1, react-big-calendar

### Development Tools
- **Linting**: ESLint 8.57.0 + TypeScript ESLint
- **Code Formatting**: Prettier 3.3.3
- **Build Tool**: Next.js with Turbopack
- **Package Manager**: npm

## Project Structure

```
mmshweb/
├── app/                          # Next.js App Router
│   ├── (identity)/              # Authentication routes
│   ├── (welcome)/               # Public pages
│   ├── api/                     # API routes
│   ├── company/                 # Company management module
│   ├── hr/                      # Human resources module
│   ├── load/                    # Load management module
│   ├── shipping/                # Shipping operations
│   ├── main/                    # Dashboard/main app
│   ├── profile/                 # User profile management
│   ├── settings/                # Application settings
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # Global providers
├── components/                   # Reusable UI components
│   ├── identityComps/           # Authentication components
│   ├── image-tools/             # Image processing components
│   ├── load-management-components/
│   ├── main_components/         # Core UI components
│   ├── mini_components/         # Small utility components
│   └── table-components/        # Data table components
├── contexts/                    # React Context providers
│   ├── profile-management/      # User & client contexts
│   └── call-service-context.tsx # Video call context
├── types/                       # TypeScript type definitions
├── utils/                       # Utility functions
├── config/                      # Configuration files
├── data/                        # Static data
├── public/                      # Static assets
└── styles/                      # Global styles
```

## Core Modules

### 1. Company Management Module (`/app/company/`)

**Purpose**: Complete company lifecycle management including registration, profile management, and organizational structure.

**Key Components**:
- `page.tsx`: Main company listing with data table
- `create/`: Multi-step company creation wizard
- `components/company-table.tsx`: Advanced data table with filtering, sorting, pagination
- `contexts/`: Company-specific state management

**Features**:
- Multi-step company registration process
- Bank account management
- Document upload and verification
- Contact information management
- Company type classification
- Address management with map integration

**State Management**:
```typescript
interface Company {
  name: string;
  type: CompanyType | null;
  inn: string;
  contacts: Contact[];
  addresses: Address[];
  bankAccounts: Bank[];
}
```

### 2. Human Resources Module (`/app/hr/`)

**Purpose**: Employee management, onboarding, and contract administration with biometric verification.

**Key Components**:
- `create/employee-details.tsx`: Employee information form
- `create/hr-contract.tsx`: Contract management
- `contexts/hr-creation-context.tsx`: HR workflow state
- `utils/face-detect-utils.tsx`: Face recognition utilities

**Features**:
- Employee onboarding workflow
- Passport verification with OCR
- Face detection and matching
- Contract generation and signing
- Document management
- Biometric authentication

**Advanced Features**:
- Face API integration for identity verification
- Automatic passport data extraction
- Real-time face matching during onboarding
- Progress tracking for completion percentage

### 3. Load Management Module (`/app/load/`)

**Purpose**: Freight and shipment management including booking, routing, and tracking.

**Key Components**:
- `create/`: Multi-step load creation process
- `create/create-load-details.tsx`: Load specifications
- `create/create-route.tsx`: Route planning
- `create/required-trailer.tsx`: Equipment requirements
- `contexts/create-load-context.tsx`: Load creation state

**Features**:
- Load specification and requirements
- Route planning with waypoints
- Trailer and equipment matching
- Pricing and contact management
- Load visibility and status tracking
- Integration with mapping services

### 4. Real-time Communication System

**Components**:
- `contexts/call-service-context.tsx`: Video call management
- `app/videostream/videoCall.tsx`: Video call interface
- `contexts/profile-management/signalR-context.tsx`: Real-time messaging

**Features**:
- WebRTC-based video calling
- SignalR real-time notifications
- Peer-to-peer communication
- Call management and controls
- Online status tracking

### 5. Profile Management System

**Components**:
- `contexts/profile-management/client-context.tsx`: User session management
- `app/profile/`: User profile interface
- Authentication and authorization

**Features**:
- User session management
- Profile information management
- Image upload and processing
- Contact management
- Settings and preferences

## API Integration

### Base Configuration
```typescript
export const BaseAddressAPI = "http://mmsh.digital/api/";
export const BaseAddress = "http://mmsh.digital/";
```

### Key API Endpoints
- **Authentication**: `/Account/Init`
- **Company Management**: `/Company/Get`, `/Company/Create`, `/Company/CompanyTypes/Get`
- **Document Upload**: `/Document/Upload`, `/Document/UploadFiles`
- **Image Processing**: `/Img/Upload`, `/Img/Download`
- **SignalR Hub**: `/MMSHHUB/Notification`

### API Client Pattern
```typescript
const fetchClient = async (phone: string, clientId: string) => {
  const res = await fetch(BaseAddressAPI + "Account/Init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber: phone, clientId: clientId }),
  });
  // Handle response and state updates
};
```

## Real-time Communication

### SignalR Integration
```typescript
const connection = new HubConnectionBuilder()
  .withUrl(`${BaseAddress}${hubName}`, {
    accessTokenFactory: () => token
  })
  .withAutomaticReconnect()
  .configureLogging(LogLevel.Information)
  .build();
```

### WebRTC Video Calls
```typescript
const peer = new SimplePeer({ 
  initiator: true, 
  trickle: false 
});
```

**Features**:
- Automatic reconnection
- Token-based authentication
- Real-time notifications
- Online status tracking
- Video call signaling

## Authentication & Authorization

### Session Management
- Token-based authentication
- Local storage for session persistence
- Automatic session restoration
- Client information caching

### Security Features
- JWT token handling
- Secure API communication
- Session validation
- Protected routes

## UI Components & Design System

### HeroUI Integration
The application uses HeroUI as the primary component library, providing:
- Consistent design language
- Accessibility compliance
- Theme support (light/dark mode)
- Responsive components

### Key UI Patterns
- **Data Tables**: Advanced tables with sorting, filtering, pagination
- **Multi-step Forms**: Wizard-style interfaces for complex workflows
- **Modal Dialogs**: Overlay interfaces for focused tasks
- **Navigation**: Collapsible sidebar with role-based menu items
- **Progress Indicators**: Step-by-step progress tracking

### Theme Configuration
```typescript
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
```

## Data Management

### State Management Strategy
- **Global State**: React Context for cross-component data
- **Local State**: useState for component-specific data
- **Server State**: Direct API calls with loading states
- **Form State**: react-hook-form for complex forms

### Context Providers
```typescript
<ClientProvider>
  <SignalRProvider hubName="MMSHHUB/Notification">
    <CompanyProvider>
      <HRCreationProvider>
        {/* Application components */}
      </HRCreationProvider>
    </CompanyProvider>
  </SignalRProvider>
</ClientProvider>
```

### Data Flow
1. **API Calls**: Centralized in context providers
2. **State Updates**: Through context actions
3. **UI Updates**: Automatic re-rendering via React
4. **Real-time Updates**: SignalR event handlers

## File Structure Analysis

### Configuration Files
- `next.config.js`: Next.js configuration with standalone output
- `tailwind.config.js`: Tailwind CSS customization
- `tsconfig.json`: TypeScript compiler options
- `package.json`: Dependencies and scripts
- `.eslintrc.json`: Code quality rules

### Static Assets
- `public/`: Images, documents, and models
- `public/models/face-detector/`: Face recognition models
- `public/truck-images/`: Vehicle imagery
- `public/documents/`: Sample documents and certificates

### Styling
- `styles/globals.css`: Global CSS styles
- Tailwind utility classes throughout components
- HeroUI theme integration

## Development Guidelines

### Code Organization
- **Feature-based structure**: Each module in its own directory
- **Separation of concerns**: Components, contexts, and utilities separated
- **TypeScript usage**: Strong typing throughout the application
- **Custom hooks**: Reusable logic extraction

### Best Practices
- **Error Handling**: Try-catch blocks with user-friendly messages
- **Loading States**: UI feedback during async operations
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Code splitting and lazy loading

### Development Commands
```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting and fixing
```

### Deployment
- **Output**: Standalone mode for containerization
- **Docker**: Dockerfile included for containerized deployment
- **IIS**: web.config for Windows IIS deployment
- **Static Assets**: Optimized for CDN delivery

## Integration Points

### External Services
- **Yandex Maps API**: Location services and geocoding
- **Face API**: Biometric verification
- **SignalR**: Real-time communication
- **File Storage**: Document and image management

### Third-party Libraries
- **Google LibPhoneNumber**: Phone number validation
- **Moment.js**: Date/time manipulation
- **Tesseract.js**: OCR for document processing
- **ExifJS**: Image metadata extraction

## Security Considerations

### Data Protection
- Token-based authentication
- Secure API endpoints
- File upload validation
- Input sanitization

### Privacy Features
- Face recognition data handling
- Document encryption
- User consent management
- Data retention policies

## Performance Optimizations

### Frontend Optimizations
- Next.js App Router for optimal loading
- Image optimization and lazy loading
- Code splitting by route
- Turbopack for fast development builds

### Runtime Performance
- Context optimization to prevent unnecessary re-renders
- Memoization of expensive calculations
- Efficient data structures
- Debounced search and input handling

## Monitoring & Debugging

### Development Tools
- React Developer Tools integration
- TypeScript error checking
- ESLint code quality checks
- Browser debugging capabilities

### Production Monitoring
- Error boundary implementation
- Console logging for debugging
- Performance metrics tracking
- User feedback collection

---

This documentation provides a comprehensive overview of the MMSH Logistics Management System codebase. The application demonstrates modern web development practices with a focus on user experience, real-time communication, and comprehensive business logic for logistics operations.
