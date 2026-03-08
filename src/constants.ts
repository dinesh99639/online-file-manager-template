import type { FileItem, FolderItem } from './types';

export const files: FileItem[] = [
  { id: 1, parentId: null, name: 'Project Requirements.pdf', type: 'doc', size: '2.4 MB', date: 'Oct 24, 2023', owner: 'me', isStarred: true, lastAccessed: '2023-10-24' },
  { id: 2, parentId: null, name: 'Website Mockups.png', type: 'image', size: '4.8 MB', date: 'Oct 23, 2023', owner: 'Sarah J.', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', isStarred: false, lastAccessed: '2023-10-25' },
  { id: 3, parentId: null, name: 'Marketing Campaign.mp4', type: 'video', size: '124 MB', date: 'Oct 21, 2023', owner: 'me', preview: 'https://images.unsplash.com/photo-1516280440502-85f5e55e5b38?q=80&w=400&auto=format&fit=crop', isStarred: true, lastAccessed: '2023-10-26' },
  { id: 4, parentId: null, name: 'Q3 Financial Report.xlsx', type: 'spreadsheet', size: '1.2 MB', date: 'Oct 20, 2023', owner: 'Alex M.', isDeleted: true },
  { id: 5, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-19' },
  { id: 6, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-19' },
  { id: 7, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-19' },
  { id: 8, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-19' },
  { id: 9, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-19' },
  { id: 10, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-19' },
  { id: 11, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-19' },
  { id: 12, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-19' },
  { id: 13, parentId: 1, name: 'Logo Iterations.zip', type: 'archive', size: '15.2 MB', date: 'Oct 25, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-25' },
  { id: 14, parentId: 1, name: 'Color Palette.png', type: 'image', size: '1.1 MB', date: 'Oct 23, 2023', owner: 'Sarah J.', preview: 'https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?q=80&w=400&auto=format&fit=crop', isStarred: true, lastAccessed: '2023-10-23' },
];

export const folders: FolderItem[] = [
  { id: 1, parentId: null, name: 'Design Assets', items: 42, size: '2.4 GB', date: 'Oct 25, 2023', owner: 'me', isStarred: true, lastAccessed: '2023-10-25' },
  { id: 2, parentId: null, name: 'Client Documents', items: 128, size: '8.1 GB', date: 'Oct 12, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-12' },
  { id: 3, parentId: null, name: 'Personal', items: 15, size: '450 MB', date: 'Sep 30, 2023', owner: 'me', isStarred: false, isDeleted: true },
  { id: 4, parentId: null, name: 'Project Phoenix', items: 84, size: '1.2 GB', date: 'Aug 14, 2023', owner: 'Sarah J.', isStarred: false },
  { id: 5, parentId: 1, name: 'Icons', items: 12, size: '5 MB', date: 'Oct 25, 2023', owner: 'me', isStarred: false },
  { id: 6, parentId: 1, name: 'Fonts', items: 4, size: '20 MB', date: 'Oct 24, 2023', owner: 'me', isStarred: false }
];

export const FILE_COLORS: Record<string, string> = {
  folder: '#f59e0b',
  image: '#ec4899',
  doc: '#3b82f6',
  video: '#f43f5e',
  archive: '#8b5cf6',
  spreadsheet: '#10b981',
  default: '#64748b'
};
