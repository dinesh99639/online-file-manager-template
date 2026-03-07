import { useState, useEffect } from 'react';
import {
  Folder, Image as ImageIcon, FileText, Video, MoreVertical,
  Search, Bell, Settings, Moon, Sun, UploadCloud, Download, Share2,
  Grid as GridIcon, List as ListIcon, Home, Clock, Star, Trash2,
  Menu, X, ChevronDown, ChevronRight, Plus
} from 'lucide-react';

// Dummy data
const files = [
  { id: 1, parentId: null, name: 'Project Requirements.pdf', type: 'doc', size: '2.4 MB', date: 'Oct 24, 2023', owner: 'me' },
  { id: 2, parentId: null, name: 'Website Mockups.png', type: 'image', size: '4.8 MB', date: 'Oct 23, 2023', owner: 'Sarah J.', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop' },
  { id: 3, parentId: null, name: 'Marketing Campaign.mp4', type: 'video', size: '124 MB', date: 'Oct 21, 2023', owner: 'me', preview: 'https://images.unsplash.com/photo-1516280440502-85f5e55e5b38?q=80&w=400&auto=format&fit=crop' },
  { id: 4, parentId: null, name: 'Q3 Financial Report.xlsx', type: 'doc', size: '1.2 MB', date: 'Oct 20, 2023', owner: 'Alex M.' },
  { id: 5, parentId: null, name: 'Brand Guidelines.pdf', type: 'doc', size: '5.1 MB', date: 'Oct 19, 2023', owner: 'me' },
  { id: 6, parentId: 1, name: 'Logo Iterations.zip', type: 'doc', size: '15.2 MB', date: 'Oct 25, 2023', owner: 'me' },
  { id: 7, parentId: 1, name: 'Color Palette.png', type: 'image', size: '1.1 MB', date: 'Oct 23, 2023', owner: 'Sarah J.', preview: 'https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?q=80&w=400&auto=format&fit=crop' },
];

const folders = [
  { id: 1, parentId: null, name: 'Design Assets', items: 42, size: '2.4 GB', date: 'Oct 25, 2023', owner: 'me' },
  { id: 2, parentId: null, name: 'Client Documents', items: 128, size: '8.1 GB', date: 'Oct 12, 2023', owner: 'me' },
  { id: 3, parentId: null, name: 'Personal', items: 15, size: '450 MB', date: 'Sep 30, 2023', owner: 'me' },
  { id: 4, parentId: null, name: 'Project Phoenix', items: 84, size: '1.2 GB', date: 'Aug 14, 2023', owner: 'Sarah J.' },
  { id: 5, parentId: 1, name: 'Icons', items: 12, size: '5 MB', date: 'Oct 25, 2023', owner: 'me' },
  { id: 6, parentId: 1, name: 'Fonts', items: 4, size: '20 MB', date: 'Oct 24, 2023', owner: 'me' }
];

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
    { id: 1, name: 'Personal Storage', used: '15 GB', total: '20 GB', percentage: 75 },
    { id: 2, name: 'Work Drive', used: '45 GB', total: '100 GB', percentage: 45 },
    { id: 3, name: 'Project Phoenix', used: '2 GB', total: '10 GB', percentage: 20 }
  ]);
  const [activeSpaceId, setActiveSpaceId] = useState(1);
  const [isSpaceDropdownOpen, setIsSpaceDropdownOpen] = useState(false);
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentPath, setCurrentPath] = useState([{ id: null as number | null, name: 'My Files' }]);

  const activeSpace = spaces.find(s => s.id === activeSpaceId) || spaces[0];
  const currentFolderId = currentPath[currentPath.length - 1].id;
  const displayedFolders = folders.filter(f => f.parentId === currentFolderId);
  const displayedFiles = files.filter(f => f.parentId === currentFolderId);

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

  const getKindString = (type: string) => {
    switch (type) {
      case 'folder': return 'Folder';
      case 'image': return 'Image';
      case 'doc': return 'Document';
      case 'video': return 'Video';
      default: return 'File';
    }
  };

  const renderOwnerAvatar = (owner: string) => {
    if (owner === 'me') {
      return <img src="https://ui-avatars.com/api/?name=Dinesh&background=6366f1&color=fff" alt="me" className="row-avatar" />;
    }
    return <div className="row-avatar-fallback">{owner.charAt(0)}</div>;
  };

  const handleRefreshSimulate = () => {
    setSelectedItem(null);
    setIsLoading(true);
    setIsSidebarOpen(false);
    setTimeout(() => setIsLoading(false), 200);
  };

  const navigateToFolder = (folder: any) => {
    setSelectedItem(null);
    setIsLoading(true);
    setCurrentPath([...currentPath, { id: folder.id, name: folder.name }]);
    setTimeout(() => setIsLoading(false), 200);
  };

  const navigateToBreadcrumb = (index: number) => {
    if (index === currentPath.length - 1) return;
    setSelectedItem(null);
    setIsLoading(true);
    setCurrentPath(currentPath.slice(0, index + 1));
    setTimeout(() => setIsLoading(false), 200);
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

        <div className="content-wrapper" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Content Area */}
          <section className="content-area">
            <div className="toolbar animate-fade-in" style={{ animationDelay: '0.1s', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div className="breadcrumbs" style={{ marginBottom: 0 }}>
                {currentPath.map((item, index) => (
                  <div key={item.id || 'root'} style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      className={index === currentPath.length - 1 ? "breadcrumb-current" : "breadcrumb-item"}
                      onClick={() => navigateToBreadcrumb(index)}
                    >
                      {item.name}
                    </span>
                    {index < currentPath.length - 1 && (
                      <ChevronRight size={16} className="breadcrumb-separator" />
                    )}
                  </div>
                ))}
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
                {displayedFolders.length === 0 && displayedFiles.length === 0 ? (
                  <div className="empty-state animate-fade-in">
                    <div className="empty-state-icon">
                      <Folder size={40} />
                    </div>
                    <h3 className="empty-state-title">This folder is empty</h3>
                    <p className="empty-state-text">
                      Drag and drop files here to upload, or use the button below to get started.
                    </p>
                    <div className="empty-state-action">
                      <button className="btn-primary">
                        <Plus size={18} />
                        Upload Files
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {viewMode === 'grid' ? (
                      <div className="animate-fade-in file-grid">
                        {displayedFolders.map(folder => (
                          <div
                            key={`folder-${folder.id}`}
                            className={`file-card ${selectedItem?.id === folder.id && selectedItem?.type === 'folder' ? 'selected' : ''}`}
                            onClick={() => navigateToFolder(folder)}
                          >
                            <div className="file-preview">
                              <div className="preview-icon folder">
                                <Folder size={48} fill="currentColor" />
                              </div>
                            </div>
                            <div className="file-details">
                              <div className="type-icon folder">
                                <Folder size={18} fill="currentColor" />
                              </div>
                              <div className="file-info">
                                <div className="file-name" title={folder.name}>{folder.name}</div>
                                <div className="file-meta">{folder.items} items • {folder.size}</div>
                              </div>
                              <button className="options-btn"><MoreVertical size={16} /></button>
                            </div>
                          </div>
                        ))}
                        {displayedFiles.map(file => (
                          <div
                            key={`file-${file.id}`}
                            className={`file-card ${selectedItem?.id === file.id && selectedItem?.type !== 'folder' ? 'selected' : ''}`}
                            onClick={() => setSelectedItem(file)}
                          >
                            <div className="file-preview">
                              {file.preview ? (
                                <img src={file.preview} alt={file.name} className="preview-img" loading="lazy" />
                              ) : (
                                <div className={`preview-icon ${file.type}`}>
                                  {renderIcon(file.type)}
                                </div>
                              )}
                            </div>
                            <div className="file-details">
                              <div className={`type-icon ${file.type}`}>
                                {renderIcon(file.type)}
                              </div>
                              <div className="file-info">
                                <div className="file-name" title={file.name}>{file.name}</div>
                                <div className="file-meta">{file.date} • {file.size}</div>
                              </div>
                              <button className="options-btn"><MoreVertical size={16} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="animate-fade-in list-container">
                        <div className="list-header">
                          <div className="col-name">Name</div>
                          <div className="col-owner mobile-hide">Owner</div>
                          <div className="col-kind mobile-hide">Kind</div>
                          <div className="col-date mobile-hide">Date Modified</div>
                          <div className="col-size">Size</div>
                          <div className="col-actions"></div>
                        </div>
                        <div className="list-body">
                          {displayedFolders.map(folder => (
                            <div
                              key={`folder-${folder.id}`}
                              className={`list-row ${selectedItem?.id === folder.id && selectedItem?.type === 'folder' ? 'selected' : ''}`}
                              onClick={() => navigateToFolder(folder)}
                            >
                              <div className="col-name">
                                <div className="row-icon folder">
                                  <Folder size={20} fill="currentColor" />
                                </div>
                                <span className="row-name">{folder.name}</span>
                              </div>
                              <div className="col-owner mobile-hide">
                                {renderOwnerAvatar(folder.owner)}
                                {folder.owner}
                              </div>
                              <div className="col-kind mobile-hide">Folder</div>
                              <div className="col-date mobile-hide">{folder.date}</div>
                              <div className="col-size">{folder.size}</div>
                              <div className="col-actions">
                                <button className="icon-btn-small"><MoreVertical size={16} /></button>
                              </div>
                            </div>
                          ))}
                          {displayedFiles.map(file => (
                            <div
                              key={`file-${file.id}`}
                              className={`list-row ${selectedItem?.id === file.id && selectedItem?.type !== 'folder' ? 'selected' : ''}`}
                              onClick={() => setSelectedItem(file)}
                            >
                              <div className="col-name">
                                <div className={`row-icon ${file.type}`}>
                                  {renderIcon(file.type)}
                                </div>
                                <span className="row-name">{file.name}</span>
                              </div>
                              <div className="col-owner mobile-hide">
                                {renderOwnerAvatar(file.owner)}
                                {file.owner}
                              </div>
                              <div className="col-kind mobile-hide">{getKindString(file.type)}</div>
                              <div className="col-date mobile-hide">{file.date}</div>
                              <div className="col-size">{file.size}</div>
                              <div className="col-actions">
                                <button className="icon-btn-small"><MoreVertical size={16} /></button>
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

          {selectedItem && (
            <aside className="details-pane animate-fade-in">
              <div className="details-header">
                <h2 className="details-title">Details</h2>
                <button className="icon-btn-small" onClick={() => setSelectedItem(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="details-preview">
                {selectedItem.preview ? (
                  <img src={selectedItem.preview} alt={selectedItem.name} className="details-img" />
                ) : (
                  <div className={`details-icon ${selectedItem.type}`}>
                    {renderIcon(selectedItem.type)}
                  </div>
                )}
              </div>

              <div className="details-info">
                <h3 className="details-name">{selectedItem.name}</h3>
                <div className="details-type">{selectedItem.type === 'folder' ? 'Folder' : getKindString(selectedItem.type)}</div>
              </div>

              <div className="details-actions">
                <button className="btn-secondary" style={{ flex: 1 }}>
                  <Share2 size={16} style={{ marginRight: '6px' }} /> Share
                </button>
                <button className="btn-primary" style={{ flex: 1 }}>
                  <Download size={16} /> Download
                </button>
              </div>

              <div className="details-meta-list">
                <div className="meta-item">
                  <span className="meta-label">Size</span>
                  <span className="meta-value">{selectedItem.size || '--'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Date Modified</span>
                  <span className="meta-value">{selectedItem.date || '--'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Owner</span>
                  <span className="meta-value" style={{ display: 'flex', alignItems: 'center' }}>
                    {selectedItem.owner && renderOwnerAvatar(selectedItem.owner)}
                    {selectedItem.owner || '--'}
                  </span>
                </div>
              </div>
            </aside>
          )}
        </div>
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
