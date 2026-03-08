import {
  UploadCloud, X, Database, ChevronDown, Plus, LayoutDashboard, History as HistoryIcon, Star, Trash2, CloudSync, File as FileIcon, RefreshCw
} from 'lucide-react';
import type { Space } from '../types';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  spaceDropdownRef: React.RefObject<HTMLDivElement | null>;
  isSpaceDropdownOpen: boolean;
  setIsSpaceDropdownOpen: (open: boolean) => void;
  spaces: Space[];
  activeSpace: Space;
  activeSpaceId: number;
  setActiveSpaceId: (id: number) => void;
  currentSection: string;
  handleRefreshSimulate: (section: string) => void;
  setIsCreateSpaceModalOpen: (open: boolean) => void;
  setSelectedItem: (item: any) => void;
  setCurrentSection: (section: string) => void;
  setCurrentPath: (path: any[]) => void;
  setIsLoading: (loading: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  spaceDropdownRef,
  isSpaceDropdownOpen,
  setIsSpaceDropdownOpen,
  spaces,
  activeSpace,
  activeSpaceId,
  setActiveSpaceId,
  currentSection,
  handleRefreshSimulate,
  setIsCreateSpaceModalOpen,
  setSelectedItem,
  setCurrentSection,
  setCurrentPath,
  setIsLoading
}) => {
  return (
    <aside className={`fixed md:relative top-0 left-0 bottom-0 w-[240px] bg-bg-tertiary border-r border-border-color flex flex-col p-6 z-30 transition-all duration-400 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full shadow-2xl'}`} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-10 px-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent-primary/20 transform-gpu hover:scale-105 active:scale-95">
            <UploadCloud size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-extrabold tracking-tight">Files</span>
        </div>
        <button className="flex items-center justify-center p-2 rounded-xl border border-border-color bg-bg-secondary text-text-secondary transition-all hover:bg-bg-primary hover:text-text-primary md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <div className="relative mb-8" ref={spaceDropdownRef}>
        <div className="text-[10px] font-extrabold text-text-secondary uppercase tracking-[0.2em] mb-2 px-1">Active Space</div>
        <button
          className={`flex items-center justify-between w-full p-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 group border ${isSpaceDropdownOpen ? 'bg-bg-secondary border-accent-primary shadow-lg ring-4 ring-accent-primary/10' : 'bg-bg-tertiary/50 border-border-color/60 hover:border-accent-primary hover:bg-bg-secondary hover:shadow-md'}`}
          onClick={() => setIsSpaceDropdownOpen(!isSpaceDropdownOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <Database size={16} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-[13px] font-bold text-text-primary truncate w-full">{activeSpace.name}</span>
              <span className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-tighter">Shared Workspace</span>
            </div>
          </div>
          <ChevronDown size={16} className={`text-text-secondary transition-transform duration-300 ${isSpaceDropdownOpen ? 'rotate-180 text-accent-primary' : ''}`} />
        </button>

        <div className={`absolute top-full left-0 w-full mt-2 bg-bg-secondary border border-border-color rounded-xl shadow-lg z-50 overflow-hidden ${isSpaceDropdownOpen ? 'block animate-fade-in' : 'hidden'}`}>
          {spaces.map(space => (
            <div
              key={space.id}
              className={`p-3 px-4 cursor-pointer flex items-center gap-3 text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary ${activeSpaceId === space.id ? 'bg-accent-primary/10 text-accent-primary' : ''}`}
              onClick={() => {
                setActiveSpaceId(space.id);
                setIsSpaceDropdownOpen(false);
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
        <NavItem 
          icon={<LayoutDashboard size={18} />} 
          label="My Files" 
          active={currentSection === 'my-files'} 
          onClick={() => handleRefreshSimulate('my-files')} 
        />
        <NavItem 
          icon={<HistoryIcon size={18} />} 
          label="Recent" 
          active={currentSection === 'recent'} 
          onClick={() => handleRefreshSimulate('recent')} 
        />
        <NavItem 
          icon={<Star size={18} />} 
          label="Starred" 
          active={currentSection === 'starred'} 
          onClick={() => handleRefreshSimulate('starred')} 
        />
        <NavItem 
          icon={<Trash2 size={18} />} 
          label="Trash" 
          active={currentSection === 'trash'} 
          onClick={() => handleRefreshSimulate('trash')} 
        />
        <div className="h-px bg-border-color/50 my-4 mx-2"></div>
      </nav>

      <div className="mt-auto px-1">
        <StorageIndicator activeSpace={activeSpace} />
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <div
    className={`flex items-center gap-3 p-2.5 px-4 rounded-xl cursor-pointer transition-all ${active ? 'text-accent-primary font-bold bg-bg-secondary shadow-md ring-1 ring-accent-primary/20' : 'text-text-secondary hover:bg-bg-primary/50 hover:text-text-primary'}`}
    onClick={onClick}
  >
    {icon}
    <span className="text-[14px]">{label}</span>
  </div>
);

const StorageIndicator: React.FC<{ activeSpace: Space }> = ({ activeSpace }) => (
  <div className="bg-bg-secondary/40 border border-border-color/50 rounded-2xl p-4 shadow-sm relative overflow-hidden group/storage">
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
      <StorageDetail icon={<Database size={12} className="opacity-50" />} label="Space Used" value={activeSpace.used} />
      <StorageDetail icon={<FileIcon size={12} className="opacity-50" />} label="File Count" value={activeSpace.filesCount.toLocaleString()} />
      <StorageDetail icon={<RefreshCw size={12} className="opacity-50" />} label="Transfer" value={`${activeSpace.bandwidth}/mo`} />
    </div>

    <div className="mt-4 pt-3 border-t border-border-color/30 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
        <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest">{activeSpace.status}</span>
      </div>
      <span className="text-[10px] font-extrabold text-text-secondary hover:text-accent-primary cursor-pointer transition-colors">Upgrade</span>
    </div>
  </div>
);

const StorageDetail: React.FC<{ icon: React.ReactNode, label: string, value: string | number }> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between text-[11px] font-bold">
    <div className="flex items-center gap-2 text-text-secondary">
      {icon}
      <span>{label}</span>
    </div>
    <span className="text-text-primary font-black">{value}</span>
  </div>
);

export default Sidebar;
