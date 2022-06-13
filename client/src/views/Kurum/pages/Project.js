import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios';
import ProjectList from './ProjectList';
import { useEffect } from 'react';
import {setActiveProjectID} from "../../../store/reducers/kurum.dashboard"
import Header from '../components/Header'

function Project() {
    const dispatch = useDispatch()
    const isKurumAuth = useSelector((state) => state.auth.isKurum)
    const kurum = useSelector((state) => state.auth.kurum)
    if(isKurumAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${kurum.token}`;

    useEffect(() => {
      dispatch(setActiveProjectID(""))
    }, [])
    
    return (
        <>
        <Header />
        <main className="h-full pb-16 overflow-y-auto ">
          <div className="container p-6 mx-auto grid">
     
            <h1 className="text-center text-xl mt-4 font-semibold ">{ kurum.kurum_name } - Projelerim</h1>

            <div className='flex justify-end'>
              <NavLink to={'/kurum/create-project'} className="my-4">Proje Oluştur+</NavLink>
            </div>
            
            <ProjectList />

          </div>
        </main>
        </>
    );
  }
  
  export default Project;