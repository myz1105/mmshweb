# Development Guidelines - MMSH Project

This document provides guidelines for developing within the restructured MMSH Logistics Management System.

## 📁 Directory Structure Guidelines

### Feature-Based Organization

When creating new features, follow this structure:

```
src/features/[feature-name]/
├── components/           # Feature-specific components
│   ├── [ComponentName]/
│   │   ├── index.tsx    # Main component
│   │   ├── types.ts     # Component-specific types
│   │   └── styles.css   # Component styles (if needed)
│   └── index.ts         # Barrel export
├── hooks/               # Feature-specific hooks
│   ├── use[FeatureName].ts
│   └── index.ts
├── contexts/            # Feature-specific contexts
│   ├── [FeatureName]Context.tsx
│   └── index.ts
├── services/            # Feature-specific API calls
│   ├── [featureName]Service.ts
│   └── index.ts
├── types/               # Feature-specific types
│   ├── [featureName].ts
│   └── index.ts
├── utils/               # Feature-specific utilities
│   ├── [featureName]Utils.ts
│   └── index.ts
└── index.ts             # Feature barrel export
```

### Shared Components Organization

```
src/components/[category]/
├── [ComponentName]/
│   ├── index.tsx        # Main component
│   ├── [ComponentName].stories.tsx  # Storybook stories
│   ├── [ComponentName].test.tsx     # Unit tests
│   ├── types.ts         # Component types
│   └── README.md        # Component documentation
└── index.ts             # Category barrel export
```

## 🎯 Naming Conventions

### Files and Directories
- **Components**: PascalCase (`Button.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase starting with "use" (`useAuth.ts`, `useCompanyData.ts`)
- **Contexts**: PascalCase ending with "Context" (`AuthContext.tsx`, `CompanyContext.tsx`)
- **Services**: camelCase ending with "Service" (`authService.ts`, `companyService.ts`)
- **Types**: camelCase for files, PascalCase for interfaces (`userTypes.ts`, `interface User`)
- **Utils**: camelCase ending with "Utils" (`dateUtils.ts`, `validationUtils.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`, `ERROR_MESSAGES.ts`)

### Variables and Functions
- **Variables**: camelCase (`userName`, `companyData`)
- **Functions**: camelCase (`fetchUserData`, `validateForm`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_FILE_SIZE`)
- **Interfaces**: PascalCase (`User`, `CompanyData`, `ApiResponse`)
- **Types**: PascalCase (`UserRole`, `LoadStatus`)

## 🔧 Import Guidelines

### Import Order
1. React and Next.js imports
2. Third-party library imports
3. Internal imports (using path mappings)
4. Relative imports (avoid when possible)

```typescript
// ✅ Good
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Button } from '@heroui/react';
import axios from 'axios';

import { apiClient } from '@/services/api';
import { useAuth } from '@/hooks';
import { User } from '@/types';
import { formatDate } from '@/utils';

// ❌ Avoid relative imports when possible
import { SomeComponent } from '../../../components/SomeComponent';
```

### Path Mappings Usage
Always use path mappings instead of relative imports:

```typescript
// ✅ Good
import { Button } from '@/components/ui';
import { useCompany } from '@/features/company';
import { authService } from '@/services/api';

// ❌ Bad
import { Button } from '../../../src/components/ui/Button';
import { useCompany } from '../../features/company/hooks/useCompany';
```

## 🏗️ Component Development

### Component Structure
```typescript
// ComponentName/index.tsx
import React from 'react';
import { ComponentNameProps } from './types';

/**
 * ComponentName - Brief description
 * @param props - Component props
 * @returns JSX.Element
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2,
  ...props
}) => {
  // Component logic here
  
  return (
    <div {...props}>
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### Props Interface
```typescript
// ComponentName/types.ts
export interface ComponentNameProps {
  /** Required prop description */
  requiredProp: string;
  /** Optional prop description */
  optionalProp?: number;
  /** Event handler description */
  onAction?: (value: string) => void;
  /** Children elements */
  children?: React.ReactNode;
}
```

### Barrel Exports
```typescript
// ComponentName/index.ts
export { ComponentName as default } from './ComponentName';
export type { ComponentNameProps } from './types';
```

## 🎣 Custom Hooks

### Hook Structure
```typescript
// hooks/useFeatureName.ts
import { useState, useEffect } from 'react';
import { featureService } from '@/services/api';
import { FeatureData } from '@/types';

