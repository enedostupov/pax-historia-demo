# Alternate History Simulator

**Live Demo:** https://pax-historia-demo.vercel.app

Rewrite history. Make the call. Face the consequences.

## What I Built

An interactive alternate history game featuring the Cuban Missile Crisis (1962). Players navigate three critical decisions that dynamically affect national metrics and lead to multiple possible outcomes.

### Features
- **Sequential decision-making** with meaningful tradeoffs
- **Dynamic metrics system** (stability, economy, military)
- **Multiple endings** based on player choices
- **Historical comparisons** showing how outcomes differ from reality

### Technical Highlights
- Next.js 14 with TypeScript (strict mode)
- Declarative data model (JSON-compatible for easy backend integration)
- Stateless architecture using URL params
- Mobile-responsive design with Tailwind CSS

## Design Decisions

**One scenario, deeply polished** - I chose to focus on one high-quality scenario rather than multiple rushed ones. This demonstrates product thinking over feature quantity.

**Declarative data structure** - All scenario data uses a declarative, type-safe format that's ready to migrate to a database when scaling.

**URL-based state management** - Metrics are passed via URL params, making the app stateless and easy to share specific game states.

## Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Future Enhancements

With more time, I'd add:
- Additional historical scenarios (Berlin Crisis, Bay of Pigs)
- User accounts and save states
- Social sharing of results
- Admin panel for non-technical scenario creation

---
