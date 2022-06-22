### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Documentation ##

## GENERAL ##
- .env anadizinde ise process.env.VARIABLE şeklinde erişiliyor fakat anadizinde değilse dotenv paketi yüklenip o sayfada çağrılarak path belirtilmeli
- REACT uygulamalarında .env dosyalarında REACT_APP_ prefix'i olmak orunda REACT_APP_custom_variable


## Components ##
- view klasöründe 3 ayrı layout var her bir layout kendi içinde component klasörüne sahip old. gibi genel componentler view/components altında
- Input componentine hata array'i veriliyor Inputta input name değerine göre o inputun hatasını arrayden okuyor yani errors array'ına input name'e göre hatalar json olarak geçilecek

## JWT ##
- backend tarafında jwt sign jwt.sign({id}, 'random secret', {expiresIn: '30d'}) ile token üretiyor bu token express-sesion veya cookie-session gibi paketlerle backend tarafında store edilebilir. Ön tarafta localStorage ile store edilecek.

- JWT verify middleware'i yazarken hangi id ile sign edilip token olduysa o id ile request gelmeli yoksa aynı token olmaz

- axios tarafında axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}` şeklinde App.js de redux state'den değer geçildi - ayrı bir dosyada axios.create ile geçileceği zaman oradan react hookları çağrılmadığı için redux'a erişim sağlayamadım.

- google oauth için express-session paketi dependency 
- google oauth passport use işleminin ikinci parametresi mongodb user var mı ve user create + jwt token oluşturuldu bkz: config/passport.js
- google oauth ile loginde [callback] url deki get isteğini yapabilmek için google cloud da Google Api sayfasında bu url localhost:123/auth/google/artık-hangi-url-ise/callback olarak router belirtilmeli + passport strategy e de bu callback url geçilecek toplam 3 ayağı var yani - buradan redirect olan path(component) bilgileri store edip anasayfaya/dashboarda yönlenecek

- JWT token'ı user-admin-kurum için App.js de geçiyordum daha sonra iki auth olunca tokenlar birbirini ezip en son satırdaki kod hangi token ise o token server'a gidiyordu diğeri devredışı kalıyordu daha sonra Layoutlarda token geçildi hangi layouttaysa o auth token gönderiliyor - bu da şuna sebep oluyor ***her bir ana layoutta token'ı pass etmek lazım mesela Projet ve CreateProject sayfaları routerda kurum/ path'ine child değil yani KurumLayouttaki kod orada çalışmıyor orada ayrıca token pass edildi


## Some Notes ##

    useState()
    fonksiyon içinde state yani template'de ulaşılabilir global değişken oluşturuyor
    iki değer alıyor const[birinciDataDeğişken, ikinciDatayıGüncelleyenSetterFonk] = useState(datanınDefaultDeğer)

    useEffect()
    alltaki gibi kullanılırsa value için bir watcher gibi çalışır yani değiştiğinde
    boş olarak çalıştırılırsa sayfa onLoad olduğunda veya component mound olduğunda (her render olduğunda) çalışır
    parametre verildiğinde sadece o parametreLER güncellendiğinde çalışıyor

    useEffect(() => {
    console.log(`${value} has changed`);
    }, [value])

    useRef()
    bir html tag'ı select edileceği zaman vue'daki gibi ref yapılıyor

    const messageBox = useRef()
    const message = useState('')

    <span ref={messageBox}>{message}</span>


    .map içinde onClick çalıştırırsan hata almamak için onClick={() => func() } şeklinde tanımlanmalı

    .map içindeki listeli delete işlemlerinde ilgili fieldda loading göstermek için deleteLoader şeklinde bir state oluştur ve silme işlemi başlayınca ilgili field._id değerini deleteLoader'a ver - listelenen field tarafında da loader tagına className={`${deleteLoader === field._id ? '' : 'hidden'}`}


    Dashboard-Panel de <Noty /> componenti hem process.process_title hem de message.message_template listelemek için kullanılıyor 
## Error & Validation ##
- error için useState(errors, setError) state'i kullanılıyor
- errors arrayi {input'un name değeri: "error message"} şeklinde obj alıyor
- errors arrayi bu şekilde Input component'ine geçiliyor - ***error key'i input'a geçilen name={""} prop'undan alıyor unutulmamalı ve kesinlikle tırnak içinde string olmalı + value değeri ile aynı olmalı bkz: ` <Input value={passport} name={"passport"} errors={errors} /> `
    

## About React Routing ##

      1 - MANUEL STYLE
      <Routes>
        <Route exact path="/" element={<FrontSide />}> // layout (içinde Outlet olduğu için childlerini o outlet viewer da gösterecek)
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route exact path="/kurum" element={<Kurum />}>
          Bu şekilde /kurum tarafının home page'i KurumDashboard oldu  
          <Route path="/kurum" element={<KurumDashboard />} />
          <Route path="login" element={<KurumLogin />} /> 
          <Route exact path="*" element={<KurumError404 />} />
        </Route>

        <Route exact path="/admin" element={<Admin />}>
          <Route exact path="*" element={<Error404 />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} /> 
        </Route> 
      </Routes>
    
      2 - LOOP STYLE WHIC IS NICE
      <Routes>
        {routers.map((route, index) => (
          <Route path={route.path} element={<route.element />} exact={route.exact} key={index} >
            {route.children.map((childRoute, indexChild) => <Route path={childRoute.path} element={<childRoute.element />} exact={childRoute.exact} key={indexChild} /> )}
          </Route> 
        ))}
      </Routes>
  
## EXPRESS ##
express tarafında get metodları app.use(/) altında çalışıyor diğer path ler altındaki file'larda çalışması You need to enable javasript hatası veriyor