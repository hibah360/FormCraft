
import formcraftLogo from "../assets/formcraft.png";

function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <img className="logo" src={formcraftLogo} alt="FormCraft" />

      <p className="sidebar-heading">WORKSPACE</p>

      <button
        type="button"
        className={`nav-item ${activePage === "builder" ? "active" : ""}`}
        onClick={() => onNavigate("builder")}
      >
        <span>▦</span> Form Builder
      </button>

      <button
        type="button"
        className={`nav-item ${activePage === "forms" ? "active" : ""}`}
        onClick={() => onNavigate("forms")}
      >
        <span>▤</span> My Forms
      </button>

      <button
        type="button"
        className={`nav-item ${activePage === "submissions" ? "active" : ""}`}
        onClick={() => onNavigate("submissions")}
      >
        <span>▣</span> Submissions
      </button>


      <div className="sidebar-footer">
        <div className="avatar">A</div>
        <div>
          <strong>Admin User</strong>
          <p>Administrator</p>
        </div>
      </div>

      <div className="sidebar-logout">
        <button onClick={onLogout}>
          Logout
        </button>
      </div>
      
    </aside>
  );
}

export default Sidebar;
