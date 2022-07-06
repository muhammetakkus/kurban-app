import { Navigate } from 'react-router-dom';

import GoogleAuth from '../utils/GoogleAuth'

/* */
import FrontSide from '../views/FrontSide/FrontSideLayout'
import Home from '../views/FrontSide/pages/Home'
import Login from '../views/FrontSide/pages/Login'
import Register from '../views/FrontSide/pages/Register'
import Sepet from '../views/FrontSide/pages/Sepet'
import KurbanInfo from '../views/FrontSide/pages/KurbanInfo'
import KurbanSorgula from '../views/FrontSide/pages/KurbanSorgula'

/* */
import Kurum from '../views/Kurum/KurumLayout'
import KurumDashboard from '../views/Kurum/pages/Dashboard'
import KurumProject from '../views/Kurum/pages/Project/Project'
import CreateProject from '../views/Kurum/pages/Project/CreateProject'
import CreateBuyukbas from '../views/Kurum/pages/BuyukBasKurban/CreateBuyukbas'
import EditBuyukbas from '../views/Kurum/pages/BuyukBasKurban/EditBuyukbas'
import CreateHisse from '../views/Kurum/pages/CreateHisse'
import Hissedar from '../views/Kurum/pages/Hissedar'
import MessageTemplate from '../views/Kurum/pages/MessageTemplate/MessageTemplate'
import CreateMessageTemplate from '../views/Kurum/pages/MessageTemplate/CreateMessageTemplate'
import EditMessageTemplate from '../views/Kurum/pages/MessageTemplate/EditMessageTemplate'
import Process from '../views/Kurum/pages/Process/Process'
import CreateProcess from '../views/Kurum/pages/Process/CreateProcess'
import EditProcess from '../views/Kurum/pages/Process/EditProcess'
import KucukbasKurban from '../views/Kurum/pages/KucukbasKurban'
import HisseGroup from '../views/Kurum/pages/HisseGroup/HisseGroup'
import EditHisseGroup from '../views/Kurum/pages/HisseGroup/EditHisseGroup'
import CreateHisseGroup from '../views/Kurum/pages/HisseGroup/CreateHisseGroup'

import Ekran from '../views/Kurum/pages/Ekran/Ekran'
import EkranManagement from '../views/Kurum/pages/Ekran/EkranManagement'
import CreateEkranDynamic from '../views/Kurum/pages/Ekran/CreateEkranDynamic'
import CreateEkranStatic from '../views/Kurum/pages/Ekran/CreateEkranStatic'

import KurumLogin from '../views/Kurum/pages/Login'
import KurumRegister from '../views/Kurum/pages/Register'
// import KurumError404 from '../views/Kurum/pages/E404'

/* */
import Admin from '../views/Admin/AdminLayout'
import AdminDashboard from '../views/Admin/pages/Dashboard'
import AdminLogin from '../views/Admin/pages/Login'
import AdminError404 from '../views/Admin/pages/E404'

import SomeComponent from '../views/SomeComponent'

 
// bu Navigate 'e state prop olarak userLocation() hook'u vermen gerekebilir. redirect ile alakalı bug olursa


