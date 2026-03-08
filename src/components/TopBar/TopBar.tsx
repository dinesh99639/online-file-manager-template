import { Menu, Search, Palette, Bell } from 'lucide-react';
import type { Theme } from '../../types';

interface TopBarProps {
  setIsSidebarOpen: (open: boolean) => void;
  themePickerRef: React.RefObject<HTMLDivElement | null>;
  isThemePickerOpen: boolean;
  setIsThemePickerOpen: (open: boolean) => void;
  themes: Theme[];
  theme: string;
  setTheme: (theme: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  setIsSidebarOpen,
  themePickerRef,
  isThemePickerOpen,
  setIsThemePickerOpen,
  themes,
  theme,
  setTheme
}) => {
  return (
    <header
      className="h-[64px] min-h-[64px] flex items-center justify-between px-6 md:px-8 bg-glass-bg backdrop-blur-xl border-b border-border-color z-10 shadow-sm sticky top-0"
      onClick={(e) => {
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
  );
};

export default TopBar;
