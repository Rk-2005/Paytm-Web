import { object, string } from "zod";

const updatebody=object({
    password:string().optional(),
    firstname:string().optional(),
    lastName:string().optional()
})
export default{
    updatebody
}
