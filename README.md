# Knight Nakanishi Fitness - Lead Generation Funnel

A high-converting lead generation funnel for Knight Nakanishi Fitness, designed to help Southeast Asians transform their bodies while maintaining their cultural food traditions.

## Overview

This funnel captures leads through a personalized form, instantly delivers a free guide on losing weight while eating Southeast Asian cultural foods, and then encourages prospects to book an implementation call with Knight for personalized coaching.

## Key Features

- **Lead Capture Form**: Collects name, email, phone (optional), and primary goal
- **Dynamic Personalization**: Routes all prospects to the same guide but personalizes copy based on their selected goal:
  - Fat loss while eating cultural foods
  - Building muscle without spending hours in the gym
  - Creating sustainable habits that stick
- **Instant Lead Magnet Delivery**: Guide is sent immediately upon form submission
- **Implementation Call CTA**: Capitalizes on momentum to book personalized coaching calls
- **Mobile Optimized**: Fully responsive design for all devices

## Technology Stack

- **Vite** - Build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```sh
# Build the project
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── HeroSection.tsx      # Main hero section with VSL placeholder
│   ├── LeadCaptureForm.tsx  # Lead capture form with instant delivery
│   ├── AuthoritySection.tsx  # Credibility and authority building
│   ├── StorySection.tsx      # Knight's personal story
│   ├── PainPointsSection.tsx # Addresses common pain points
│   ├── FinalCTASection.tsx   # Final call-to-action
│   └── Footer.tsx           # Site footer
├── pages/               # Page components
│   ├── Index.tsx            # Main landing page
│   ├── FatLossFormula.tsx   # Lead magnet page (personalized by goal)
│   └── NotFound.tsx        # 404 page
└── lib/                 # Utility functions
```

## Lead Magnet Delivery

The `sendLeadMagnet()` function in `LeadCaptureForm.tsx` is currently a placeholder. To implement:

1. Integrate with your email service (SendGrid, Mailchimp, etc.)
2. Attach or link to the guide PDF/document
3. Personalize email content based on the selected goal
4. Handle delivery confirmation and errors

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **Cloudflare Pages**: Connect repository for automatic builds
- **Traditional hosting**: Upload the `dist` folder contents to your web server

## Customization

### Updating Copy

All copy variations are located in `src/pages/FatLossFormula.tsx` in the `copyVariations` object. Edit the copy for each goal type (fat-loss, muscle-building, sustainable-habits) to match your messaging.

### Styling

The project uses Tailwind CSS with custom theme variables defined in `src/index.css`. Update the CSS variables to match your brand colors.

## License

Private project for Knight Nakanishi Fitness.
