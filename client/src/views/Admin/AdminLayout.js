import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import LeftMenu from './components/LeftMenu'


function AdminLayout() {

  // Admin varsa token'ı header'a geç
  const isAdminAuth = useSelector((state) => state.admin.isAdmin)
  const admin = useSelector((state) => state.admin)
  if(isAdminAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${admin.admin.token}`;

  return (
    <div className='flex h-screen bg-gray-50 dark:bg-gray-900'>
          
    <LeftMenu />

    <div className="flex flex-col flex-1">
      <Header />
      
      <main className="h-full pb-16 overflow-y-auto">
        <div className="container p-6 mx-auto grid dark:text-gray-200">

          <Outlet /> 
    
        </div>
      </main>
    </div>

    </div>
  );
}

export default AdminLayout;
