# Snippet Frontend

This is a [Next.js](https://nextjs.org) project dealing with code snippets management, built with TypeScript, Tailwind CSS, and Context API for state management.

## Getting Started

### Prerequisites

- Node.js installed
- Backend API running (default: `http://localhost:5000/api/v1/`)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    - Copy `.env.local.example` (if exists) or create `.env.local`:
      ```env
      NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1/
      ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `(protected)`: Routes requiring authentication.
    - `admin`: Admin-only routes.
- `components/`: Reusable UI components.
- `context/`: React Context (AuthContext).
- `lib/`: Utility functions (Axios instance).

## Key Features

- **Authentication**: JWT-based auth with automatic token handling and safe decoding.
- **Role-Based Access Control**: Protected routes for admins and moderators.
- **Styling**: Tailwind CSS v4.
- **Code Quality**: Prettier configured for consistent formatting.

## Scripts

- `npm run dev`: Start dev server.
- `npm run build`: Build for production.
- `npm run start`: Start production server.
- `npm run lint`: Run ESLint.
- `npx prettier --write .`: Format code.
