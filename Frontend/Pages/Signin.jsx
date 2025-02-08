import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin=()=>{
    return <div className="bg-slate-300 flex justify-center h-screen" >
    <div className="flex justify-center flex-col"> 
    <div className="bg-white flex flex-col justify-center h-100 px-2 rounded-lg w-80 text-center ">
    <Heading label={"Sign in"}></Heading>
    <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
    <InputBox label={"Email"} placeholder={"roankkriplani@gmail.com"}></InputBox>
    <InputBox label={"Password"}></InputBox>
    <div className="pt-4">
          <Button label={"Sign in"} />
        </div>
    <BottomWarning label={"Dont have an accont?"} buttonText={"Signup"} to={"/Signup"}></BottomWarning>
    </div>
    </div>
    </div>
}
