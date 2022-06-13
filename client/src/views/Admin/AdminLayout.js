import { Outlet, NavLink } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Header from './components/Header'


function KurumLayout() {

  // Admin varsa token'ı header'a geç
  const isAdminAuth = useSelector((state) => state.auth.isAdmin)
  const admin = useSelector((state) => state.auth.admin)
  if(isAdminAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${admin.token}`;

  return (
    <div className='container mx-auto px-5 mx-4'>
      <Header />

      <p>Admin Main Component  </p>
      <NavLink to="/">Go FrontSide Home Page</NavLink>

      <Outlet />
    </div>
  );
}

export default KurumLayout;
