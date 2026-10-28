
import formcraftLogo from "../assets/formcraft.png";

function Sidebar({ activePage, isCollapsed, onToggle, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img className="logo" src={formcraftLogo} alt="FormCraft" />
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          aria-controls="sidebar-navigation"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "›" : "‹"}
        </button>
      </div>

      <p className="sidebar-heading">WORKSPACE</p>

      <nav id="sidebar-navigation" aria-label="Workspace">
        <button
          type="button"
          className={`nav-item ${activePage === "builder" ? "active" : ""}`}
          onClick={() => onNavigate("builder")}
          aria-label="Form Builder"
          title="Form Builder"
        >
          <span className="nav-icon" aria-hidden="true">▦</span>
          <span className="nav-label">Form Builder</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activePage === "forms" ? "active" : ""}`}
          onClick={() => onNavigate("forms")}
          aria-label="My Forms"
          title="My Forms"
        >
          <span className="nav-icon" aria-hidden="true">▤</span>
          <span className="nav-label">My Forms</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activePage === "submissions" ? "active" : ""}`}
          onClick={() => onNavigate("submissions")}
          aria-label="Submissions"
          title="Submissions"
        >
          <span className="nav-icon" aria-hidden="true">▣</span>
          <span className="nav-label">Submissions</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">A</div>
        <div className="sidebar-user-details">
          <strong>Admin User</strong>
          <p>Administrator</p>
        </div>
      </div>

      <div className="sidebar-logout">
        <button onClick={onLogout} aria-label="Logout" title="Logout">
          <span className="logout-icon" aria-hidden="true">↪</span>
          <span className="logout-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
