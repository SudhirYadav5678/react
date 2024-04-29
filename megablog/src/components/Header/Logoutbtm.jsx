import React from "react"
import {useDispatch} from "react-redux"
import authService from '../../appwrite/config'
import {logout} from '../../store/authSlice'

function Logoutbtm() {
    const dispatch= useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button className="bg-grey-400">Logout</button>
  )
}

export default Logoutbtm