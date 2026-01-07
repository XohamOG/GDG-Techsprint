# InterviewPrep - AI-Powered Interview Practice Platform

A modern, animated frontend built with **Vite + React** featuring a cartoony whiteboard theme designed for AI-powered interview preparation. Practice technical coding, behavioral questions, and system design with real-time AI feedback.

## 🎨 Features

### Design & Animation
- **Cartoony Whiteboard Theme** - Hand-drawn aesthetics with sketch-style borders and playful fonts
- **Animated Splash Screen** - Engaging 3-second intro with floating doodles and smooth transitions
- **Smooth Animations** - Framer Motion powered animations throughout the app
- **Interactive Elements** - Hover effects, transitions, and micro-interactions
- **Grid Background** - Animated whiteboard-style grid pattern

### AI Interview Platform Features
- **Practice Arena** - 500+ questions across multiple categories
- **Real-time AI Feedback** - Get instant code review, hints, and optimization tips
- **Interview Types**:
  - 💻 Technical (Coding, Algorithms, Data Structures)
  - 💬 Behavioral (STAR method, Communication)
  - 🏗️ System Design (Architecture, Scalability)
- **Company-Specific Questions** - Practice with questions from FAANG companies
- **Progress Tracking** - Dashboard with stats, streaks, and skill progress
- **AI Insights** - Personalized recommendations based on your performance

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Navigate to the project directory:
```bash
cd interview-prep-react
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
pnpm build
```

Preview the production build:
```bash
npm run preview
# or
pnpm preview
```

## 📁 Project Structure

```
interview-prep-react/
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx    # Animated intro screen
│   │   └── Navbar.jsx          # Navigation component
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with all sections
│   │   ├── Practice.jsx        # AI practice arena
│   │   ├── Interviews.jsx      # Interview types catalog
│   │   ├── Companies.jsx       # Company-specific questions
│   │   └── Stats.jsx           # User dashboard & analytics
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles & animations
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── tailwind.config.js          # Tailwind + custom animations
```

## 🎯 Key Pages

### Home (`/`)
- Animated hero section with floating doodles
- Interview types showcase
- How it works section
- AI features highlight
- Stats and CTA sections

### Practice (`/practice`)
- Problem grid with filters
- AI feature badges on each problem
- Difficulty levels and categories
- Personal stats dashboard

### Interviews (`/interviews`)
- Three main categories
- Detailed question banks
- AI-assisted learning paths

### Companies (`/companies`)
- FAANG company cards
- Real interview questions
- Success rates and topics

### Stats (`/stats`)
- Progress tracking
- Skill development charts
- Recent activity feed
- AI-powered insights

## 🎨 Design System

### Colors
- **Primary**: Purple gradients (#8B5CF6 to #EC4899)
- **Accents**: Blue, Green, Yellow, Red
- **Background**: Off-white (#FAFAFA)
- **Text**: Near-black (#1A1A1A)

### Fonts
- **Headings**: Caveat (Hand-written style)
- **Body**: Comic Neue (Friendly, readable)
- **Accent**: Permanent Marker

### Components
- **btn-sketch**: Hand-drawn button style with shadow offset
- **card-sketch**: Elevated cards with sketch borders
- **Doodles**: Floating circles, squares, and decorative elements

## 🔧 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## 📝 Customization

### Adding New Animations
Edit `tailwind.config.js` to add custom keyframes:
```js
keyframes: {
  yourAnimation: {
    '0%': { /* styles */ },
    '100%': { /* styles */ }
  }
}
```

### Modifying Colors
Update the color scheme in `src/index.css`:
```css
:root {
  --your-color: #hexcode;
}
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

## 🌟 Future Enhancements

- [ ] Code editor integration
- [ ] Video interview simulation
- [ ] Voice-to-text for behavioral practice
- [ ] Peer practice matching
- [ ] Mock interview scheduling
- [ ] Certificate generation
- [ ] Mobile app version

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ for aspiring developers preparing for their dream jobs!
