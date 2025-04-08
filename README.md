# Convex + React Query Todo App

A modern, reactive Todo application built with Convex as the backend and React Query for optimistic UI updates.

## Architecture

This application uses two powerful libraries together to create a seamless user experience:

### Convex

Convex is a reactive backend that provides:

- Real-time data synchronization
- Automatic reactivity (UI updates when data changes)
- Type-safe queries and mutations
- Transactional database operations

In this app, Convex is used for:
- Managing the database schema (`convex/schema.ts`)
- Defining backend functions for data operations (`convex/tasks.ts`)
- Providing real-time data through its reactive system
- Handling all data fetching and mutation operations

### React Query

React Query is typically used for data fetching, but in this application, we're using it in a specialized way:

- For optimistic UI updates (immediately showing changes before they're confirmed)
- Enhanced error handling with automatic rollbacks of optimistic updates
- Client-side state management for temporary data
- Managing optimistic UI state without relying on React's useState

## How They Work Together

The integration leverages the strengths of both libraries:

1. **Convex for Data Operations**: All data fetching and mutations are handled by Convex
2. **React Query for State Management Only**: React Query's cache is used to provide immediate visual feedback

When you add or toggle a task:
1. The task is immediately updated in the React Query cache for an instant UI update
2. The operation is sent to Convex in the background
3. If there's an error, React Query automatically reverts the optimistic update
4. When Convex confirms the change, the real-time subscription ensures data consistency

## Implementation Details

The TodoList component uses:

- `useQuery` from Convex for real-time data fetching
- `useMutation` from Convex for database operations
- React Query's `useQueryClient` for managing the optimistic updates cache
- `useRef` instead of `useState` for form inputs, reducing unnecessary re-renders

Key patterns implemented:

- Optimistic UI updates with proper error handling and rollbacks
- Try/catch/finally blocks to ensure proper cleanup
- Typescript typing for all operations and data structures
- Clean separation of concerns between data operations and UI state

## Getting Started

1. Clone the repository
2. Install dependencies: `bun install`
3. Configure Convex:
   - Run `bunx convex dev` to start the Convex development server
4. Start the application: `bun dev`

## File Structure

- `convex/schema.ts`: Database schema
- `convex/tasks.ts`: Backend functions for task operations
- `app/_components/todo-list.tsx`: Main Todo component with integrated Convex and React Query
- `app/page.tsx`: Page layout