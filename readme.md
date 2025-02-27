# Nate Dryer - Personal Website

A modern, responsive personal website built with React and Tailwind CSS. Features a clean design with dark/light theme support and smooth animations.

![Profile Card Preview](/preview.png)

## Features

- 🌓 Dark/Light theme with system preference detection
- 📱 Fully responsive design
- ✨ Smooth transitions and animations
- 🎨 Modern glass-morphism design
- ♿ Accessibility-friendly
- 🔄 Theme persistence
- 🖼 Optimized image loading

## Tech Stack

- React 18
- Tailwind CSS
- Lucide Icons
- Vite (Build tool)

## Getting Started

### Prerequisites

- Node.js 16.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/profile-card.git
cd profile-card
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Basic Implementation

```jsx
import { ProfileCard } from './components/ProfileCard';

function App() {
  return <ProfileCard />;
}
```

### Customization

Edit the ProfileCard component to update:
- Profile information
- Social links
- Contact information
- Color schemes
- Images

## Component Structure

```
ProfileCard/
├── Theme Toggle
├── Profile Image
├── Name & Title
├── Bio Text
├── Action Buttons
└── Social Links
```

## Features in Detail

### Theme Switching
- Automatic system theme detection
- Manual theme toggle
- Theme persistence across sessions
- Smooth transition animations

### Responsive Design
- Mobile-first approach
- Fluid typography
- Adaptive spacing
- Optimized for all screen sizes

### Interactions
- Hover effects on all interactive elements
- Scale animations on buttons
- Smooth color transitions
- Focus states for accessibility

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this component in your projects.

## Acknowledgments

- Design inspired by modern UI trends
- Icons provided by [Lucide Icons](https://lucide.dev)
- Built with [React](https://reactjs.org) and [Tailwind CSS](https://tailwindcss.com)