export interface UseFeatureNameReturn {
  data: FeatureData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFeatureName = (id: string): UseFeatureNameReturn => {
  const [data, setData] = useState<FeatureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await featureService.getData(id);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
```

## 🌐 Service Development

### API Service Structure
```typescript
// services/api/featureService.ts
import { apiClient, ApiResponse } from './client';

export interface FeatureData {
  id: string;
  name: string;
  // ... other properties
}

export interface CreateFeatureRequest {
  name: string;
  // ... other properties
}

// Get all features
export const getFeatures = async (): Promise<ApiResponse<FeatureData[]>> => {
  return apiClient<FeatureData[]>('Feature/Get');
};

// Get feature by ID
export const getFeatureById = async (id: string): Promise<ApiResponse<FeatureData>> => {
  return apiClient<FeatureData>(`Feature/Get/${id}`);
};

// Create new feature
export const createFeature = async (
  data: CreateFeatureRequest
): Promise<ApiResponse<FeatureData>> => {
  return apiClient<FeatureData>('Feature/Create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Update feature
export const updateFeature = async (
  id: string,
  data: Partial<CreateFeatureRequest>
): Promise<ApiResponse<FeatureData>> => {
  return apiClient<FeatureData>(`Feature/Update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// Delete feature
export const deleteFeature = async (id: string): Promise<ApiResponse<void>> => {
  return apiClient<void>(`Feature/Delete/${id}`, {
    method: 'DELETE',
  });
};
```

## 🔄 Context Development

### Context Structure
```typescript
// contexts/FeatureContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// State interface
interface FeatureState {
  data: FeatureData[];
  loading: boolean;
  error: string | null;
}

// Action types
type FeatureAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: FeatureData[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_ITEM'; payload: FeatureData }
  | { type: 'UPDATE_ITEM'; payload: FeatureData }
  | { type: 'REMOVE_ITEM'; payload: string };

// Context interface
interface FeatureContextType {
  state: FeatureState;
  actions: {
    setLoading: (loading: boolean) => void;
    setData: (data: FeatureData[]) => void;
    setError: (error: string | null) => void;
    addItem: (item: FeatureData) => void;
    updateItem: (item: FeatureData) => void;
    removeItem: (id: string) => void;
  };
}

// Initial state
const initialState: FeatureState = {
  data: [],
  loading: false,
  error: null,
};

// Reducer
const featureReducer = (state: FeatureState, action: FeatureAction): FeatureState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_ITEM':
      return { ...state, data: [...state.data, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        data: state.data.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Context
const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

// Provider
export const FeatureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(featureReducer, initialState);

  const actions = {
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setData: (data: FeatureData[]) => dispatch({ type: 'SET_DATA', payload: data }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
    addItem: (item: FeatureData) => dispatch({ type: 'ADD_ITEM', payload: item }),
    updateItem: (item: FeatureData) => dispatch({ type: 'UPDATE_ITEM', payload: item }),
    removeItem: (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
  };

  return (
    <FeatureContext.Provider value={{ state, actions }}>
      {children}
    </FeatureContext.Provider>
  );
};

// Hook
export const useFeature = (): FeatureContextType => {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeature must be used within a FeatureProvider');
  }
  return context;
};
```

## 🧪 Testing Guidelines

### Component Testing
```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName requiredProp="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const mockHandler = jest.fn();
    render(<ComponentName requiredProp="test" onAction={mockHandler} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalledWith('expected-value');
  });
});
```

### Hook Testing
```typescript
// useFeatureName.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useFeatureName } from './useFeatureName';

// Mock the service
jest.mock('@/services/api', () => ({
  featureService: {
    getData: jest.fn(),
  },
}));

describe('useFeatureName', () => {
  it('fetches data successfully', async () => {
    const mockData = { id: '1', name: 'Test' };
    (featureService.getData as jest.Mock).mockResolvedValue({
      success: true,
      data: mockData,
    });

    const { result } = renderHook(() => useFeatureName('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
});
```

## 📝 Documentation Guidelines

### Component Documentation
```typescript
/**
 * Button component for user interactions
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => {
  // Component implementation
};
```

### README for Components
```markdown
# ComponentName

Brief description of what the component does.

## Usage

```tsx
import { ComponentName } from '@/components/ui';

function MyComponent() {
  return (
    <ComponentName
      requiredProp="value"
      optionalProp={42}
      onAction={handleAction}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| requiredProp | string | Yes | Description of required prop |
| optionalProp | number | No | Description of optional prop |
| onAction | function | No | Callback when action occurs |

## Examples

### Basic Usage
[Example code]

### Advanced Usage
[Example code]
```

## 🚀 Performance Guidelines

### Component Optimization
- Use `React.memo` for components that receive stable props
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to child components
- Avoid creating objects/arrays in render

### Context Optimization
- Split contexts by concern to avoid unnecessary re-renders
- Use multiple contexts instead of one large context
- Memoize context values

### Bundle Optimization
- Use dynamic imports for large components
- Implement code splitting at route level
- Optimize images and assets

## 🔒 Security Guidelines

### Input Validation
- Validate all user inputs
- Sanitize data before displaying
- Use TypeScript for type safety

### API Security
- Never expose sensitive data in client-side code
- Use proper authentication tokens
- Implement proper error handling without exposing internal details

## 📋 Code Review Checklist

### Before Submitting PR
- [ ] Code follows naming conventions
- [ ] Components are properly typed
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] No console.log statements in production code
- [ ] Error handling is implemented
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met

### Review Criteria
- [ ] Code is readable and maintainable
- [ ] Proper separation of concerns
- [ ] Consistent with project architecture
- [ ] No code duplication
- [ ] Proper error handling
- [ ] Security considerations addressed

---

Following these guidelines will ensure consistency, maintainability, and quality across the MMSH project codebase.
