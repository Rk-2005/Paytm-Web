import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup= ()=>{
    const [firstname,SetFirstName]=useState(""); 
    const [LastName,SetLastName]=useState(""); 
    const [Email,SetEmail]=useState(""); 
    const [Password,SetPassword]=useState(""); 
    const navigate=useNavigate();
    const handleSignup=async ()=>{
        try{
            const res =await axios.post("http://localhost:3000/api/v1/user/signup",{
                firstname:firstname,
                lastName:LastName,
                username:Email,
                password:Password
            })
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard")
        }catch(err){
            console.log(err);
        }
    }
    return <div className="bg-slate-300 h-screen flex  justify-center">
         <div className="flex  flex-col  justify-center">
         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign Up"}/>
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e=>{
            SetFirstName(e.target.value);
        }} label={"First Name"} placeholder="Ronak" />
        <InputBox onChange={e=>{
            SetLastName(e.target.value);
        }}  label={"Last Name"} placeholder="Kriplani" />
        <InputBox onChange={e=>{
            SetEmail(e.target.value);
        }}  label={"Email"} placeholder="ronak@gmail.com"/>
        <InputBox onChange={e=>{
            SetPassword(e.target.value);
        }}  label={"Password"} placeholder="123456"/>
        <div className="pt-3">
            
        <Button onClick={
         handleSignup   
        } label={"Signup"}></Button>
        </div>
         <BottomWarning label={"Already have account?"} buttonText={"Sign"} to={"/signin"}></BottomWarning> 
        </div>
        </div>
    </div>
}
