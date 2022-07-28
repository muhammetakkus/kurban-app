import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setAdmin } from '../../../store/reducers/admin'

import axios from 'axios'
import Input from '../../components/Input'
import Button from '../../components/Button'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const admin = useSelector((state) => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(admin);
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    const data = { email, password }

    try {
      setLoading(true)
      axios.post('/admin/login', data)
      .then((response) => {
        console.log(response.data)
        setLoading(false)
        if(!response.data.error && !response.data.validation) {
          dispatch(setAdmin(response.data))
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
      <div className="flex items-center p-6 bg-gray-50 dark:bg-gray-900 mt-5">
          <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <form onSubmit={handleLogin} className="flex items-center justify-center p-12">
                <div className="w-full">
                  <h1
                    className="mb-4 text-center text-xl font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Kurban App | Admin Login
                  </h1>

                  <Input className="border-cool-gray-400"
                    id="username"
                    type="text"
                    pholder="Email"
                    title={"Email"}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={"email"}
                    errors={errors}
                  />

                  <Input className="border-cool-gray-400"
                    pholder="***************"
                    type="password"
                    id="password"
                    title={"Password"}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={"password"}
                    errors={errors}
                  />

                  <Button className="w-full mb-0 mt-4" type="submit" disabled={loading}>
                    {loading ? '...' : 'Login'}
                  </Button>

                  <span className={`pt-1 mt-2 block text-pink-700 text-sm ${errors.error ? "" : "hidden"}`}>{errors.error}</span>

                </div>
              </form>
          </div>
        </div>
    );
  }
  
  export default Login;
  