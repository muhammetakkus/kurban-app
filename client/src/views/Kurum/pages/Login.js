import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setKurum } from '../../../store/reducers/auth'

// import loginImage from '../../../assets/templates/img/login-office.jpeg'
// import loginImageDark from '../../../assets/templates/img/login-office-dark.jpeg'

import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(user);
    setError([])
    //console.log(username + '-' + password);
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    const data = { email, password }

    try {
      setLoading(true)
      axios.post('kurum/login', data)
      .then((response) => {
        console.log(response.data)
        setLoading(false)
        if(!response.data.error && !response.data.validation) {
          dispatch(setKurum(response.data))
        } else {
          if(response.data.error) setError({error: response.data.error})
          if(response.data.validation) setError(response.data.validation)
        }
      })
    } catch (error) {
      console.log(error);
      setLoading(true)
    }
  }
    return (
      <div className="flex items-center p-6 bg-gray-50 dark:bg-gray-900">
          <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="flex flex-col overflow-y-auto md:flex-row">
              <div className="h-32 md:h-auto md:w-1/2">
                <img
                  aria-hidden="true"
                  className="object-cover w-full h-full dark:hidden"
                  src="https://images.unsplash.com/photo-1595664652035-0956d50e0311?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1560&q=80"
                  alt="Office"
                />
                <img
                  aria-hidden="true"
                  className="hidden object-cover w-full h-full dark:block"
                  src="https://images.unsplash.com/photo-1595664652035-0956d50e0311?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1560&q=80"
                  alt="Office"
                />
              </div>
              <form onSubmit={handleLogin} className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                  <h1
                    className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Kurum Giriş
                  </h1>

                  <Input className="border-cool-gray-400"
                    id="username"
                    type="text"
                    pholder="Kullanıcı adı veya email"
                    title={"Email veya kullanıcı adı"}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={"email"}
                    errors={errors}
                  />


                 

                  <Input className="border-cool-gray-400"
                    pholder="***************"
                    type="password"
                    id="password"
                    title={"Şifre"}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={"password"}
                    errors={errors}
                  />

                  <Button className="w-full mb-0 mt-4" type="submit" disabled={loading}>
                    {loading ? 'Giriş yapılıyor..' : 'Giriş yap'}
                  </Button>

                  <span className={`pt-1 mt-2 block text-pink-700 text-sm ${errors.error ? "" : "hidden"}`}>{errors.error}</span>

                  <hr className="my-7" />


                  <p className="mt-4">
                    <NavLink to="/kurum/register" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                      Hesap oluştur
                    </NavLink>
                  </p>
                  <p className="mt-1">
                   <NavLink to="/kurum/login"  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">Şifremi unuttum</NavLink>
                  </p>
                </div>
              </form>

            </div>
          </div>
        </div>
    );
  }
  
  export default Login;
  