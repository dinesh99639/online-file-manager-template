# TopBar Component

The `TopBar` component serves as the header of the application, featuring search functionality, theme selection, and user profile management.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `setIsSidebarOpen` | `(open: boolean) => void` | Opens/closes the sidebar on mobile. |
| `themePickerRef` | `React.RefObject<HTMLDivElement \| null>` | Ref for handling theme dropdown outside clicks. |
| `isThemePickerOpen` | `boolean` | State for theme picker dropdown. |
| `setIsThemePickerOpen` | `(open: boolean) => void` | Setter for theme picker visibility. |
| `themes` | `Theme[]` | List of supported application themes. |
| `theme` | `string` | The ID of the currently active theme. |
| `setTheme` | `(theme: string) => void` | Setter for switching the active theme. |

## Key Features

- **Search Bar**: A responsive input field with keyboard shortcut hints (⌘K). 
- **Theme Picker**: A dropdown allowing users to select different color themes (Light, Dark, Midnight, Ocean, Forest, Sunset, Nord).
- **Notifications**: Bell icon with a badge for simulating updates.
- **User Profile**: Display for user avatar and online status.

## Responsiveness

- **Mobile View**: Replaces the full logo with a sidebar menu toggle button.
- **Header Layout**: Uses `sticky top-0` for consistent accessibility during scrolling.
- **Glassmorphism**: Leverages background blur effects for a modern UI.
