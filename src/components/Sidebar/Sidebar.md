# Sidebar Component

The `Sidebar` component provides the primary navigation for the file management application. It handles workspace selection, core navigation sections, and storage capacity visualization.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `isSidebarOpen` | `boolean` | Controls visibility on mobile/small screens. |
| `setIsSidebarOpen` | `(open: boolean) => void` | Setter for sidebar visibility. |
| `spaceDropdownRef` | `React.RefObject<HTMLDivElement \| null>` | Ref for handling clicks outside the space selection dropdown. |
| `isSpaceDropdownOpen` | `boolean` | State of the space selection dropdown. |
| `setIsSpaceDropdownOpen` | `(open: boolean) => void` | Setter for the space dropdown state. |
| `spaces` | `Space[]` | List of available storage spaces/workspaces. |
| `activeSpace` | `Space` | The currently selected workspace. |
| `activeSpaceId` | `number` | ID of the currently active workspace. |
| `setActiveSpaceId` | `(id: number) => void` | Setter to change the active workspace. |
| `currentSection` | `string` | The current navigation section (e.g., 'recent', 'starred'). |
| `handleRefreshSimulate` | `(section: string) => void` | Simulates data fetching when switching sections. |
| `setIsCreateSpaceModalOpen` | `(open: boolean) => void` | Opens the workspace creation modal. |
| `setSelectedItem` | `(item: any) => void` | Clears current selection on navigation. |
| `setCurrentSection` | `(section: string) => void` | Sets the current UI section. |
| `setCurrentPath` | `(path: any[]) => void` | Resets navigation breadcrumbs. |
| `setIsLoading` | `(loading: boolean) => void` | Controls the application's loading state. |

## Sub-Components

- **NavItem**: Individual navigation items (My Files, Recent, etc.) with active state styles and icons.
- **StorageIndicator**: A visual gauge showing storage usage with a gradient fill.
- **StorageDetail**: Small detail blocks for storage metadata (Files, Bandwidth, Status).

## Key Logic

- **Section Switching**: Navigation triggers an `isLoading` state and resets the breadcrumb path to the root of that section.
- **Space Selection**: A custom dropdown allows switching between different storage containers (Personal, Work, etc.).
- **Mobile Responsiveness**: Uses absolute positioning and a backdrop overlay when active on small devices.
