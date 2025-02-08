import axios from "axios";
import { use, useState } from "react"
import { useSearchParams } from "react-router-dom"

export function SendMoney(){
    const [SearchParms]=useSearchParams();
    const id=SearchParms.get("id")
    const name=SearchParms.get("name");
    const [amount,setamount]=useState(0);
    console.log(name)
     return <div className="flex justify-center h-screen bg-slate-100  ">

        <div className="flex flex-col justify-center h-full ">
        <div
                class="border h-min max-w-md p-4 space-y-7 w-96 bg-white shadow-lg rounded-lg"
            >
            <div class="flex flex-col space-x-1.5 p-6">
                <h2 class="text-3xl font-bold text-center ">Send Money</h2>
                </div> 
                <div className="">
            <div className="flex items-center space-x-4   " >
                <div className="rounded-full bg-green-500 w-12 h-12 flex justify-center text-3xl text-gray-100 items-center">
                   { name[0].toUpperCase()}
                </div>
                <h3><div className="text-2xl font-semibold ">
                    {name}
                </div></h3>
                </div>
            </div>
            <div >
                <div className="flex items-center  ">
                <label className="text-sm font-medium pb-4">Amount(In Rs)</label>
                </div>
                <div className="pb-4 items-center justify-center">
                <input onChange={(e)=>{
                    console.log(e.target.value)
                    setamount(e.target.value)
                }} type="number" id="amount " placeholder="Enter amount" className="shadow w-full text-center rounded-xl h-8 border items-center justify-center "></input>
                </div>
             <button onClick={async() => {
                       await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            "to":id,
                            "amount":amount
                       },{
                        headers:{
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                       })
                    }} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white cursor-pointer">
                        Initiate Transfer
                    </button>
        </div>
        </div>
        </div>
        </div>
    
}
