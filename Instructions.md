# NerdPOS Frontend Instructions

## Project Setup

This project is built with **React 18**, **Vite**, **TypeScript**, and **Tailwind CSS**.

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

Build the project for production:

```bash
npm run build
```

The output will be in the `dist` directory.

### Project Structure

Structure follows a strict feature-first architecture:

-   `src/components`: Shared atomic UI components.
-   `src/features`: Feature-specific logic (e.g., `sales-pos`, `auth`).
-   `src/lib`: Core libraries configurations (Axios, Utils).
-   `src/services`: Shared API services.
