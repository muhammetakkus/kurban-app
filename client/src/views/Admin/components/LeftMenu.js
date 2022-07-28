import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom';
import LeftMenuContent from './LeftMenuContent';
import {useDispatch} from "react-redux"
import {setMobileMenu} from  "../../../store/reducers/admin"
import { useEffect } from 'react';

function LeftMenu() {
    const mobileMenu = useSelector(state => state.admin.mobileMenu)
    
    const dispatch = useDispatch()
    const location = useLocation()
    

    useEffect(() => {
      //const currentPath = location.pathname;
      //const searchParams = new URLSearchParams(location.search);
      dispatch(setMobileMenu(false))
    }, [location]);
    
    
    return (
      <>
        {/* Desktop */}
        <div className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
          <div className="py-4 text-gray-500 dark:text-gray-400">
            <span className="ml-6 text-md block font-bold text-gray-800 dark:text-gray-200">
              <NavLink to={`/admin`}>
                Admin Dashboard
              </NavLink>
            </span>

            <LeftMenuContent />
          </div>
      </div>

      {/* Mobile */}
      <div className={`${mobileMenu ? "" : "hidden"} fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden`}>
        <div className="py-4 text-gray-500 dark:text-gray-400">
          {/*
          <span className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
            Kurban
          </span>
          */}

          <LeftMenuContent />
        </div>
      </div>
</>
    );
}

export default LeftMenu;