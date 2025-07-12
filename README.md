# Smart Money Manager

A mobile-first Progressive Web App (PWA) for tracking expenses, managing budgets, and getting AI-powered financial advice. Built with Next.js, React, and shadcn/ui.

## Features

### 💰 Expense Tracking
- Add, edit, and delete expenses
- Categorize expenses with predefined categories
- Add notes and dates to transactions
- View recent transactions on the home screen

### 📊 Analytics Dashboard
- Interactive charts using Recharts
- Spending trends over the last 6 months
- Category distribution pie chart
- Monthly breakdown bar chart
- Filter data by month

### 🎯 Budget Management
- Set monthly budget limits
- Configure category-specific budgets
- Track budget remaining vs. spent
- Visual budget progress indicators

### 🤖 AI Financial Advisor
- Personalized spending analysis
- Saving tips based on spending patterns
- Future financial planning suggestions
- Budget warning alerts

### 🌙 Theme Support
- Light and dark mode
- System theme detection
- Smooth theme transitions

### 📱 PWA Features
- Installable as a mobile app
- Offline functionality
- Push notifications (browser notifications)
- Responsive mobile-first design

### 🔔 Notifications
- Daily expense logging reminders
- Budget limit warnings
- Browser notification support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: TailwindCSS, shadcn/ui
- **State Management**: Zustand with persistence
- **Charts**: Recharts
- **Icons**: Lucide React
- **PWA**: Service Worker, Web App Manifest

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-money-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── add/page.tsx       # Add expense page
│   ├── dashboard/page.tsx # Analytics dashboard
│   ├── settings/page.tsx  # Settings page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Bottom navigation
│   ├── theme-toggle.tsx  # Theme switcher
│   ├── ai-advisor.tsx    # AI financial advisor
│   └── pwa-register.tsx  # PWA service worker
└── lib/                  # Utilities and store
    ├── store.ts          # Zustand store
    ├── types.ts          # TypeScript types
    └── utils.ts          # Utility functions
```

## Data Models

### Expense
```typescript
interface Expense {
  id: string;
  uid: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}
```

### Budget
```typescript
interface Budget {
  uid: string;
  month: string;
  totalBudget: number;
  categories: Record<string, number>;
}
```

### Settings
```typescript
interface Settings {
  uid: string;
  darkMode: boolean;
  dailyReminder: boolean;
  spendingLimit: Record<string, number>;
}
```

## Categories

The app includes 10 predefined expense categories:
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Healthcare
- Utilities
- Housing
- Education
- Travel
- Other

## PWA Installation

1. Open the app in a supported browser (Chrome, Edge, Safari)
2. Look for the install prompt or use the browser menu
3. Click "Install" to add to your home screen
4. The app will work offline and function like a native app

## Future Enhancements

- [ ] Firebase integration for cloud sync
- [ ] Real AI integration with OpenAI API
- [ ] Export data to CSV/PDF
- [ ] Multiple currency support
- [ ] Receipt photo upload
- [ ] Recurring expense tracking
- [ ] Financial goals and milestones
- [ ] Social sharing features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
