# 🥭 Mango Markets

An AI-first market intelligence app for stocks and crypto. Users don't open it to check prices — they open it to **understand markets**.

## Philosophy

**Data → AI → UI** — every screen leads with AI insight, not raw numbers. Prices are supporting evidence for AI conclusions.

## Features

- **Segment-based dashboard** — switch between Stocks and Crypto with a single tap
- **Sub-index navigation** — drill into S&P 500, NASDAQ, Russell (stocks) or BTC, ETH, SOL (crypto). The entire dashboard adapts: chart, watchlist, sentiment, heatmap
- **AI-powered watchlist** — every ticker shows a one-liner explaining *why* it's moving
- **Detail popup with AI insight** — tap any item to see an AI analysis card before the numbers
- **Market sentiment gauge** — Fear & Greed index per sub-index with AI interpretation
- **Sentiment heatmap** — visual grid showing bullish/bearish intensity across tickers
- **AI Intelligence card** — contextual market narrative that changes with the selected index
- **Mini bar charts** — sparkline-style charts on overview cards
- **Mango Pro** — premium tier teaser with coming-soon features

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native 0.76.9 |
| Language | TypeScript 5.0 |
| Navigation | React Navigation 6 (Bottom Tabs) |
| Safe Area | react-native-safe-area-context |
| Icons | react-native-svg (custom SVG icons) |
| Gradients | react-native-linear-gradient |
| Animations | React Native Animated API |

## Project Structure

```
src/
├── App.tsx                          # Root with SafeAreaProvider + NavigationContainer
├── components/
│   ├── DetailPopup.tsx              # Reusable popup with AI insight, zoom animation
│   └── icons/index.tsx              # Custom SVG icon components
├── navigation/
│   └── BottomTabNavigator.tsx       # Bottom tabs: Home, News, AI
├── screens/
│   ├── HomeScreen.tsx               # Main dashboard with segments + sub-indices
│   ├── NewsScreen.tsx               # Neural feed with AI-curated articles
│   ├── AIChatScreen.tsx             # AI chat interface
│   ├── PortfolioScreen.tsx          # Portfolio overview
│   └── SplashScreen.tsx             # Launch screen
└── theme/
    ├── colors.ts                    # Colors, Spacing, FontSize, BorderRadius
    └── index.ts                     # Theme exports
```

## Getting Started

### Prerequisites

- Node.js 18+
- Xcode 15+ (iOS)
- CocoaPods
- React Native CLI

### Install

```bash
cd MangoMarkets
npm install
cd ios && pod install && cd ..
```

### Run

```bash
# Start Metro
npx react-native start

# iOS (separate terminal)
npx react-native run-ios
```

### Known Issue — Spaces in Path

If your project path contains spaces, the postinstall script patches React Native's build scripts automatically. If you move the project, run:

```bash
npm run postinstall
```

## Screens

| Screen | Description |
|--------|-------------|
| Home | AI-first dashboard with segment bar, sub-index pills, chart, watchlist, sentiment, heatmap |
| News | Neural feed with AI-curated market articles and signal protocols |
| AI | Chat interface with Mango AI for market analysis |
| Portfolio | Holdings overview with asset breakdown |

## Design System

Dark theme with purple accent. Key tokens:

- Background: `#050510` / `#12121F`
- Accent: `#A855F7` (purple)
- Market green: `#22C55E`
- Market red: `#EF4444`
- Border: `#1E1E2E` / purple glow variant

## License

Private — not for redistribution.
