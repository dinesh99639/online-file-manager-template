import { useState, useEffect, useRef } from 'react';

import {
  Folder, FileText, FileVideo, MoreVertical,
  Search, Bell, Moon, Sun, UploadCloud, Download, Share2,
  Grid as GridIcon, List as ListIcon, LayoutDashboard, History as HistoryIcon, Star, Trash2,
  Menu, X, ChevronDown, ChevronRight, Plus, FolderOpen,
  FileArchive, FileSpreadsheet, File as FileIcon, GalleryVertical, Clapperboard, Package,
  Palette, Droplets, Leaf, Sunset as SunsetIcon, Ghost, Check,
  CloudSync, Database, RefreshCw
} from 'lucide-react';

// Dummy data
const files = [
  { id: 1, parentId: null, name: 'Project Requirements.pdf', type: 'doc', size: '2.4 MB', date: 'Oct 24, 2023', owner: 'me', isStarred: true, lastAccessed: '2023-10-24' },
  { id: 2, parentId: null, name: 'Website Mockups.png', type: 'image', size: '4.8 MB', date: 'Oct 23, 2023', owner: 'Sarah J.', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', isStarred: false, lastAccessed: '2023-10-25' },
  { id: 3, parentId: null, name: 'Marketing Campaign.mp4', type: 'video', size: '124 MB', date: 'Oct 21, 2023', owner: 'me', preview: 'https://images.unsplash.com/photo-1516280440502-85f5e55e5b38?q=80&w=400&auto=format&fit=crop', isStarred: true, lastAccessed: '2023-10-26' },
  { id: 4, parentId: null, name: 'Q3 Financial Report.xlsx', type: 'spreadsheet', size: '1.2 MB', date: 'Oct 20, 2023', owner: 'Alex M.', isDeleted: true },
  { id: 5, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-19' },
  { id: 6, parentId: 1, name: 'Logo Iterations.zip', type: 'archive', size: '15.2 MB', date: 'Oct 25, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-25' },
  { id: 7, parentId: 1, name: 'Color Palette.png', type: 'image', size: '1.1 MB', date: 'Oct 23, 2023', owner: 'Sarah J.', preview: 'https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?q=80&w=400&auto=format&fit=crop', isStarred: true, lastAccessed: '2023-10-23' },
];

const folders = [
  { id: 1, parentId: null, name: 'Design Assets', items: 42, size: '2.4 GB', date: 'Oct 25, 2023', owner: 'me', isStarred: true, lastAccessed: '2023-10-25' },
  { id: 2, parentId: null, name: 'Client Documents', items: 128, size: '8.1 GB', date: 'Oct 12, 2023', owner: 'me', isStarred: false, lastAccessed: '2023-10-12' },
  { id: 3, parentId: null, name: 'Personal', items: 15, size: '450 MB', date: 'Sep 30, 2023', owner: 'me', isStarred: false, isDeleted: true },
  { id: 4, parentId: null, name: 'Project Phoenix', items: 84, size: '1.2 GB', date: 'Aug 14, 2023', owner: 'Sarah J.', isStarred: false },
  { id: 5, parentId: 1, name: 'Icons', items: 12, size: '5 MB', date: 'Oct 25, 2023', owner: 'me', isStarred: false },
  { id: 6, parentId: 1, name: 'Fonts', items: 4, size: '20 MB', date: 'Oct 24, 2023', owner: 'me', isStarred: false }
];

const FILE_COLORS: Record<string, string> = {
  folder: '#f59e0b',
  image: '#ec4899',
  doc: '#3b82f6',
  video: '#f43f5e',
  archive: '#8b5cf6',
  spreadsheet: '#10b981',
  default: '#64748b'
};

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'light';
  });
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('viewMode') || 'grid';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [spaces, setSpaces] = useState([
    { id: 1, name: 'Personal Storage', used: '15.4 GB', filesCount: 1250, bandwidth: '4.2 GB', status: 'Healthy' },
    { id: 2, name: 'Work Drive', used: '45.2 GB', filesCount: 5400, bandwidth: '12.8 GB', status: 'Encrypted' },
    { id: 3, name: 'Project Phoenix', used: '2.1 GB', filesCount: 320, bandwidth: '1.2 GB', status: 'Archived' }
  ]);
  const [activeSpaceId, setActiveSpaceId] = useState(1);
  const [isSpaceDropdownOpen, setIsSpaceDropdownOpen] = useState(false);
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentPath, setCurrentPath] = useState([{ id: null as number | null, name: 'My Files' }]);
  const [currentSection, setCurrentSection] = useState('my-files');
  const spaceDropdownRef = useRef<HTMLDivElement>(null);
  const themePickerRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'light', name: 'Light', icon: <Sun size={16} />, color: '#4f46e5' },
    { id: 'dark', name: 'Dark', icon: <Moon size={16} />, color: '#818cf8' },
    { id: 'midnight', name: 'Midnight', icon: <Droplets size={16} />, color: '#38bdf8' },
    { id: 'ocean', name: 'Ocean', icon: <Droplets size={16} />, color: '#0284c7' },
    { id: 'forest', name: 'Forest', icon: <Leaf size={16} />, color: '#059669' },
    { id: 'sunset', name: 'Sunset', icon: <SunsetIcon size={16} />, color: '#f97316' },
    { id: 'nord', name: 'Nord', icon: <Ghost size={16} />, color: '#5e81ac' }
  ];

  const activeSpace: any = spaces.find(s => s.id === activeSpaceId) || spaces[0];
  const currentFolderId = currentPath[currentPath.length - 1].id;

  const getDisplayedItems = () => {
    switch (currentSection) {
      case 'recent':
        return {
          folders: [],
          files: files.filter(f => !f.isDeleted && f.lastAccessed).sort((a, b) => new Date(b.lastAccessed!).getTime() - new Date(a.lastAccessed!).getTime())
        };
      case 'starred':
        return {
          folders: folders.filter(f => !f.isDeleted && f.isStarred),
          files: files.filter(f => !f.isDeleted && f.isStarred)
        };
      case 'trash':
        return {
          folders: folders.filter(f => f.isDeleted),
          files: files.filter(f => f.isDeleted)
        };
      default: // my-files
        return {
          folders: folders.filter(f => !f.isDeleted && f.parentId === currentFolderId),
          files: files.filter(f => !f.isDeleted && f.parentId === currentFolderId)
        };
    }
  };

  const { folders: displayedFolders, files: displayedFiles } = getDisplayedItems();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  // Simulate network loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle outside click for space dropdown and theme picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (spaceDropdownRef.current && !spaceDropdownRef.current.contains(event.target as Node)) {
        setIsSpaceDropdownOpen(false);
      }
      if (themePickerRef.current && !themePickerRef.current.contains(event.target as Node)) {
        setIsThemePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // toggleTheme is currently handled via the themePicker

  const renderIcon = (type: string, size = 20) => {
    const color = FILE_COLORS[type] || FILE_COLORS.default;
    const props = {
      size,
      fill: color,
      fillOpacity: 0.12,
      strokeWidth: 1.75,
      style: { color: color }
    };
    switch (type) {
      case 'folder': return <FolderOpen {...props} />;
      case 'image': return <GalleryVertical {...props} />;
      case 'doc': return <FileText {...props} />;
      case 'video': return <Clapperboard {...props} />;
      case 'archive': return <Package {...props} />;
      case 'spreadsheet': return <FileSpreadsheet {...props} />;
      default: return <FileIcon {...props} />;
    }
  };

  const getKindString = (type: string) => {
    switch (type) {
      case 'folder': return 'Folder';
      case 'image': return 'Image';
      case 'doc': return 'Document';
      case 'video': return 'Video';
      case 'archive': return 'Archive';
      case 'spreadsheet': return 'Spreadsheet';
      default: return 'File';
    }
  };

  const renderOwnerAvatar = (owner: string) => {
    if (owner === 'me') {
      return <img src="https://ui-avatars.com/api/?name=Dinesh&background=6366f1&color=fff" alt="me" className="w-6 h-6 rounded-full object-cover mr-2" />;
    }
    return <div className="w-6 h-6 rounded-full bg-bg-tertiary text-text-secondary flex items-center justify-center text-[10px] mr-2 font-bold">{owner.charAt(0)}</div>;
  };

  const handleRefreshSimulate = (section = 'recent') => {
    setSelectedItem(null);
    setIsLoading(true);
    setIsSidebarOpen(false);
    setCurrentSection(section);
    // Reset path when switching sections to avoid confusion
    if (section !== 'my-files') {
      setCurrentPath([{ id: null, name: section.charAt(0).toUpperCase() + section.slice(1) }]);
    } else {
      setCurrentPath([{ id: null, name: 'My Files' }]);
    }
    setTimeout(() => setIsLoading(false), 200);
  };

  const navigateToFolder = (folder: any) => {
    setSelectedItem({ ...folder, type: 'folder' });
    setIsLoading(true);
    setCurrentSection('my-files');
    setCurrentPath([...currentPath, { id: folder.id, name: folder.name }]);
    setTimeout(() => setIsLoading(false), 200);
  };

  const deselectToFolder = () => {
    const currentFolderId = currentPath[currentPath.length - 1].id;
    if (currentFolderId === null) {
      setSelectedItem(null);
    } else {
      const folder = folders.find(f => f.id === currentFolderId);
      if (folder) setSelectedItem({ ...folder, type: 'folder' });
    }
  };

  const navigateToBreadcrumb = (index: number) => {
    if (index === currentPath.length - 1) return;
    setCurrentSection('my-files');
    const childInPath = currentPath[index + 1];

    setIsLoading(true);
    setCurrentPath(currentPath.slice(0, index + 1));

    // Highlight the folder that was just "exited" to maintain context
    if (childInPath && childInPath.id !== null) {
      const folderToSelect = folders.find(f => f.id === childInPath.id);
      if (folderToSelect) {
        setSelectedItem({ ...folderToSelect, type: 'folder' });
      } else {
        setSelectedItem(null);
      }
    } else {
      setSelectedItem(null);
    }

    setTimeout(() => setIsLoading(false), 200);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-primary text-text-primary transition-colors duration-500 font-jakarta antialiased selection:bg-accent-primary/20">
      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm animate-fade-in md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`fixed md:relative top-0 left-0 bottom-0 w-[240px] bg-bg-tertiary border-r border-border-color flex flex-col p-6 z-30 transition-all duration-400 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full shadow-2xl'}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-10 px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent-primary/20 transform-gpu hover:scale-105 active:scale-95">
              <UploadCloud size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight">TeleFiles</span>
          </div>
          <button className="flex items-center justify-center p-2 rounded-xl border border-border-color bg-bg-secondary text-text-secondary transition-all hover:bg-bg-primary hover:text-text-primary md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="relative mb-6" ref={spaceDropdownRef}>
          <button
            className="flex items-center justify-between w-full p-3 px-4 bg-bg-tertiary border border-border-color rounded-xl cursor-pointer text-text-primary font-medium transition-colors hover:border-accent-primary"
            onClick={() => setIsSpaceDropdownOpen(!isSpaceDropdownOpen)}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
              {activeSpace.name}
            </div>
            <ChevronDown size={16} />
          </button>

          <div className={`absolute top-full left-0 w-full mt-2 bg-bg-secondary border border-border-color rounded-xl shadow-lg z-50 overflow-hidden ${isSpaceDropdownOpen ? 'block animate-fade-in' : 'hidden'}`}>
            {spaces.map(space => (
              <div
                key={space.id}
                className={`p-3 px-4 cursor-pointer flex items-center gap-3 text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary ${activeSpaceId === space.id ? 'bg-accent-primary/10 text-accent-primary' : ''}`}
                onClick={() => {
                  setActiveSpaceId(space.id);
                  setIsSpaceDropdownOpen(false);

                  // Reset view to 'My Files' root on space change
                  setSelectedItem(null);
                  setCurrentSection('my-files');
                  setCurrentPath([{ id: null, name: 'My Files' }]);

                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 800);
                }}
              >
                <div className={`w-2 h-2 rounded-full ${activeSpaceId === space.id ? 'bg-accent-primary' : 'bg-text-secondary'}`}></div>
                {space.name}
              </div>
            ))}
            <div className="h-px bg-border-color my-1"></div>
            <div
              className="p-3 px-4 cursor-pointer flex items-center gap-3 text-accent-primary font-medium transition-colors hover:bg-bg-tertiary"
              onClick={() => {
                setIsSpaceDropdownOpen(false);
                setIsCreateSpaceModalOpen(true);
              }}
            >
              <Plus size={16} />
              Create new space
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <div
            className={`flex items-center gap-3 p-2.5 px-4 rounded-xl cursor-pointer transition-all ${currentSection === 'my-files' ? 'text-accent-primary font-bold bg-bg-secondary shadow-md ring-1 ring-accent-primary/20' : 'text-text-secondary hover:bg-bg-primary/50 hover:text-text-primary'}`}
            onClick={() => handleRefreshSimulate('my-files')}
          >
            <LayoutDashboard size={18} />
            <span className="text-[14px]">My Files</span>
          </div>
          <div
            className={`flex items-center gap-3 p-2.5 px-4 rounded-xl cursor-pointer transition-all ${currentSection === 'recent' ? 'text-accent-primary font-bold bg-bg-secondary shadow-md ring-1 ring-accent-primary/20' : 'text-text-secondary hover:bg-bg-primary/50 hover:text-text-primary'}`}
            onClick={() => handleRefreshSimulate('recent')}
          >
            <HistoryIcon size={18} />
            <span className="text-[14px]">Recent</span>
          </div>
          <div
            className={`flex items-center gap-3 p-2.5 px-4 rounded-xl cursor-pointer transition-all ${currentSection === 'starred' ? 'text-accent-primary font-bold bg-bg-secondary shadow-md ring-1 ring-accent-primary/20' : 'text-text-secondary hover:bg-bg-primary/50 hover:text-text-primary'}`}
            onClick={() => handleRefreshSimulate('starred')}
          >
            <Star size={18} />
            <span className="text-[14px]">Starred</span>
          </div>
          <div
            className={`flex items-center gap-3 p-2.5 px-4 rounded-xl cursor-pointer transition-all ${currentSection === 'trash' ? 'text-accent-primary font-bold bg-bg-secondary shadow-md ring-1 ring-accent-primary/20' : 'text-text-secondary hover:bg-bg-primary/50 hover:text-text-primary group'}`}
            onClick={() => handleRefreshSimulate('trash')}
          >
            <Trash2 size={18} />
            <span className="text-[14px]">Trash</span>
          </div>
          <div className="h-px bg-border-color/50 my-4 mx-2"></div>
        </nav>

        <div className="mt-auto px-1">
          <div className="bg-bg-secondary/40 border border-border-color/50 rounded-2xl p-4 shadow-sm relative overflow-hidden group/storage">
            {/* Subtle pulse background for 'Unlimited' feel */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent-primary/5 rounded-full blur-2xl group-hover/storage:bg-accent-primary/10 transition-colors"></div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold text-text-secondary uppercase tracking-[0.2em] mb-0.5">Storage Plan</span>
                <span className="text-sm font-black text-accent-primary flex items-center gap-1.5">
                  Unlimited
                  <div className="w-1 h-1 rounded-full bg-accent-primary animate-pulse"></div>
                </span>
              </div>
              <div className="w-9 h-9 bg-bg-tertiary/50 border border-border-color/50 rounded-xl flex items-center justify-center text-accent-primary">
                <CloudSync size={18} strokeWidth={2.5} />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Database size={12} className="opacity-50" />
                  <span>Space Used</span>
                </div>
                <span className="text-text-primary font-black">{activeSpace.used}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2 text-text-secondary">
                  <FileIcon size={12} className="opacity-50" />
                  <span>File Count</span>
                </div>
                <span className="text-text-primary font-black">{activeSpace.filesCount.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2 text-text-secondary">
                  <RefreshCw size={12} className="opacity-50" />
                  <span>Transfer</span>
                </div>
                <span className="text-text-primary font-black">{activeSpace.bandwidth}/mo</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border-color/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest">{activeSpace.status}</span>
              </div>
              <span className="text-[10px] font-extrabold text-text-secondary hover:text-accent-primary cursor-pointer transition-colors">Upgrade</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-bg-primary relative" onClick={deselectToFolder}>
        {/* Topbar */}
        <header
          className="h-[64px] min-h-[64px] flex items-center justify-between px-6 md:px-8 bg-glass-bg backdrop-blur-xl border-b border-border-color z-10 shadow-sm sticky top-0"
          onClick={(e) => {
            // Only stop if they didn't click the "root" of the header
            if (e.target !== e.currentTarget) e.stopPropagation();
          }}
        >
          <div className="flex items-center flex-1 max-w-xl">
            <button className="flex items-center justify-center p-2 rounded-xl bg-bg-tertiary mr-4 shadow-sm hover:bg-bg-secondary transition-all md:hidden" onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true); }}>
              <Menu size={20} />
            </button>
            <div className="group relative flex items-center gap-3 bg-bg-tertiary/50 p-2.5 px-5 rounded-2xl border border-border-color w-full transition-all hover:bg-bg-tertiary focus-within:bg-bg-secondary focus-within:shadow-md focus-within:border-accent-primary focus-within:ring-1 focus-within:ring-accent-primary/20">
              <Search size={18} className="text-text-secondary group-focus-within:text-accent-primary transition-colors" />
              <input type="text" placeholder="Search files, spaces..." className="bg-transparent border-none outline-none text-sm text-text-primary w-full placeholder:text-text-secondary/50 font-medium" />
              <div className="hidden sm:flex items-center gap-1.5 bg-bg-primary border border-border-color rounded-lg px-2 py-0.5 text-[10px] font-bold text-text-secondary shadow-sm">
                <span>⌘</span><span>K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 ml-4">
            <button className="hidden sm:flex items-center gap-2.5 bg-accent-gradient text-white p-2.5 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-accent-primary/25 hover:translate-y-[-1px] hover:shadow-xl active:translate-y-0 active:scale-95 group transform-gpu transition-all">
              <UploadCloud size={18} className="transition-transform group-hover:rotate-12" />
              Upload
            </button>

            <div className="h-8 w-px bg-border-color mx-2 hidden md:block"></div>

            <div className="relative" ref={themePickerRef}>
              <button
                className="flex items-center justify-center p-2.5 rounded-xl border border-transparent hover:border-border-color hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-all active:scale-90"
                onClick={(e) => { e.stopPropagation(); setIsThemePickerOpen(!isThemePickerOpen); }}
              >
                <Palette size={19} />
              </button>

              {isThemePickerOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-bg-secondary border border-border-color rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in p-2">
                  <div className="px-3 py-2 text-[11px] font-extrabold text-text-secondary uppercase tracking-[0.12em] border-b border-border-color/50 mb-1">
                    Select Theme
                  </div>
                  {themes.map(t => (
                    <button
                      key={t.id}
                      className={`w-full flex items-center justify-between p-2.5 px-3 rounded-xl transition-all ${theme === t.id ? 'bg-bg-tertiary text-accent-primary' : 'text-text-secondary hover:bg-bg-tertiary/50 hover:text-text-primary'}`}
                      onClick={() => {
                        setTheme(t.id);
                        setIsThemePickerOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm border border-border-color/20" style={{ backgroundColor: t.color + '15', color: t.color }}>
                          {t.icon}
                        </div>
                        <span className="text-sm font-bold">{t.name}</span>
                      </div>
                      {theme === t.id && <div className="w-1.5 h-1.5 rounded-full bg-accent-primary"></div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="hidden md:flex items-center justify-center p-2.5 rounded-xl border border-transparent hover:border-border-color hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-all relative">
              <Bell size={19} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-secondary"></span>
            </button>

            <div className="flex items-center gap-3 ml-2 pl-3 border-l border-border-color group cursor-pointer">
              <div className="relative">
                <img src="https://ui-avatars.com/api/?name=Dinesh&background=6366f1&color=fff" alt="User" className="w-9 h-9 rounded-xl object-cover ring-2 ring-border-color/50 transition-all group-hover:ring-accent-primary/50 group-hover:scale-105" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-bg-secondary"></span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Content Area */}
          <section
            className="flex-1 p-6 md:p-8 overflow-y-auto min-w-0 flex flex-col"
            onClick={(e) => {
              e.stopPropagation();
              deselectToFolder();
            }}
          >
            <div className="flex items-center justify-between mb-8 animate-fade-in transform-gpu" onClick={(e) => e.stopPropagation()}>
              <div>
                <div className="flex items-center gap-1.5 text-text-secondary text-[13px] font-bold mb-1 ml-0.5">
                  {currentPath.map((item, index) => (
                    <div key={item.id || 'root'} className="flex items-center">
                      <span
                        className={`cursor-pointer transition-all p-1 px-1.5 rounded-lg border border-transparent ${index === currentPath.length - 1 ? "text-text-primary font-extrabold bg-bg-secondary border-border-color px-2.5 shadow-sm" : "hover:text-text-primary hover:bg-bg-secondary hover:border-border-color"}`}
                        onClick={() => navigateToBreadcrumb(index)}
                      >
                        {item.name}
                      </span>
                      {index < currentPath.length - 1 && (
                        <ChevronRight size={14} className="mx-0.5 opacity-40" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex bg-bg-tertiary/50 p-1.5 rounded-2xl border border-border-color shadow-sm">
                <button
                  className={`p-2 px-3 rounded-xl transition-all flex items-center gap-2 font-bold text-xs ${viewMode === 'grid' ? 'bg-bg-secondary text-accent-primary shadow-sm border border-border-color ring-1 ring-accent-primary/5' : 'text-text-secondary hover:text-text-primary'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <GridIcon size={16} strokeWidth={2.5} />
                  Grid
                </button>
                <div className="w-px h-4 bg-border-color mx-1 self-center"></div>
                <button
                  className={`p-2 px-3 rounded-xl transition-all flex items-center gap-2 font-bold text-xs ${viewMode === 'list' ? 'bg-bg-secondary text-accent-primary shadow-sm border border-border-color ring-1 ring-accent-primary/5' : 'text-text-secondary hover:text-text-primary'}`}
                  onClick={() => setViewMode('list')}
                >
                  <ListIcon size={16} strokeWidth={2.5} />
                  List
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-[200px] animate-fade-in">
                <div className="w-6 h-6 border-[3px] border-border-color border-t-accent-primary rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {displayedFolders.length === 0 && displayedFiles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-20 bg-bg-secondary border-2 border-dashed border-border-color rounded-[20px] mt-5 animate-fade-in shadow-sm">
                    <div className="w-20 h-20 bg-bg-tertiary rounded-[24px] flex items-center justify-center text-text-secondary mb-6 opacity-80 mix-blend-luminosity shadow-sm">
                      <Folder size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">This folder is empty</h3>
                    <p className="text-sm text-text-secondary max-w-xs mx-auto mb-6 leading-relaxed">
                      Drag and drop files here to upload, or use the button below to get started.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button className="flex items-center gap-2 bg-accent-gradient text-white p-2.5 px-6 rounded-xl font-semibold cursor-pointer transition-all hover:translate-y-[-0.5px] hover:shadow-lg active:translate-y-0 active:scale-95 shadow-md">
                        <Plus size={18} />
                        Upload Files
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {viewMode === 'grid' ? (
                      <div className="animate-fade-in grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-7 pb-10">
                        {displayedFolders.map(folder => (
                          <div
                            key={`folder-${folder.id}`}
                            className={`group bg-bg-secondary rounded-[22px] border p-3.5 transition-all duration-400 cursor-pointer hover:shadow-soft hover:-translate-y-1.5 transform-gpu relative ${selectedItem?.id === folder.id && selectedItem?.type === 'folder' ? 'border-file-folder ring-2 ring-file-folder/20 bg-file-folder/[0.03] shadow-lg shadow-file-folder/10' : 'border-border-color hover:border-file-folder/40 hover:bg-bg-tertiary/20'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToFolder(folder);
                            }}
                          >
                            {selectedItem?.id === folder.id && selectedItem?.type === 'folder' && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-file-folder text-white rounded-full flex items-center justify-center shadow-lg animate-scale-up z-20">
                                <Check size={14} strokeWidth={3} />
                              </div>
                            )}
                            <div className="aspect-[4/3] bg-bg-tertiary/50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden transition-all group-hover:bg-bg-secondary shadow-inner">
                              <div className="text-file-folder relative z-10 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-3 filter drop-shadow-md">
                                {renderIcon('folder', 56)}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-br from-file-folder/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex flex-col gap-1.5 px-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[14px] font-extrabold text-text-primary truncate" title={folder.name}>{folder.name}</span>
                                <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg border border-border-color bg-bg-secondary text-text-secondary hover:text-text-primary transition-all"><MoreVertical size={14} /></button>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-text-secondary">
                                <span className="bg-file-folder/10 text-file-folder px-2 py-0.5 rounded-md">{folder.items} items</span>
                                <span>•</span>
                                <span>{folder.size}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {displayedFiles.map(file => (
                          <div
                            key={`file-${file.id}`}
                            className={`group bg-bg-secondary rounded-[22px] border p-4 transition-all duration-400 cursor-pointer hover:shadow-soft hover:-translate-y-1.5 transform-gpu relative ${selectedItem?.id === file.id && selectedItem?.type !== 'folder' ? 'border-accent-primary ring-2 ring-accent-primary/20 bg-accent-primary/[0.03] shadow-lg shadow-accent-primary/10' : 'border-border-color hover:border-file-${file.type}/40 hover:bg-bg-tertiary/20'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(file);
                            }}
                          >
                            {selectedItem?.id === file.id && selectedItem?.type !== 'folder' && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-primary text-white rounded-full flex items-center justify-center shadow-lg animate-scale-up z-20">
                                <Check size={14} strokeWidth={3} />
                              </div>
                            )}
                            <div className="aspect-[4/3] bg-bg-tertiary/50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden transition-all group-hover:bg-bg-secondary shadow-inner">
                              {file.preview ? (
                                <img src={file.preview} alt={file.name} className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-115" loading="lazy" />
                              ) : (
                                <div className={`text-file-${file.type} relative z-10 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-3 filter drop-shadow-md`}>
                                  {renderIcon(file.type, 56)}
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex flex-col gap-1.5 px-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[14px] font-extrabold text-text-primary truncate" title={file.name}>{file.name}</span>
                                <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg border border-border-color bg-bg-secondary text-text-secondary hover:text-text-primary transition-all"><MoreVertical size={14} /></button>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-text-secondary">
                                <span className={`text-file-${file.type} opacity-80 uppercase tracking-tighter text-[10px]`}>{getKindString(file.type)}</span>
                                <span>•</span>
                                <span>{file.size}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="animate-fade-in bg-bg-secondary rounded-[26px] border border-border-color overflow-hidden shadow-soft mb-10 transition-all duration-500">
                        <div className="grid grid-cols-[1.5fr_1fr_0.8fr_1fr_0.80fr_48px] gap-4 p-4 px-8 border-b border-border-color bg-bg-tertiary/20 text-[11px] font-extrabold text-text-secondary uppercase tracking-[0.16em]">
                          <div className="pl-1.5">Name</div>
                          <div className="hidden lg:block">Owner</div>
                          <div className="hidden lg:block">Kind</div>
                          <div className="hidden lg:block">Modified</div>
                          <div className="text-right pr-4">Size</div>
                          <div></div>
                        </div>
                        <div className="divide-y divide-border-color/20">
                          {displayedFolders.map(folder => (
                            <div
                              key={`folder-${folder.id}`}
                              className={`group grid grid-cols-[1.5fr_1fr_0.8fr_1fr_0.80fr_48px] gap-4 p-4 px-8 items-center cursor-pointer transition-all duration-200 hover:bg-hover-highlight relative ${selectedItem?.id === folder.id && selectedItem?.type === 'folder' ? 'bg-file-folder/[0.08] shadow-[inset_4px_0_0_0_var(--color-file-folder)] ring-1 ring-file-folder/20' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateToFolder(folder);
                              }}
                            >
                              <div className="flex items-center gap-4 min-w-0">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-file-folder/10 text-file-folder shadow-sm transition-all">
                                  {renderIcon('folder', 18)}
                                </div>
                                <span className="text-[14px] font-bold text-text-primary truncate">{folder.name}</span>
                              </div>
                              <div className="hidden lg:flex items-center gap-2.5 text-[13px] text-text-secondary font-semibold">
                                {renderOwnerAvatar(folder.owner)}
                                <span className="truncate">{folder.owner === 'me' ? 'Only me' : folder.owner}</span>
                              </div>
                              <div className="hidden lg:block">
                                <span className="text-[10px] font-extrabold text-file-folder bg-file-folder/10 px-2 py-0.5 rounded-md uppercase tracking-tight">Folder</span>
                              </div>
                              <div className="hidden lg:block text-[13px] text-text-secondary font-medium">{folder.date}</div>
                              <div className="text-[13px] text-text-secondary font-bold text-right pr-4">{folder.size}</div>
                              <div className="flex justify-end pr-1">
                                <button className="p-2 rounded-xl text-text-secondary hover:bg-bg-secondary hover:border-border-color border border-transparent transition-all"><MoreVertical size={16} /></button>
                              </div>
                            </div>
                          ))}
                          {displayedFiles.map(file => (
                            <div
                              key={`file-${file.id}`}
                              className={`group grid grid-cols-[1.5fr_1fr_0.8fr_1fr_0.80fr_48px] gap-4 p-4 px-8 items-center cursor-pointer transition-all duration-200 hover:bg-hover-highlight relative ${selectedItem?.id === file.id && selectedItem?.type !== 'folder' ? 'bg-accent-primary/[0.08] shadow-[inset_4px_0_0_0_var(--accent-primary)] ring-1 ring-accent-primary/20' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(file);
                              }}
                            >
                              <div className="flex items-center gap-4 min-w-0">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-file-${file.type}/10 text-file-${file.type} shadow-sm transition-all`}>
                                  {renderIcon(file.type, 18)}
                                </div>
                                <span className="text-[14px] font-bold text-text-primary truncate">{file.name}</span>
                              </div>
                              <div className="hidden lg:flex items-center gap-2.5 text-[13px] text-text-secondary font-semibold">
                                {renderOwnerAvatar(file.owner)}
                                <span className="truncate">{file.owner === 'me' ? 'Only me' : file.owner}</span>
                              </div>
                              <div className="hidden lg:block text-[10px] font-extrabold text-text-secondary opacity-60 uppercase tracking-tight">{getKindString(file.type)}</div>
                              <div className="hidden lg:block text-[13px] text-text-secondary font-medium">{file.date}</div>
                              <div className="text-[13px] text-text-secondary font-bold text-right pr-4">{file.size}</div>
                              <div className="flex justify-end pr-1">
                                <button className="p-2 rounded-xl text-text-secondary hover:bg-bg-secondary hover:border-border-color border border-transparent transition-all"><MoreVertical size={16} /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </section>

          <aside className="w-[340px] bg-bg-secondary border-l border-border-color flex flex-col overflow-y-auto z-5 hidden lg:flex shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.02)]" onClick={(e) => e.stopPropagation()}>
            {selectedItem ? (
              <div className="animate-fade-in flex flex-col h-full">
                <div className="p-8 pb-4 flex items-center justify-between sticky top-0 bg-bg-secondary/80 backdrop-blur-md z-10">
                  <h2 className="text-[18px] font-extrabold text-text-primary tracking-tight">Information</h2>
                  <button className="flex items-center justify-center p-2 rounded-xl text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-all active:scale-90" onClick={() => setSelectedItem(null)}>
                    <X size={18} />
                  </button>
                </div>

                <div className="p-8 pt-2">
                  <div className="aspect-square bg-bg-tertiary/50 rounded-[32px] mb-8 flex items-center justify-center overflow-hidden shadow-inner border border-border-color/50 group relative">
                    {selectedItem.preview ? (
                      <img src={selectedItem.preview} alt={selectedItem.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-file-${selectedItem.type} transform transition-transform group-hover:scale-110 duration-500`}>
                        {renderIcon(selectedItem.type, 96)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <div className="mb-10 text-center">
                    <h3 className="text-xl font-extrabold text-text-primary mb-1.5 break-words line-clamp-2 px-2" title={selectedItem.name}>{selectedItem.name}</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-tertiary rounded-full text-[11px] font-extrabold text-text-secondary uppercase tracking-widest border border-border-color/50">
                      {selectedItem.type === 'folder' ? 'Folder' : getKindString(selectedItem.type)}
                    </div>
                  </div>

                  <div className="flex gap-3 mb-10">
                    <button className="flex-1 flex items-center justify-center gap-2.5 bg-bg-tertiary text-text-secondary p-3.5 rounded-2xl font-bold text-sm transition-all hover:bg-bg-primary hover:text-text-primary border border-border-color shadow-sm active:scale-95 group">
                      <Share2 size={16} className="group-hover:rotate-12 transition-transform" /> Share
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2.5 bg-accent-gradient text-white p-3.5 rounded-2xl font-bold text-sm transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-accent-primary/20 active:translate-y-0 active:scale-95 shadow-md shadow-accent-primary/10 group">
                      <Download size={16} className="group-hover:translate-y-0.5 transition-transform" /> Save
                    </button>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-border-color/50">
                    <div className="flex items-center justify-between group">
                      <span className="text-[11px] uppercase font-extrabold text-text-secondary tracking-[0.15em]">Size</span>
                      <span className="text-[13px] text-text-primary font-bold bg-bg-tertiary/50 px-2.5 py-1 rounded-lg transition-colors group-hover:bg-bg-tertiary">{selectedItem.size || '--'}</span>
                    </div>
                    <div className="flex items-center justify-between group">
                      <span className="text-[11px] uppercase font-extrabold text-text-secondary tracking-[0.15em]">Modified</span>
                      <span className="text-[13px] text-text-primary font-bold bg-bg-tertiary/50 px-2.5 py-1 rounded-lg transition-colors group-hover:bg-bg-tertiary">{selectedItem.date || '--'}</span>
                    </div>
                    <div className="flex items-center justify-between group">
                      <span className="text-[11px] uppercase font-extrabold text-text-secondary tracking-[0.15em]">Owner</span>
                      <div className="flex items-center gap-2 bg-bg-tertiary/50 px-2 py-1 rounded-lg transition-colors group-hover:bg-bg-tertiary">
                        {selectedItem.owner && renderOwnerAvatar(selectedItem.owner)}
                        <span className="text-[13px] text-text-primary font-bold truncate max-w-[100px]">{selectedItem.owner === 'me' ? 'Only me' : selectedItem.owner}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in opacity-60">
                <div className="w-24 h-24 bg-bg-tertiary rounded-[32px] flex items-center justify-center text-text-secondary mb-6 border border-border-color/50">
                  <FileIcon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">No selection</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Select a file or folder to view its detailed information and actions.
                </p>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* Mobile Actions FAB */}
      <button className="fixed right-6 bottom-6 w-14 h-14 bg-accent-gradient text-white rounded-full flex items-center justify-center shadow-2xl z-20 cursor-pointer active:scale-95 transition-transform md:hidden shadow-accent-primary/30">
        <UploadCloud size={24} />
      </button>

      {/* Create Space Modal */}
      {isCreateSpaceModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsCreateSpaceModalOpen(false)}>
          <div className="bg-bg-secondary border border-border-color rounded-[32px] w-full max-w-md p-10 shadow-soft animate-scale-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">New Workspace</h2>
                <p className="text-sm text-text-secondary font-medium">Set up a dedicated space for your files.</p>
              </div>
              <button className="flex items-center justify-center p-2.5 rounded-2xl border border-border-color bg-bg-tertiary text-text-secondary transition-all hover:bg-bg-primary hover:text-text-primary active:scale-90" onClick={() => setIsCreateSpaceModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8">
              <div className="group">
                <label className="block text-[11px] font-extrabold text-text-secondary uppercase tracking-[0.14em] mb-3 ml-1">Workspace Name</label>
                <div className="relative">
                  <input
                    id="new-space-name"
                    type="text"
                    className="w-full bg-bg-tertiary/50 border border-border-color/80 rounded-2xl p-4 px-5 text-sm text-text-primary outline-none transition-all placeholder:text-text-secondary/40 font-bold focus:bg-bg-secondary focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10"
                    placeholder="e.g. Design Projects"
                    autoFocus
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-primary opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-text-secondary uppercase tracking-[0.14em] mb-3 ml-1">Initial Quota</label>
                <div className="grid grid-cols-2 gap-3">
                  {['10 GB', '50 GB', '100 GB', 'Unlimited'].map((option) => (
                    <button key={option} className="p-3.5 rounded-2xl border border-border-color bg-bg-tertiary/30 text-xs font-bold text-text-secondary transition-all hover:bg-bg-secondary hover:border-accent-primary/30 hover:text-text-primary focus:bg-bg-secondary focus:border-accent-primary focus:text-accent-primary focus:ring-4 focus:ring-accent-primary/5">
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-12">
              <button
                className="w-full flex items-center justify-center gap-3 bg-accent-gradient text-white p-4 rounded-2xl font-extrabold text-[15px] transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-accent-primary/25 active:translate-y-0 active:scale-[0.98] shadow-lg shadow-accent-primary/10 border border-white/10"
                onClick={() => {
                  const inputEl = document.getElementById('new-space-name') as HTMLInputElement;
                  const newName = inputEl?.value || 'New Custom Space';
                  const newSpace = {
                    id: spaces.length + 1,
                    name: newName,
                    used: '0 GB',
                    total: '50 GB',
                    percentage: 0
                  };
                  setSpaces([...spaces, newSpace]);
                  setActiveSpaceId(newSpace.id);
                  setIsCreateSpaceModalOpen(false);
                }}
              >
                Launch Workspace
                <ChevronRight size={18} />
              </button>
              <button className="w-full p-4 rounded-2xl font-bold text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all" onClick={() => setIsCreateSpaceModalOpen(false)}>
                Think about it later
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
