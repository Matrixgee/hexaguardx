import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Test = () => {

    const userToken = useSelector((state: any) => state.user.token);
 
    const apiUrl = 'https://sk-smoky.vercel.app/api/user/getPostByName';
  

    useEffect(()=>{
        const fetchadd = async ()=>{
          try{
      const response = await fetch(apiUrl,{
        method : "GET",
        headers : {
          'Authorization': `Bearer ${userToken}`,
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({ type: 'btc' })
       
      });
      const fetchRes = await response.json(); 
      console.log("fetch res",fetchRes);
      
      
          }catch(error){
            console.error("Error fetching address:", error);
            toast.error("Failed to fetch gateway details. Please try again later.");
          }
        }
      
        fetchadd()
      },[])






  return (
    <div>

hello
    </div>
  )
}

export default Test