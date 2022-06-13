//import { NavLink } from 'react-router-dom'

import axios from "axios"
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { setUser } from '../store/reducers/auth'

export default function Home() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = () => {
      axios.get("/login/success", { 
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      })
      .then(async res => {
        if(res.data.success) {
          await dispatch(setUser(res.data.user))
          navigate('/')
        } else {
          console.log('passport google oauth ilgili hata var!!')
        }
      });
    } 

    getUser();
  }, []);

    /*return (
      <div></div>
    )*/
  }