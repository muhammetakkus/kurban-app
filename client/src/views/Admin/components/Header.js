import {NavLink} from 'react-router-dom'
function Header() {
    return (
      <div>
        <p>Admin Header Component</p>
        {/* end={true} ana route'ın sürekli seçili olduğunu zannetmesni önlüyor aksi halde ana route sürekli aktif oluyor  */}
        <NavLink to="/admin" className={({ isActive }) => isActive ? "text-white" : "text-red"} end={true}>-Admin-</NavLink>
        <NavLink to={"/admin/login"}  className={({ isActive }) => isActive ? "text-white" : "text-red"}>-Admin Login-</NavLink>
        <NavLink to="/admin/" className={({ isActive }) => isActive ? "text-white" : "text-red"}>
          -Admin Dashboard-
        </NavLink>
      </div>
    );
  }
  
  export default Header;
  