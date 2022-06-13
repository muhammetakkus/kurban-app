import {NavLink} from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../store/reducers/auth'

import axios from 'axios'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef()

  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    emailRef.current.focus()
    console.log(user);
    //console.log(username + '-' + password);
  }, [])

  const handleRegister = (e) => {
    e.preventDefault()
    const data = { email, password }

    try {
      axios.post('user/register', data)
      .then((response) => {
        console.log(response.data);
        if(!response.data.error) {
          dispatch(setUser(response.data))
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full max-w-xs">
        <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="rounded-[5px] text-2xl font-bold underline bg-green-300 hover:bg-black text-white">
            FrontSide Register Page
          </p>
          <NavLink className="underline mb-2" to="/">Back to Home</NavLink>
          <div className="mb-4 mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input 
            className="sha dow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="username"
            type="text"
            placeholder="Email"
            ref={emailRef}
            onChange={e => setEmail(e.target.value)}
            value={email}/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*****************"
            onChange={e => setPassword(e.target.value)}
            value={password}/>
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Kayıt
            </button>
            <span className="inline-block align-baseline font-bold text-sm">
              Hesabın var mı?
            </span>
            <NavLink to="/login" className={"text-blue-500 underline"}>Giriş yap</NavLink>
          </div>
        </form>
      </div>
  );
}

export default Register;
