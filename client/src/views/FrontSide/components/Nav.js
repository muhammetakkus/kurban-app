import {NavLink} from 'react-router-dom'
import {useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../../store/reducers/auth'
import { useNavigate } from "react-router-dom";

function Nav({testreactprops}) {
    let navigate = useNavigate();
    
    let [isMenuOpen, setIsMenuOpen] = useState(false)
    const responsiveMenuButton = useRef()

    const toggleMenu = () => {
      (isMenuOpen === true) ? setIsMenuOpen(false) : setIsMenuOpen(true)
      console.log(isMenuOpen);
    }

    const closeMenu = () => {
      setIsMenuOpen(false)
    }
    
    const isUser = useSelector(state => state.auth.isUser)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const logout = async () => {
      if(user.googleId) {
        window.open(`${process.env.REACT_APP_API_BASE_URL}logout`, "_self");
      }
      await dispatch(userLogout())
      return navigate("/");
    }

    return (
      <div className={`flex justify-between items-center bg-white w-full p-3 md:py-0 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 `}>
        
        <div className='px-2 flex items-center justify-around z-30'>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 inline cursor-pointer md:hidden`} onClick={toggleMenu} ref={responsiveMenuButton} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
          
          <h1 className='ml-4 text-xl font-semibold'>
            <NavLink to={'/'}>{testreactprops}</NavLink>
          </h1>
        </div>

        <div className={`bg-white border-r border-r-zinc-800/10 absolute left-0 top-0 h-full z-40 w-full drop-shadow-2xl rounded-full rounded-tl-none rounded-tr-none rounded-bl-none transition-all overflow-hidden ${!isMenuOpen ? "!-left-full !-top-full" : "top-0 w-full"} md:static md:w-80 md:drop-shadow-none md:rounded-none md:!bg-none md:border-r-0`}>
          <div className='flex justify-start items-center mt-4 px-6 md:hidden'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" onClick={toggleMenu} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
          <ul className='px-6 mt-6 md:mt-0 block h-full md:flex md:justify-between md:items-center'>
            { 
              isUser === true ? 
              <>
                <li onClick={closeMenu} className='my-3 border-b border-slate-600/20 md:float-left md:border-b-0 px-2 block'><NavLink className={"py-2  block font-medium "} to="/">Anasayfa</NavLink></li>
                <li onClick={() => {logout(); closeMenu();}} className='my-3 border-b border-slate-600/20 md:float-left md:border-b-0 px-2 block'><span className={"py-2 font-medium cursor-pointer"}>Çıkış</span></li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor block" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </>
              :
              <>
                <li onClick={closeMenu} className='my-3 border-b border-slate-600/20 md:float-left md:border-b-0 px-2 block'><NavLink className={"py-2  block font-medium "} to="/">Anasayfa</NavLink></li>
                <li onClick={closeMenu} className='my-3 border-b border-slate-600/20 md:float-left md:border-b-0 px-2 block'><NavLink className={"py-2  block font-medium "} to="login">Login</NavLink></li>
                <li onClick={closeMenu} className='my-3 border-b border-slate-600/20 md:float-left md:border-b-0 px-2 block'><NavLink className={"py-2  block font-medium "} to="register">Register</NavLink></li>
              </>
            }
          </ul>
        </div> 
        
      </div>
    );
  }
  
  export default Nav;
  
  