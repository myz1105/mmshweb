# MMSH Logistics Management System

A comprehensive logistics management web application built with Next.js, providing end-to-end solutions for transportation, freight, and company operations.

## 🚀 Features

- **Company Management**: Complete company registration, profile management, and organizational structure
- **Human Resources**: Employee onboarding, contract management, and face recognition integration
- **Load Management**: Freight booking, route planning, and shipment tracking
- **Real-time Communication**: Video calls, messaging, and live notifications
- **Document Management**: File uploads, document processing, and storage
- **Multi-language Support**: Internationalization with i18next
- **Responsive Design**: Mobile-first approach with adaptive layouts

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 15.0.4 (App Router)
- **Language**: TypeScript 5.6.3
- **UI Library**: HeroUI v2.6.14
- **Styling**: Tailwind CSS 3.4.16
- **State Management**: React Context API + Custom Hooks
- **Real-time**: Microsoft SignalR 8.0.7
- **Video Calls**: Simple-peer 9.11.1 (WebRTC)

### Project Structure

```
mmshweb/
├── app/                          # Next.js App Router
│   ├── (identity)/              # Authentication routes
│   ├── (welcome)/               # Public pages
│   ├── api/                     # API routes
│   ├── company/                 # Company management
│   ├── hr/                      # Human resources
│   ├── logistics/               # Unified logistics management
│   │   ├── loads/              # Load management (formerly load/)
│   │   ├── settings/           # Load settings (formerly Load_management/)
│   │   └── management/         # General logistics management
│   ├── shipping/                # Shipping operations
│   ├── main/                    # Dashboard
│   ├── profile/                 # User profile
│   ├── settings/                # App settings
│   ├── partner/                 # Partner management
│   ├── truck/                   # Truck management
│   └── videostream/             # Video calling
├── src/                         # Organized source code
│   ├── components/              # Shared UI components
│   │   ├── ui/                 # Basic UI components
│   │   ├── forms/              # Form components
│   │   ├── tables/             # Data table components
│   │   ├── media/              # Image/video components
│   │   └── layout/             # Layout components
│   ├── features/                # Feature-specific components
│   │   ├── auth/               # Authentication components
│   │   ├── company/            # Company-specific components
│   │   ├── hr/                 # HR-specific components
│   │   ├── logistics/          # Logistics components
│   │   └── communication/      # Communication components
│   ├── services/                # API and external services
│   │   ├── api/                # REST API services
│   │   ├── realtime/           # SignalR services
│   │   └── storage/            # Storage services
│   ├── hooks/                   # Custom React hooks
│   ├── contexts/                # React contexts
│   │   ├── global/             # Global contexts
│   │   └── features/           # Feature-specific contexts
│   ├── utils/                   # Utility functions
│   ├── types/                   # TypeScript definitions
│   └── constants/               # Application constants
├── components/                   # Legacy components (being migrated)
├── contexts/                     # Legacy contexts (being migrated)
├── types/                        # Legacy types (being migrated)
├── utils/                        # Legacy utils (being migrated)
├── config/                       # Configuration files
├── data/                         # Static data
├── public/                       # Static assets
└── styles/                       # Global styles
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mmshweb

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting and fixing
```

### Path Mappings

The project uses TypeScript path mappings for clean imports:

```typescript
// Instead of relative imports
import { Button } from '../../../src/components/ui/Button'

// Use absolute imports
import { Button } from '@/components/ui/Button'
```

Available path mappings:
- `@/components/*` → `src/components/*`
- `@/features/*` → `src/features/*`
- `@/services/*` → `src/services/*`
- `@/hooks/*` → `src/hooks/*`
- `@/contexts/*` → `src/contexts/*`
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`
- `@/constants/*` → `src/constants/*`

## 📁 Feature Modules

### Company Management (`/app/company/`)
- Multi-step company registration
- Bank account management
- Document upload and verification
- Contact information management

### Human Resources (`/app/hr/`)
- Employee onboarding workflow
- Passport verification with OCR
- Face detection and matching
- Contract generation and signing

### Logistics (`/app/logistics/`)
- **Loads**: Freight booking and management
- **Settings**: Load and truck pack configurations
- **Management**: General logistics operations

### Real-time Communication
- WebRTC-based video calling
- SignalR real-time notifications
- Peer-to-peer communication

## 🔧 Services Architecture

### API Services (`src/services/api/`)

Centralized API management with consistent error handling:

```typescript
import { apiClient, createCompany } from '@/services/api'

// Using the centralized API client
const response = await createCompany(companyData)
if (response.success) {
  // Handle success
} else {
  // Handle error with response.message
}
```

### Real-time Services (`src/services/realtime/`)

SignalR integration for real-time features:

```typescript
import { signalRService, subscribeToNotifications } from '@/services/realtime/signalr'

// Subscribe to real-time notifications
subscribeToNotifications((notification) => {
  console.log('New notification:', notification)
})
```

## 🎨 UI Components

### Shared Components (`src/components/`)
- **UI**: Basic components (buttons, inputs, modals)
- **Forms**: Form-related components
- **Tables**: Data table components with sorting/filtering
- **Media**: Image/video processing components
- **Layout**: Navigation, sidebar, footer components

### Feature Components (`src/features/`)
- Feature-specific components organized by domain
- Consistent internal structure across features
- Clear separation of concerns

## 🔄 Migration Status

The project is currently undergoing restructuring:

### ✅ Completed
- [x] Consolidated duplicate directories (`load/` + `Load_management/` → `logistics/`)
- [x] Removed test components from production
- [x] Created organized `src/` directory structure
- [x] Implemented centralized service layer
- [x] Set up TypeScript path mappings
- [x] Moved legacy components to organized structure

### 🔄 In Progress
- [ ] Complete component migration to new structure
- [ ] Update all import statements
- [ ] Optimize context providers
- [ ] Create development guidelines

### 📋 Pending
- [ ] Update ESLint configuration
- [ ] Create component templates
- [ ] Implement consistent hooks pattern
- [ ] Complete documentation

## 🚀 Deployment

### Docker
```bash
# Build Docker image
docker build -t mmsh-web .

# Run container
docker run -p 3000:3000 mmsh-web
```

### IIS (Windows)
The project includes `web.config` for IIS deployment.

### Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_API_BASE_URL=http://mmsh.digital/api/
NEXT_PUBLIC_SIGNALR_HUB=MMSHHUB/Notification
```

## 🤝 Contributing

### Development Guidelines

1. **Feature Development**: Create new features in `src/features/`
2. **Shared Components**: Add reusable components to `src/components/`
3. **API Integration**: Use centralized services from `src/services/`
4. **Type Safety**: Define types in `src/types/`
5. **Consistent Naming**: Follow established naming conventions

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Implement proper error handling
- Add JSDoc comments for complex functions

### Testing
- Write unit tests for utility functions
- Test components with React Testing Library
- Integration tests for API services
- E2E tests for critical user flows

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the technical documentation

---

**Note**: This project is actively being restructured for better maintainability and developer experience. Some legacy paths may still exist during the migration period.
