import { useState, useEffect } from 'react';
import {
  Folder, Image as ImageIcon, FileText, Video, MoreVertical,
  Search, Bell, Settings, Moon, Sun, UploadCloud, ChevronRight,
  Grid as GridIcon, List as ListIcon, Home, Clock, Star, Trash2,
  Menu, X, ChevronDown, Plus
} from 'lucide-react';

// Dummy data
const recentFiles = [
  { id: 1, name: 'Project Requirements.pdf', type: 'doc', size: '2.4 MB', date: 'Oct 24, 2023' },
  { id: 2, name: 'Website Mockups.png', type: 'image', size: '4.8 MB', date: 'Oct 23, 2023' },
  { id: 3, name: 'Marketing Campaign.mp4', type: 'video', size: '124 MB', date: 'Oct 21, 2023' },
  { id: 4, name: 'Q3 Financial Report.xlsx', type: 'doc', size: '1.2 MB', date: 'Oct 20, 2023' }
];

const folders = [
  { id: 1, name: 'Design Assets', items: 42, size: '2.4 GB' },
  { id: 2, name: 'Client Documents', items: 128, size: '8.1 GB' },
  { id: 3, name: 'Personal', items: 15, size: '450 MB' },
  { id: 4, name: 'Project Phoenix', items: 84, size: '1.2 GB' }
];

