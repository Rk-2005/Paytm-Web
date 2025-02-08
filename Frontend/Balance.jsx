export function Balance({value}){
    return <div className="flex  text-center ">
        
        <div className="font-bold text-lg">Your Balance </div>
        <div className="ml-4 text-lg font-semibold ">
        Rs {value}
        </div>
    </div>
}
