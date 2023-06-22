import { NavLink } from 'react-router-dom'
import MenuService from "../../../services/MenuService";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux"
import { Icon } from '../../../utils/SVG';

export default function LeftMenuContent () {
    const project_id = useSelector(state => state.kurum.active_project_id)
    const kurum = useSelector(state => state.auth.kurum)
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const getMenus = async () => {
            const request = await MenuService.getAll();
            setMenus(request.data)
        }
        getMenus()
    }, [])

    return (
    <>
        <ul className="mt-6">
            {menus && menus.map((menu) =>  (
                    <li key={menu._id}>
                        <NavLink to={`${menu.path}${menu.project_id ? "/"+project_id : ""}`} className={"relative px-6 py-3 block"}>
                            <span
                                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <Icon name={menu.svg_title} />
                                <span className="ml-3">{menu.menu_title}</span>
                            </span>
                        </NavLink>
                    </li>
                )
              )}
        </ul>
        
        <div className="px-6 my-6">
            <NavLink to={'/kurum/project'}
            className="flex items-center justify-start w-full p-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Projeler</span>
            </NavLink>
        </div>

        <div className="px-6 my-6">
            <a href={`http://188.132.238.149/onkayit/${kurum._id}`} target='_blank'
            className='flex items-center justify-center w-full p-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'>
                <span>Ön Kayıt Sayfası</span>
            </a>
        </div>
    </>
    );
}