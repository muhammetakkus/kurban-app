import { NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Icon } from '../../../utils/SVG';
import { adminLogout } from '../../../store/reducers/admin';
import { useDispatch } from 'react-redux';

const menu = [
    {
        _id: 1,
        path: "/admin",
        svg_title: "",
        menu_title: "Dashboard"
    },
    {
        _id: 2,
        path: "/admin/message-api",
        svg_title: "message_template",
        menu_title: "Mesaj API"
    }
]

export default function LeftMenuContent () {
    const [menus, setMenus] = useState([]);
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(adminLogout())
      }

    useEffect(() => {
        setMenus(menu)
    }, [])

    return (
    <>
        <ul className="mt-6">
            {menus && menus.map((menu) =>  (
                    <li key={menu._id}>
                        <NavLink to={menu.path} className={({ isActive }) => isActive ? "relative px-6 py-3 block text-indigo-600" : "relative px-6 py-3 block"} end={true}>
                            <span
                                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200"
                                >
                                <Icon name={menu.svg_title ? menu.svg_title : 'home'} />
                                <span className="ml-3">{menu.menu_title}</span>
                            </span>
                        </NavLink>
                    </li>
                )
                    
              )}

                <li className="cursor-pointer" onClick={logout}>
                    <p className="relative px-6 py-3 block text-black relative px-6 py-3 block" >
                        <span
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200"
                            >
                            <svg
                                className="w-5 h-5 mr- stroke-2"
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                ></path>
                            </svg>
                            <span className="ml-3">Logout</span>
                        </span>
                    </p>
                </li>
        </ul>
    </>
    );
}