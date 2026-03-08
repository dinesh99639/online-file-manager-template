import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Plus, UploadCloud, Folder } from 'lucide-react';

// Types & Config
import type { Space, FolderItem } from './types';
import { files as initialFiles, folders as initialFolders } from './constants';
import { themes } from './themes';

// Components
import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import FileGrid from './components/FileGrid/FileGrid';
import FileList from './components/FileList/FileList';
import BulkActionBar from './components/BulkActionBar/BulkActionBar';
import FileDetailsPanel from './components/FileDetailsPanel/FileDetailsPanel';
import ContextMenu from './components/ContextMenu/ContextMenu';
import CreateSpaceModal from './components/CreateSpaceModal/CreateSpaceModal';

export default function App() {
  // Theme & View State
  const [theme, setTheme] = useState(() => localStorage.getItem('appTheme') || 'light');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => (localStorage.getItem('viewMode') as 'grid' | 'list') || 'grid');
  
  // Data State
  const [spaces, setSpaces] = useState<Space[]>([
    { id: 1, name: 'Personal Storage', used: '15.4 GB', filesCount: 1250, bandwidth: '4.2 GB', status: 'Healthy' },
    { id: 2, name: 'Work Drive', used: '45.2 GB', filesCount: 5400, bandwidth: '12.8 GB', status: 'Encrypted' },
    { id: 3, name: 'Project Phoenix', used: '2.1 GB', filesCount: 320, bandwidth: '1.2 GB', status: 'Archived' }
  ]);
  const [activeSpaceId, setActiveSpaceId] = useState(1);
  const [currentPath, setCurrentPath] = useState<{ id: number | null, name: string }[]>([{ id: null, name: 'My Files' }]);
  const [currentSection, setCurrentSection] = useState('my-files');

  // UI State
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSpaceDropdownOpen, setIsSpaceDropdownOpen] = useState(false);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, item: any, type: 'file' | 'folder' | 'background' } | null>(null);
  
  // Selection State
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const spaceDropdownRef = useRef<HTMLDivElement>(null);
  const themePickerRef = useRef<HTMLDivElement>(null);

  // Derived State
  const activeSpace = useMemo(() => spaces.find(s => s.id === activeSpaceId) || spaces[0], [spaces, activeSpaceId]);
  const currentFolderId = currentPath[currentPath.length - 1].id;

  const { folders: displayedFolders, files: displayedFiles } = useMemo(() => {
    switch (currentSection) {
      case 'recent':
        return {
          folders: [],
          files: initialFiles.filter(f => !f.isDeleted && f.lastAccessed).sort((a, b) => new Date(b.lastAccessed!).getTime() - new Date(a.lastAccessed!).getTime())
        };
      case 'starred':
        return {
          folders: initialFolders.filter(f => !f.isDeleted && f.isStarred),
          files: initialFiles.filter(f => !f.isDeleted && f.isStarred)
        };
      case 'trash':
        return {
          folders: initialFolders.filter(f => f.isDeleted),
          files: initialFiles.filter(f => f.isDeleted)
        };
      default:
        return {
          folders: initialFolders.filter(f => !f.isDeleted && f.parentId === currentFolderId),
          files: initialFiles.filter(f => !f.isDeleted && f.parentId === currentFolderId)
        };
    }
  }, [currentSection, currentFolderId]);

  // Effects
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (spaceDropdownRef.current && !spaceDropdownRef.current.contains(event.target as Node)) {
        setIsSpaceDropdownOpen(false);
      }
      if (themePickerRef.current && !themePickerRef.current.contains(event.target as Node)) {
        setIsThemePickerOpen(false);
      }
      const contextMenuEl = document.getElementById('context-menu');
      if (contextMenuEl && !contextMenuEl.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handlers
  const handleRefreshSimulate = useCallback((section = 'my-files') => {
    setSelectedItem(null);
    setIsLoading(true);
    setIsSidebarOpen(false);
    setCurrentSection(section);
    setCurrentPath([{ id: null, name: section === 'my-files' ? 'My Files' : section.charAt(0).toUpperCase() + section.slice(1) }]);
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  const navigateToFolder = useCallback((folder: FolderItem) => {
    setSelectedItem({ ...folder, type: 'folder' });
    setIsLoading(true);
    setCurrentSection('my-files');
    setCurrentPath(prev => [...prev, { id: folder.id, name: folder.name }]);
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  const deselectToFolder = useCallback(() => {
    const cfId = currentPath[currentPath.length - 1].id;
    if (cfId === null) {
      setSelectedItem(null);
    } else {
      const folder = initialFolders.find(f => f.id === cfId);
      if (folder) setSelectedItem({ ...folder, type: 'folder' });
    }
  }, [currentPath]);

  const navigateToBreadcrumb = useCallback((index: number) => {
    if (index === currentPath.length - 1) return;
    setCurrentSection('my-files');
    const childInPath = currentPath[index + 1];
    setIsLoading(true);
    setCurrentPath(prev => prev.slice(0, index + 1));
    if (childInPath && childInPath.id !== null) {
      const folderToSelect = initialFolders.find(f => f.id === childInPath.id);
      setSelectedItem(folderToSelect ? { ...folderToSelect, type: 'folder' } : null);
    } else {
      setSelectedItem(null);
    }
    setTimeout(() => setIsLoading(false), 200);
  }, [currentPath]);

  const handleContextMenu = useCallback((e: React.MouseEvent, item: any = null, type: 'file' | 'folder' | 'background' = 'background', alignToElement = false) => {
    e.preventDefault();
    e.stopPropagation();
    let x = e.clientX;
    let y = e.clientY;
    if (alignToElement) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left;
      y = rect.bottom + 8;
    }
    if (type === 'background') deselectToFolder();
    x = Math.min(x, window.innerWidth - 260);
    y = Math.min(y, window.innerHeight - 320);
    setContextMenu({ x, y, item, type });
  }, [deselectToFolder]);

  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode(prev => {
      if (prev) setSelectedIds(new Set());
      setSelectedItem(null);
      return !prev;
    });
  }, []);

  const toggleItemSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-primary text-text-primary transition-colors duration-500 font-jakarta antialiased selection:bg-accent-primary/20">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
        spaceDropdownRef={spaceDropdownRef} isSpaceDropdownOpen={isSpaceDropdownOpen} setIsSpaceDropdownOpen={setIsSpaceDropdownOpen}
        spaces={spaces} activeSpace={activeSpace} activeSpaceId={activeSpaceId} setActiveSpaceId={setActiveSpaceId}
        currentSection={currentSection} handleRefreshSimulate={handleRefreshSimulate}
        setIsCreateSpaceModalOpen={setIsCreateSpaceModalOpen}
        setSelectedItem={setSelectedItem} setCurrentSection={setCurrentSection}
        setCurrentPath={setCurrentPath} setIsLoading={setIsLoading}
      />

      <main className="flex-1 flex flex-col min-w-0 bg-bg-primary relative" onClick={deselectToFolder}>
        <TopBar 
          setIsSidebarOpen={setIsSidebarOpen} themePickerRef={themePickerRef}
          isThemePickerOpen={isThemePickerOpen} setIsThemePickerOpen={setIsThemePickerOpen}
          themes={themes} theme={theme} setTheme={setTheme}
        />

        <div className="flex-1 flex overflow-hidden">
          <section className="flex-1 p-0 overflow-hidden min-w-0 flex flex-col relative" onContextMenu={(e) => handleContextMenu(e)}>
            <div className="flex-1 p-6 md:p-8 flex flex-col min-w-0 min-h-0 h-full overflow-hidden" onClick={(e) => { e.stopPropagation(); deselectToFolder(); }}>
              {isSelectionMode && <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gradient z-50 animate-pulse shadow-[0_2px_10px_rgba(99,102,241,0.5)]"></div>}

              <Breadcrumbs 
                currentPath={currentPath} navigateToBreadcrumb={navigateToBreadcrumb}
                handleContextMenu={handleContextMenu} viewMode={viewMode} setViewMode={(m: any) => setViewMode(m)}
              />

              <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar -mx-2 px-2 pb-8">
                {isLoading ? (
                  <div className="flex items-center justify-center h-[200px] animate-fade-in">
                    <div className="w-6 h-6 border-[3px] border-border-color border-t-accent-primary rounded-full animate-spin"></div>
                  </div>
                ) : displayedFolders.length === 0 && displayedFiles.length === 0 ? (
                  <EmptyState />
                ) : viewMode === 'grid' ? (
                  <FileGrid 
                    displayedFolders={displayedFolders} displayedFiles={displayedFiles}
                    isSelectionMode={isSelectionMode} selectedIds={selectedIds} selectedItem={selectedItem}
                    toggleItemSelection={toggleItemSelection} navigateToFolder={navigateToFolder}
                    setSelectedItem={setSelectedItem} handleContextMenu={handleContextMenu}
                  />
                ) : (
                  <FileList 
                    displayedFolders={displayedFolders} displayedFiles={displayedFiles}
                    isSelectionMode={isSelectionMode} selectedIds={selectedIds} selectedItem={selectedItem}
                    toggleItemSelection={toggleItemSelection} navigateToFolder={navigateToFolder}
                    setSelectedItem={setSelectedItem} handleContextMenu={handleContextMenu}
                    setSelectedIds={setSelectedIds}
                  />
                )}
              </div>
            </div>

            <BulkActionBar 
              selectedCount={selectedIds.size} onClear={() => { setSelectedIds(new Set()); setIsSelectionMode(false); }}
              onAction={(action) => console.log('Bulk Action:', action)}
            />
          </section>

          <FileDetailsPanel selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </div>
      </main>

      <button className="fixed right-6 bottom-6 w-14 h-14 bg-accent-gradient text-white rounded-full flex items-center justify-center shadow-2xl z-20 cursor-pointer active:scale-95 transition-transform md:hidden" onClick={() => setIsSelectionMode(!isSelectionMode)}>
        <UploadCloud size={24} />
      </button>

      <CreateSpaceModal 
        isOpen={isCreateSpaceModalOpen} onClose={() => setIsCreateSpaceModalOpen(false)}
        spaces={spaces} setSpaces={setSpaces} setActiveSpaceId={setActiveSpaceId}
      />

      {contextMenu && (
        <ContextMenu 
          x={contextMenu.x} y={contextMenu.y} item={contextMenu.item} type={contextMenu.type}
          isSelectionMode={isSelectionMode} onClose={() => setContextMenu(null)}
          toggleSelectionMode={toggleSelectionMode}
        />
      )}
    </div>
  );
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center p-20 bg-bg-secondary border-2 border-dashed border-border-color rounded-[20px] mt-5 animate-fade-in shadow-sm">
    <div className="w-20 h-20 bg-bg-tertiary rounded-[24px] flex items-center justify-center text-text-secondary mb-6 opacity-80 mix-blend-luminosity shadow-sm">
      <Folder size={40} />
    </div>
    <h3 className="text-xl font-bold text-text-primary mb-2">This folder is empty</h3>
    <p className="text-sm text-text-secondary max-w-xs mx-auto mb-6 leading-relaxed">Drag and drop files here to upload, or use the button below to get started.</p>
    <div className="flex gap-3 justify-center">
      <button className="flex items-center gap-2 bg-accent-gradient text-white p-2.5 px-6 rounded-xl font-semibold cursor-pointer transition-all hover:translate-y-[-0.5px] hover:shadow-lg active:translate-y-0 active:scale-95 shadow-md">
        <Plus size={18} /> Upload Files
      </button>
    </div>
  </div>
);
