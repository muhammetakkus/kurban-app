

//import { /*Outlet*/ Routes, Route } from 'react-router-dom'

//import Login from '../pages/Login'

export default function SomeComponent() {

    let welcomeText = 'Welcome Some Component!'

    return (
      <div>
        <h1 className="bg-purple-500 text-white group-hover:!bg-slate-500 transition rounded-[5px] text-2xl font-bold underline p-[1rem]">
          {welcomeText}
        </h1>
      </div>
    )
  }