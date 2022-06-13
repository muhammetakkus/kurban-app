import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useState} from 'react'

import Nav from './components/Nav'
import Footer from './components/Footer'
import axios from 'axios'



import {MainContext} from './pages/context'

function FrontSideLayout() {
  
  // Context Örneği
  const [deger, /*setEt*/] = useState('Kurban')
  const data = {
    deger
  }
  
  // user token'ı request e geç  
  const isUserAuth = useSelector((state) => state.auth.isUser)
  const user = useSelector((state) => state.auth.user)
  if(isUserAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

  return (
    
    <div className='w-full'>

      <Nav testreactprops={deger} />

      <div className='container mx-auto mt-12'>
        
        <Outlet />

      </div>
      
      <MainContext.Provider value={data}>
        {/*<Test />*/}
        {/*<Footer />*/}
      </MainContext.Provider>

      <Footer />

    </div>
    
  );
}

export default FrontSideLayout;
