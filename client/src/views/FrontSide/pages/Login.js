import {NavLink} from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../store/reducers/auth'

import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef()

  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const signInWithGoogle = () => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}google`, "_self");
  }

  useEffect(() => {
    emailRef.current.focus()
    console.log(user);
    //console.log(username + '-' + password);
  }, [])

  const handeleLogin = (e) => {
    e.preventDefault()
    const data = { email, password }

    try {
      axios.post('user/login', data)
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

  const getUsers = () => {
    try {
      axios.get('users')
      .then((response) => {
        console.log(response.data);
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full max-w-xs">
        <form onSubmit={handeleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="rounded-[5px] text-2xl font-bold underline bg-green-300 hover:bg-black text-white">
            FrontSide Login Page
          </p>
          <NavLink className="underline mb-2" to="/">Back to Home</NavLink>
          <div className="mb-4 mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input 
            className="sha dow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="username"
            type="text"
            placeholder="Username"
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
              Giriş
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="test">
              Şifremi unuttum?
            </a>
          </div>
          <p onClick={getUsers}>Get Users</p>
          <button onClick={signInWithGoogle}>Sign In with Google!!</button>
        </form>
      </div>
  );
}

export default Login;
