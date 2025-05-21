import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"
import AdminMenu from "./AdminMenu"


const Admin = () => {
  return (
    <>
    <div className='w-full h-[100vh] flex'>
        <div className='w-[20%] h-[100%] bg-green-500 phone:hidden'>
            <AdminMenu/>
        </div>
        <div className='w-full h-[100%] bg-slate-100 flex  flex-col'>
            <AdminHeader/>
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default Admin