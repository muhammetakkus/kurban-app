import routers from './routers/index'
import { useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'

 function App() {
  //const navigate = useNavigate()
  //const location = useLocation()

  const isUserAuth = useSelector((state) => state.auth.isUser)
  const isKurumAuth = useSelector((state) => state.auth.isKurum)
  const isAdminAuth = useSelector((state) => state.auth.isAdmin)


  //const activeProjectID = useSelector((state) => state.kurum.active_project_id)
  useEffect(() => {
    // Proje seçilmemişse project sayfasından öteye geçme
    /*if(location.pathname.includes('kurum') && kurum && !activeProjectID) {
      navigate('/kurum/project')
    }*/
  }, [])
  
  // rota objesini tutan fonksiyona login durumunu gönderiyor gerisini useRoutes hook'ı hallediyor
  // eğer 2 - style kullanılacaksa router sayfasında rotaları sadece arrayde tut argumanı ve array func 'ı kaldır
  const routing = useRoutes(routers(isUserAuth, isKurumAuth, isAdminAuth));


  // Kurum-Front-Admin Layoutlarda token header'a geçiliyor. token pass olduktan sonra logout olunca silmesi lazım - bu durum sadece component geçişlerinde var sanırım yani sayfa komple refresh olunca zaten header sıfırlanıyor aslında sadece requestlerde gitse yeterli
  if(!isUserAuth && !isKurumAuth && !isAdminAuth) axios.defaults.headers.common['Authorization'] = `Bearer `
  
  return (
    <div className="App">
      {/* WAY BETTER FOR MIDDLEWARE AND CLEAR */}

      {routing}
   
    </div>
  );
}

export default App;
