# 🌍 Country Explorer

A modern React application built with TypeScript, RTK Query, and Zod validation that allows users to explore countries around the world using the REST Countries API v2.

## 🚀 Features

- **Country Data Display**: View country information including names, regions, and flags
- **Region Filtering**: Filter countries by geographical regions (Africa, Americas, Asia, Europe, Oceania)
- **Real-time Data**: Fetches data from the REST Countries API v2 using RTK Query
- **Type Safety**: Full TypeScript support with Zod schema validation
- **Modern UI**: Beautiful, responsive design with glassmorphism effects
- **Error Handling**: Graceful error handling and loading states

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Zod** - Schema validation
- **CSS3** - Modern styling with glassmorphism

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd country
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── CountryCard.tsx      # Individual country display component
│   └── CountryList.tsx      # List of countries with filtering
├── store/
│   ├── index.ts             # Redux store configuration
│   ├── hooks.ts             # Typed Redux hooks
│   └── services/
│       └── countryApi.ts    # RTK Query API service with Zod schemas
├── App.tsx                  # Main application component
├── App.css                  # Application styles
└── index.tsx                # Application entry point
```

## 🔧 API Integration

The app uses the [REST Countries API v2](https://restcountries.com/v2/) to fetch country data. RTK Query handles:

- **Automatic caching** of API responses
- **Background refetching** for fresh data
- **Loading and error states**
- **Optimistic updates**

### API Endpoints Used:

- `GET /v2/all?fields=name,region,flag` - Get all countries with basic fields
- `GET /v2/name/{name}?fields=name,region,flag` - Get countries by name
- `GET /v2/region/{region}?fields=name,region,flag` - Get countries by region

## 🎨 Zod Schema Validation

All API responses are validated using Zod schemas to ensure type safety:

```typescript
const CountrySchema = z.object({
  name: z.string(),
  region: z.string(),
  flag: z.string(),
  independent: z.boolean().optional(),
});
```

## 🎯 Key Features Explained

### RTK Query Setup

- **Base Query**: Configured to use the REST Countries API v2
- **Endpoints**: Three main endpoints for fetching all countries, countries by name, and countries by region
- **Transform Response**: Zod validation ensures data integrity
- **Field Selection**: Uses query parameters to fetch only required fields for better performance

### Component Architecture

- **CountryCard**: Reusable component for displaying individual country information
- **CountryList**: Container component with filtering logic and state management
- **App**: Main component with Redux Provider setup

### Styling

- **Glassmorphism Design**: Modern UI with backdrop blur effects
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Smooth Animations**: Hover effects and transitions for better UX

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones

## 🔮 Future Enhancements

- Search functionality by country name
- Dark/Light theme toggle
- Country details modal/page with additional information
- Favorites system
- More detailed country information from other API endpoints
- Offline support with service workers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [REST Countries API v2](https://restcountries.com/v2/) for providing the country data
- [Create React App](https://create-react-app.dev/) for the project scaffolding
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Zod](https://zod.dev/) for schema validation
