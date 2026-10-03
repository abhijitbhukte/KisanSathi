# Design Brief

**Farmer Brain** — AI-powered AgTech dashboard + farmer-friendly Welcome landing. Organic modern aesthetic with forest green authority, cream warmth, and split-screen entry point. Trustworthy, professional, farmer-accessible.

## Tone & Purpose

Professional agriculture tech platform balancing accessibility with data-forward design. Welcome landing introduces app with striking split-screen imagery + form. Clean, modern, intentional — no decorative frills.

## Color Palette

| Token | OKLCH | Purpose |
| --- | --- | --- |
| **Primary** | 0.42 0.08 143 (forest green) | Authority, trust, farming identity, login button |
| **Secondary** | 0.70 0.14 60 (harvest amber) | Growth, warmth, seasonal action |
| **Accent** | 0.65 0.12 255 (water blue) | Irrigation, moisture, language selector |
| **Neutral** | 0.97 0.02 70 (cream) | Background, approachable, soft |
| **Success** | 0.75 0.18 130 (lime green) | Healthy crops, positive action |
| **Destructive** | 0.55 0.22 25 (red) | Warnings, alerts, risk |

## Typography

| Role | Font | Use Case |
| --- | --- | --- |
| Display | Space Grotesk, 400 | Hero headlines, welcome tagline, strong emphasis |
| Body | General Sans, 400 | Form labels, buttons, content, data |
| Mono | JetBrains Mono, 400 | Metrics, codes, precise numbers |

## Elevation & Depth

Login card elevated with shadow-card; farming imagery background sets context. Main content area and cards layered via subtle shadows and 1px borders.

## Structural Zones

| Zone | Background | Elevation | Border | Purpose |
| --- | --- | --- | --- | --- |
| Welcome Header | None (full-bleed) | None | None | Entry point, farming imagery context |
| Login Card | Card (white) | shadow-elevation | border-subtle | Form container, elevated above background |
| Dashboard Header | Primary (forest green) | shadow-elevation | None | Global navigation post-login |
| Sidebar | Sidebar (cream) | None | sidebar-border | Tab navigation with icons |
| Main Content | Background (cream) | None | None | Primary data area |
| Card Layer | Card (white) | shadow-card | border | Data containers, consistent rhythm |

## Shape Language

- **Corner radius**: 16px (rounded-2xl) for cards, buttons, inputs; modern, farmer-friendly
- **Spacing**: 1rem base grid; 1.5rem for card padding; 0.5rem for component density
- **Borders**: 1px, subtle (0.88 0.02 70) on cards and inputs; reinforces structure without harshness
- **Button style**: Solid primary (green) for main actions; secondary/ghost for alternatives; full-width on mobile

## Component Patterns

- **Buttons**: Solid primary (forest green) for Login; ghost/secondary for Guest Demo; rounded-2xl corners
- **Cards**: White background, subtle border, shadow-elevation for layering; welcome card is focal point
- **Forms**: Input fields with cream background; green focus ring; phone number + password fields
- **Language Selector**: Dropdown with accent blue (water blue) for active state
- **Icons**: Lucide-react for UI navigation; farming imagery as hero visual
- **Data Display**: Charts using chart palette (lime, amber, blue, red, forest green)

## Motion & Interaction

- **Default transition**: smooth 0.3s cubic-bezier (all interactive elements)
- **Hover states**: +10% opacity on backgrounds; green accent for primary actions
- **Focus ring**: Primary color, 2px, visible on keyboard nav
- **Welcome entrance**: Fade-in welcome card with slight scale (confidence)
- **Mobile**: Collapsible sidebar post-login; bottom tab nav on small screens; stacked form on mobile entry

## Mobile-First Approach

- **sm (640px)**: Stack welcome (image above, form below); sidebar bottom nav
- **md (768px)**: Split-screen begins for welcome; full nav
- **lg (1024px)**: Side-by-side welcome layout; full dashboard with sidebar + content
- **xl (1280px)**: Expanded welcome imagery; multi-column dashboard layouts

## Constraints & Signature Detail

**Anti-patterns**: No decorative gradients; no neon shadows; no rainbows. Green palette is distinctive yet professional. Form fields maintain high contrast for accessibility.

**Signature**: Forest green sidebar + cream background + white login card create visual identity distinct from generic AgTech dashboards. Farming imagery on welcome sets emotional context. Space Grotesk display headlines add modern, geometric precision.

