import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const UserPrivateRoute = () => {

    const userToken = useSelector((state: any)=> state.user.token)

    

  return (
    <>
    {!userToken ? <Navigate to="/register"/> : <Outlet/>}
    </>
  )
}

export default UserPrivateRoute