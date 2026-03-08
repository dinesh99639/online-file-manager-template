import { ChevronRight, LayoutDashboard, Folder, Grid as GridIcon, List as ListIcon } from 'lucide-react';

interface BreadcrumbsProps {
  currentPath: any[];
  navigateToBreadcrumb: (index: number) => void;
  handleContextMenu: (e: React.MouseEvent, item: any, type: 'file' | 'folder' | 'background', alignToElement: boolean) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPath,
  navigateToBreadcrumb,
  handleContextMenu,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex items-center justify-between mb-8 animate-fade-in transform-gpu" onClick={(e) => e.stopPropagation()}>
      <nav className="flex items-center gap-0.5 px-1 py-0.5 rounded-xl transition-all duration-300">
        {currentPath.map((item, index) => (
          <div key={item.id || 'root'} className="flex items-center">
            <button
              className={`flex items-center gap-2.5 cursor-pointer transition-all duration-200 p-2 px-3 rounded-lg group ${index === currentPath.length - 1
                ? "text-text-primary font-bold"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/80"
                }`}
              onClick={() => navigateToBreadcrumb(index)}
            >
              <div className={`transition-colors duration-200 ${index === currentPath.length - 1 ? "text-accent-primary" : "text-text-secondary/60 group-hover:text-text-primary"}`}>
                {index === 0 ? <LayoutDashboard size={16} strokeWidth={2} /> : <Folder size={16} strokeWidth={2} />}
              </div>
              <span className="text-[14px] tracking-tight">{item.name}</span>
            </button>
            {index < currentPath.length - 1 && (
              <ChevronRight size={14} className="mx-0.5 text-text-secondary/30" strokeWidth={1.5} />
            )}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 bg-accent-gradient text-white p-2.5 px-6 rounded-xl font-bold text-sm shadow-lg shadow-accent-primary/25 hover:translate-y-[-1px] hover:shadow-xl active:translate-y-0 active:scale-95 transition-all"
          onClick={(e) => handleContextMenu(e, null, 'background', true)}
        >
          Actions
        </button>

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
    </div>
  );
};

export default Breadcrumbs;
