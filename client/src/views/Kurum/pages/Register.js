import {NavLink} from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { setKurum } from '../../../store/reducers/auth'

import axios from 'axios'
import Input from '../../components/Input'
import Button from '../../components/Button'

function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [full_name, setFullName] = useState('')
  const [kurum_name, setKurumName] = useState('')
  const [gsm, setGsm] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  //const emailRef = useRef()
  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    //emailRef.current.focus()
    setError([])
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()
    const data = { 
      email,
      password,
      password2,
      username,
      full_name,
      kurum_name,
      gsm
    }

    
    try {

        setLoading(true)
        axios.post('/kurum/register', data)
        .then((response) => {
          setLoading(false)
          //console.log(response.data);
          if(!response.data.error && !response.data.validation) {
            dispatch(setKurum(response.data))
          } else {
            if(response.data.error) setError({error: response.data.error})
            if(response.data.validation) setError(response.data.validation)
            console.log(errors)
          }
        })  

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
    
    return (
      <div className="flex items-center p-6 bg-gray-50 dark:bg-gray-900">
      <div
        className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
      >
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2 register-cover-img">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleRegister}>
              <h1
                className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
              >
                Kurum Hesabı Oluştur
              </h1>
              

              
              
              <Input className="border-cool-gray-400"
                id="email"
                type="text"
                pholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={"email"}
                title={"Email adresiniz"}
                errors={errors}
              />

              <Input className="border-cool-gray-400"
                id="username"
                type="text"
                pholder="*****************"
                onChange={e => setUsername(e.target.value)}
                value={username}
                name={"username"}
                title="Kullanıcı Adı (Giriş işlemi için)"
                errors={errors}
              />

              <Input className="border-cool-gray-400"
                id="password"
                type="password"
                pholder="*****************"
                onChange={e => setPassword(e.target.value)}
                value={password}
                name={"password"}
                title="Şifreniz"
                errors={errors}
              />

              <Input className="border-cool-gray-400"
                id="password2"
                type="password"
                pholder="*****************"
                onChange={e => setPassword2(e.target.value)}
                value={password2}
                name={"password2"}
                title="Şifrenizi onaylayınız"
                errors={errors}
              />

              <hr className="my-6" />

              <Input className="border-cool-gray-400"
                id="full_name"
                type="text"
                pholder="İsim-Soyisim"
                onChange={e => setFullName(e.target.value)}
                value={full_name}
                name={"full_name"}
                title="Tam İsminiz"
                errors={errors}
              />
              
              <Input className="border-cool-gray-400"
                id="kurum_name"
                type="text"
                pholder="Kurum adı"
                onChange={e => setKurumName(e.target.value)}
                value={kurum_name}
                name={"kurum_name"}
                title="Kurum adı"
                errors={errors}
              />

              <Input className="border-cool-gray-400"
                id="gsm"
                type="text"
                pholder="İrtibat GSM"
                onChange={e => setGsm(e.target.value)}
                name={"gsm"}
                value={gsm}
                title="İrtibat GSM"
                errors={errors}
              />

              <div className="flex mt-6 text-sm">
                <label className="flex items-center dark:text-gray-400">
                  <input
                    type="checkbox"
                    className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  />
                  <span className="ml-2">
                    <span className="underline cursor-pointer">Gizlilik sözleşmesini</span>
                    <span> okudum ve kabul ediyorum.</span>
                  </span>
                </label>
              </div>

              <Button className="w-full mb-0 mt-4" type="submit" disabled={loading}>Hesap oluştur</Button>

              <span className={`py-1 mt-2 block text-pink-700 text-sm ${errors.error ? "" : "hidden"}`}>{errors.error}</span>
              
              <hr className="my-6" />

              <span className='inline-block py-2'>Hesabın var mı?</span>
              <NavLink to="/kurum/login" className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                Giriş yap
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default Register;
  