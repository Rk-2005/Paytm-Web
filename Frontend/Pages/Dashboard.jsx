import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { User } from "../components/User";


export function Dashboard(){
   return <div>
    <Appbar/>
    <div className="m-8">
    <Balance value={"10,000"}></Balance>
    <User></User>
    </div>
    </div>
}