// isLoggedIn useRoutes() react-router-dom hook'una geçilen router'a gönderilen değişken
const routers = (isUserAuth, isKurumAuth, isAdminAuth) => [
    {
        path: '/google-auth',
        exact: true,
        element: <GoogleAuth />
    },
    {
        path: '/kurban-info/:kurban_code',
        element: <KurbanInfo />
    },
    /* */
    {
        path: '/',
        exact: true,
        element: <FrontSide />, // main path içinde outlet var child routeları orada gösterir
        children: [
            {
                path: '/',
                exact: false,
                element: <Home />,
            },
            {
                path: '/login',
                exact: false,
                element:  !isUserAuth ? <Login /> : <Navigate to="/" replace />,
            },
            {
                path: '/register',
                exact: false,
                element: !isUserAuth ? <Register /> : <Navigate to="/" replace />,
            },
            {
                path: '/sepet',
                exact: false,
                auth: true,
                element: isUserAuth ? <Sepet /> : <Navigate to="/" replace />,
            },
            {
                path: '/kurban-sorgula',
                element: <KurbanSorgula />
            },
            /*{
                path: '*',
                exact: false,
                element: <Home />,
            },*/
        ]
    },
    // project sayfası hem /kurum/project şeklinde olsun hem de kurum altında nested olmayıp onun templatine girmemiş oldu
    {
        path: '/kurum/project',
        exact: true,
        element: isKurumAuth ? <KurumProject /> : <Navigate to="/kurum/login" replace />,
    },
    {
        path: '/kurum/create-project',
        exact: false, // true olsa ne oluyor false olsa ne oluyor bak?
        element: isKurumAuth ? <CreateProject /> :  <Navigate to="/kurum/login" replace />,
    },
    {
        path: '/kurum/login',
        exact: false,
        element: !isKurumAuth ? <KurumLogin /> :  <Navigate to="/kurum/project" replace />,
    },
    {
        path: '/kurum/register',
        exact: false,
        element: !isKurumAuth ? <KurumRegister /> :  <Navigate to="/kurum/project" replace />,
    },
    // main route auth: true olunca alt rotalara da ulaşılmıyor alt rota auth: false olsa da (halbuki child rota olan login sayfasaına ulaşmak lazım bunun için childlara tek tek auth false veya true propsunu geçiyorum)
    {
        path: '/kurum',
        exact: true,
        element:  isKurumAuth ? <Kurum /> : <Navigate to="/kurum/login" replace />,
        children: [
            {
                path: 'dashboard/:project_id',
                exact: false,
                element: <KurumDashboard />,
            },

            {
                path: 'create-buyukbas',
                exact: false,
                element: <CreateBuyukbas />
            },
            {
                path: 'edit-buyukbas',
                exact: false,
                element: <EditBuyukbas />
            },
            {
                path: 'hissedar', // kurum_id ile CRUD
                exact: false,
                element: <Hissedar />
            },
            {
                path: 'hisse-grup/:project_id',
                exact: false,
                element: <HisseGroup />
            },
            {
                path: 'create-hisse-grup',
                exact: false,
                element: <CreateHisseGroup />
            },
            {
                path: 'edit-hisse-grup',
                exact: false,
                element: <EditHisseGroup />
            },
            {
                path: 'message-template', // kurum_id ile CRUD
                exact: false,
                element: <MessageTemplate />
            },
            {
                path: 'create-message-template', // kurum_id ile CRUD
                exact: false,
                element: <CreateMessageTemplate />
            },
            {
                path: 'edit-message-template', // kurum_id ile CRUD
                exact: false,
                element: <EditMessageTemplate />
            },
            {
                path: 'process', // kurum_id ile CRUD
                exact: false,
                element: <Process /> 
            },
            {
                path: 'edit-process',
                exact: false,
                element: <EditProcess /> 
            },
            {
                path: 'create-process',
                exact: false,
                element: <CreateProcess />
            },
            {
                path: 'create-hisse',
                exact: false,
                element: <CreateHisse />
            },
            {
                path: 'kucukbas-kurban/:project_id',
                exact: false,
                element: <KucukbasKurban />
            },
            {
                path: 'ekran-management',
                exact: false,
                element: <EkranManagement />
            },
            {
                path: 'ekran',
                exact: false,
                element: <Ekran />
            },
            {
                path: 'create-ekran-static',
                exact: false,
                element: <CreateEkranStatic />
            },
            {
                path: 'create-ekran-dynamic',
                exact: false,
                element: <CreateEkranDynamic />
            },
            {
                path: '*',
                exact: false,
                element: <Navigate to="/kurum/login" replace />,// element: <KurumError404 />
            },
        ]
    },
    /* */
    {
        path: '/admin/login',
        element: !isAdminAuth ? <AdminLogin /> :  <Navigate to="/admin" replace />,
    },
    {
        path: '/admin',
        exact: true,
        element: isAdminAuth ? <Admin /> : <Navigate to="/admin/login" />,
        redirect: '/',
        children: [
            {
                path: '/admin',
                element: <AdminDashboard />
            },
            {
                path: '*',
                element: <AdminError404 />
            },
        ]
    },
    {
        path: '/some',
        exact: true,
        element: <SomeComponent />
    }

]

export default routers;