export default function App() {
  const [theme, setTheme] = useState('light');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [spaces, setSpaces] = useState([
    { id: 1, name: 'Personal Storage', used: '15 GB', total: '20 GB', percentage: 75 },
    { id: 2, name: 'Work Drive', used: '45 GB', total: '100 GB', percentage: 45 },
    { id: 3, name: 'Project Phoenix', used: '2 GB', total: '10 GB', percentage: 20 }
  ]);
  const [activeSpaceId, setActiveSpaceId] = useState(1);
  const [isSpaceDropdownOpen, setIsSpaceDropdownOpen] = useState(false);
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);

  const activeSpace = spaces.find(s => s.id === activeSpaceId) || spaces[0];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Simulate network loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder fill="currentColor" />;
      case 'image': return <ImageIcon fill="currentColor" />;
      case 'doc': return <FileText fill="currentColor" />;
      case 'video': return <Video fill="currentColor" />;
      default: return <FileText fill="currentColor" />;
    }
  };

  const handleRefreshSimulate = () => {
    setIsLoading(true);
    setIsSidebarOpen(false);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="app-container">
      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay animate-fade-in" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="logo-icon">
              <UploadCloud size={24} />
            </div>
            TeleFiles
          </div>
          <button className="icon-btn mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="space-selector">
          <button
            className="space-btn"
            onClick={() => setIsSpaceDropdownOpen(!isSpaceDropdownOpen)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></div>
              {activeSpace.name}
            </div>
            <ChevronDown size={16} />
          </button>

          <div className={`space-dropdown ${isSpaceDropdownOpen ? 'open' : ''}`}>
            {spaces.map(space => (
              <div
                key={space.id}
                className={`space-item ${activeSpaceId === space.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSpaceId(space.id);
                  setIsSpaceDropdownOpen(false);
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 800);
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: activeSpaceId === space.id ? 'var(--accent-primary)' : 'var(--text-secondary)' }}></div>
                {space.name}
              </div>
            ))}
            <div className="space-divider"></div>
            <div
              className="space-item"
              style={{ color: 'var(--accent-primary)', fontWeight: 500 }}
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

        <nav>
          <div className="nav-item active">
            <Home size={20} />
            <span>My Files</span>
          </div>
          <div className="nav-item" onClick={handleRefreshSimulate}>
            <Clock size={20} />
            <span>Recent</span>
          </div>
          <div className="nav-item">
            <Star size={20} />
            <span>Starred</span>
          </div>
          <div className="nav-item">
            <Trash2 size={20} />
            <span>Trash</span>
          </div>
        </nav>

        <div className="storage-wrapper">
          <div className="storage-header">
            <span>Storage</span>
            <span>{activeSpace.percentage}%</span>
          </div>
          <div className="storage-bar-bg">
            <div
              className="storage-bar-fill"
              style={{ width: `${activeSpace.percentage}%`, transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            ></div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            {activeSpace.used} of {activeSpace.total} used
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="search-bar">
              <Search size={18} color="var(--text-secondary)" />
              <input type="text" placeholder="Search files, folders..." className="search-input" />
            </div>
          </div>

          <div className="actions-group">
            <button className="btn-primary mobile-hide">
              <UploadCloud size={18} />
              Upload
            </button>
            <button className="icon-btn" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="icon-btn mobile-hide">
              <Bell size={20} />
            </button>
            <button className="icon-btn mobile-hide">
              <Settings size={20} />
            </button>

            <div className="user-profile">
              <img src="https://ui-avatars.com/api/?name=Dinesh&background=6366f1&color=fff" alt="User" className="avatar" />
              <div className="user-info">
                <span className="user-name">Dinesh M.</span>
                <span className="user-role">Pro Plan</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="content-area">
          <div className="breadcrumbs animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="breadcrumb-item">My Files</span>
            <ChevronRight size={16} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Documents</span>
          </div>

          <div className="toolbar animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div>
              <h1 className="section-title">Documents</h1>
              <p className="section-subtitle">Manage all your creative assets and projects.</p>
            </div>

            <div className="view-toggles">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <GridIcon size={18} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <ListIcon size={18} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="loader-container animate-fade-in">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {/* Folders */}
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Folders</h2>
                <div className="file-grid">
                  {folders.map(folder => (
                    <div key={folder.id} className="file-card">
                      <button className="options-btn"><MoreVertical size={16} /></button>
                      <div className="file-icon-wrapper folder">
                        {renderIcon('folder')}
                      </div>
                      <div className="file-name" title={folder.name}>{folder.name}</div>
                      <div className="file-meta">
                        <span>{folder.items} items</span>
                        <span>{folder.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Files */}
              <div className="animate-fade-in" style={{ animationDelay: '0.4s', marginTop: '40px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Recent Files</h2>

                {viewMode === 'grid' ? (
                  <div className="file-grid">
                    {recentFiles.map(file => (
                      <div key={file.id} className="file-card">
                        <button className="options-btn"><MoreVertical size={16} /></button>
                        <div className={`file-icon-wrapper ${file.type}`}>
                          {renderIcon(file.type)}
                        </div>
                        <div className="file-name" title={file.name}>{file.name}</div>
                        <div className="file-meta">
                          <span>{file.date}</span>
                          <span>{file.size}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="file-list">
                    {recentFiles.map(file => (
                      <div key={file.id} className="list-item">
                        <div className={`list-item-icon ${file.type}`}>
                          {renderIcon(file.type)}
                        </div>
                        <div className="list-item-name">{file.name}</div>
                        <div className="list-item-date mobile-hide">{file.date}</div>
                        <div className="list-item-size">{file.size}</div>
                        <button className="icon-btn"><MoreVertical size={18} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

        </section>
      </main>

      {/* Mobile Actions FAB */}
      <button className="fab mobile-show">
        <UploadCloud size={24} />
      </button>

      {/* Create Space Modal */}
      {isCreateSpaceModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateSpaceModalOpen(false)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Create New Space</h2>
              <button className="icon-btn" onClick={() => setIsCreateSpaceModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Space Name</label>
              <input
                id="new-space-name"
                type="text"
                className="form-input"
                placeholder="e.g. Finance Documents"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Storage Quota</label>
              <select className="form-input">
                <option>10 GB</option>
                <option>50 GB</option>
                <option>100 GB</option>
                <option>Unlimited</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setIsCreateSpaceModalOpen(false)}>
                Cancel
              </button>
              <button
                className="btn-primary"
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
                Create Space
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
