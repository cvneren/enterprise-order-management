<p align="center">
  <img src="preview.gif" alt="Enterprise Dashboard Preview" width="100%" />
</p>

# Enterprise Coffee Wholesale Order Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/status-Production_Ready-success?style=flat-square" alt="Status" />
</p>

<p align="center">
  <a href="https://enterprise-order-management.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/View_Live_Demo-0070f3?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

## Problem Statement & Business Value

B2B wholesale operations require managing dense datasets, live inventory levels, and complex order statuses. Legacy tools often rely on desktop-bound, rigid table interfaces that severely degrade the user experience for warehouse operators and field representatives operating on mobile devices.

This project implements a production-grade, responsive dashboard that solves these constraints. It guarantees data density on desktop viewports while providing a strictly optimized mobile experience, ensuring operators can execute bulk actions, monitor inventory, and process orders without UI friction or layout breakage.

## Architectural Decisions

The application is built on Next.js 16 (App Router) and TypeScript, enforcing strict type safety across the domain logic.

**Responsive Layout & Touch Optimization**
The architecture employs a mobile-first strategy. Complex structures like data tables degrade into vertical card lists below the `md` breakpoint. CSS Grid with `auto-fill` and `minmax` is utilized to ensure fluid reflowing across viewports, eliminating arbitrary column count constraints. Interactive elements explicitly enforce a 44x44px minimum touch target area to comply with Apple HIG and Material Design standards.

**State Management**
Zustand is leveraged for both global business data and atomic UI state. By isolating the mobile drawer and navigation state into a dedicated `useUIStore.ts`, the application prevents unnecessary React reconciliation cycles across the broader component tree during context switching.

**Hardware-Accelerated UI**
Complex interactive states, such as mobile side-drawers and bulk selection headers, are managed via CSS transforms (`translate-x`) and Framer Motion. This prevents layout shifts (CLS) and utilizes GPU acceleration to maintain a consistent 60fps render path, even on low-tier mobile devices.

**Data Grid Operations**
Desktop viewports utilize TanStack Table v8 for headless, high-performance data manipulation, supporting global fuzzy search, column-specific status filtering, and multi-directional sorting without coupling the business logic to the DOM representation.

## Local Development

### Prerequisites
- Node.js 18.17 or later
- npm or pnpm

### Installation

Clone the repository and navigate to the application directory:

```bash
git clone <repository-url>
cd enterprise-order-management/application_repo
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Testing

The application includes a Vitest test suite targeting global state containers and complex DOM interactions.

```bash
# Execute unit tests
npm run test

# Generate coverage report
npm run test:coverage
```
