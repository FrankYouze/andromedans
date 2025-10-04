# 🚀 ExoVision Frontend

A modern, responsive web interface for AI-powered exoplanet detection and analysis, built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Dashboard**: Real-time model performance metrics and system overview
- **Data Management**: Upload, preview, and manage exoplanet datasets
- **Model Training**: Configure hyperparameters and monitor training progress
- **Classification**: Single observation and batch processing capabilities
- **Analytics**: Performance analysis and data exploration tools

## 🛠️ Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom NASA-inspired design system
- **State Management**: Redux Toolkit + RTK Query
- **Charts**: Recharts
- **Tables**: TanStack Table
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Header, Sidebar)
│   ├── dashboard/          # Dashboard-specific components
│   ├── forms/              # Form components
│   └── data/               # Data management components
├── pages/                  # Main application pages
├── hooks/                  # Custom React hooks
├── store/                  # Redux store configuration
│   ├── api/               # RTK Query API definitions
│   └── slices/            # Redux slices
├── services/              # API service layer
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🎨 Design System

### Colors
- **Primary**: NASA Deep Blue (#0B3D91)
- **Secondary**: Cosmic Purple (#4B0082)
- **Accent**: Mission Orange (#FC3D21)
- **Space Gray**: Custom gray scale for backgrounds and text

### Typography
- **Headers**: Bank Gothic Modified
- **Body**: Inter/Helvetica
- **Code**: Monaco/Monospace

### Components
- Consistent spacing using 8px base unit
- Responsive design with mobile-first approach
- Dark theme optimized for scientific data visualization

## 🔌 API Integration

The frontend is designed to work with a backend API that provides:

- Model statistics and performance metrics
- Dataset upload and management
- Classification endpoints (single and batch)
- Training configuration and monitoring
- Analytics and visualization data

## 📱 Responsive Design

- **Mobile**: < 768px (Student-focused simplicity)
- **Tablet**: 768px - 1024px (Educational use)
- **Desktop**: > 1024px (Research workstation)

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

## 🚀 Performance

- Code splitting for optimal loading
- Lazy loading for heavy components
- Memoization for expensive calculations
- Virtualization for large datasets

## 📊 Data Visualization

- Interactive charts using Recharts
- Real-time performance monitoring
- Light curve visualization
- Correlation matrix heatmaps
- Confusion matrix displays

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

- ESLint configuration for code quality
- Prettier for code formatting
- TypeScript for type safety
- Consistent naming conventions

## 🌟 Key Features

### Dashboard
- Real-time model performance metrics
- Recent predictions feed
- Quick action buttons
- System statistics overview

### Data Management
- Drag & drop file upload
- Dataset preview with sorting/filtering
- Support for CSV, JSON, and FITS formats
- Data validation and error handling

### Model Training
- Hyperparameter configuration
- Real-time training progress
- Model comparison tools
- Training history tracking

### Classification
- Single observation input forms
- Batch processing capabilities
- Confidence score visualization
- Results export functionality

### Analytics
- Performance trend analysis
- Confusion matrix visualization
- Feature importance charts
- Data exploration tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the ExoVision platform for AI-powered exoplanet detection and analysis.

## 🔗 Related

- [Backend API Documentation](../backend/README.md)
- [AI/ML Model Documentation](../ml/README.md)
- [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/)