import { use, useEffect, useState } from "react";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function User(){
    const [users,setusers]=useState([]);
    const [filter,setFilter]=useState("");
    
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then((res)=>{
          setusers(res.data.user)
        })
    },[filter])
    
    return <div>
        <div className="font-bold mt-6">Users</div>
        <div className="my-2">
            <input onChange={(e)=>{
              
                setFilter(e.target.value)
            }} className="w-full border border-slate-300 px-2 py-1" type="text" placeholder="Search User..."></input>
        </div>
        <div>   
            {users.map((u)=>{
                 return <Users user={u}></Users>
            })}
        </div>
    </div>
}
function Users({user}){
    const navigate=useNavigate();
    console.log("hi");
    return <div className="flex justify-between pt-2">
        <div className ="flex">
            <div className="rounded-full flex  bg-slate-400 w-12 h-12 justify-center ">
                <div className="flex flex-col justify-center items-center text-xl">
                   { user.firstname[0]}
                </div>
            </div>
            <div className="flex justify-center flex-col pl-2">
            <div className="font-medium text-2xl ">{user.firstname} {user.lastName}</div>
            </div>
        </div>
        <div className="flex flex-col justify-center ">
            <Button onClick={(e)=>{
                navigate("/sendmoney?id="+user._id +"&name="+(user.firstname+" "+user.lastName))
            }} label={"Send Money"} />
        </div>
    </div>
}
