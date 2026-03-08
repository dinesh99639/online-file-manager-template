# Application Themes Module

The `themes.tsx` module provides the visual configurations for the application's different color schemes.

## Exported Constants

### `themes`
An array of `Theme` objects, containing:
- `id`: The unique theme ID (`light`, `dark`, `midnight`, `ocean`, `forest`, `sunset`, `nord`).
- `name`: The display label for the theme.
- `icon`: The Lucide icon associated with the theme.
- `color`: The primary color for that theme (e.g., `#38bdf8` for Midnight).

## Key Themes

- **Light**: The default white and light-blue scheme.
- **Dark**: A sleek, high-contrast dark-grey and indigo scheme.
- **Midnight**: A deep-navy and cyan scheme with specialized CSS stars background.
- **Ocean**: A vibrant light-blue and teal scheme.
- **Forest**: A professional emerald and lime-green scheme.
- **Sunset**: A warm orange and rose scheme.
- **Nord**: A focused, desaturated arctic-blue and soft-blue scheme.

## Implementation Detail

- **Icon Type**: All theme icons are Lucide icons with a default size of 16px.
- **State Integration**: The theme is stored in the application state and persisted in `localStorage`.
- **Global CSS Integration**: Changing the theme updates the `data-theme` attribute on the `<html>` element, which is then picked up by CSS variables in `index.css`.
- **UI Colors**: Each theme's primary color is used in the `TopBar.tsx` theme picker for visual feedback.
