# Hero Section Animations

Beautiful Framer Motion animations added to the Hero section for an engaging user experience.

## Animation Effects

### Text Section (Left Side)

1. **Slide In from Left**

   - Initial: `opacity: 0, x: -50`
   - Animates to: `opacity: 1, x: 0`
   - Duration: 0.8s with easeOut

2. **Heading Animation**

   - Fades in with upward motion
   - Delay: 0.2s
   - Gradient text effect applied

3. **Paragraph Animation**

   - Fades in with upward motion
   - Delay: 0.4s

4. **CTA Button**
   - Fades in with upward motion
   - Delay: 0.6s
   - Interactive hover: scales to 1.05
   - Tap effect: scales to 0.98
   - Enhanced shadow on hover

### Image Section (Right Side)

1. **Slide In from Right**

   - Initial: `opacity: 0, x: 50`
   - Animates to: `opacity: 1, x: 0`
   - Duration: 0.8s

2. **Floating Animation**
   - Continuous up/down motion: `y: [0, -20, 0]`
   - Subtle rotation: `rotate: [0, 2, 0, -2, 0]`
   - Hover effect: scales to 1.05

### Background Elements

1. **Pulsing Blur Shapes**
   - Two animated blur shapes
   - Scale and opacity animations
   - Different durations for variety (4s and 5s)
   - Creates depth and visual interest

### Floating Particles

Four decorative floating dots that:

- Move in Y and X directions
- Fade in and out
- Staggered delays for natural feel
- Different sizes and positions

## Performance

- All animations use GPU-accelerated properties (transform, opacity)
- Smooth 60fps performance
- No layout thrashing
- Optimized for mobile devices

## User Experience

- Immediate visual feedback on interactions
- Smooth, professional animations
- Non-intrusive background effects
- Accessible and performant
