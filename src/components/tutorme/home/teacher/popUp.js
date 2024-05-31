import { Prosto_One } from "next/font/google";
import { RxCheckCircled } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";

const Bar = (props) => {
    if (props.color == "green"){
        return( <div className="hidden sm:flex w-[10vh] h-0.5 bg-green-500"></div>)
    } else {
        return (<div className="hidden sm:flex w-[10vh] h-0.5 bg-gray-200	"></div>)
    }
}

const OneProgress = (props) => {
    return(
        <li class="relative mb-6 sm:mb-0 flex flex-col items-center">
                <div class="flex items-center">
                    <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    {props.Icon}
                    </div>
                    {props.Bar}
                </div>
        </li>
    )
}


export default function (props){
    console.log(props.status)
    return(
        <div className="">
            <ol class="items-center sm:flex s ml-[5%]">
                <OneProgress
                    Icon = {(props.statusNum >= 25) ? (<RxCheckCircled />) : (<RxCrossCircled/>)}
                    Bar = {<Bar color = {(props.statusNum > 25) ? ("green") : ("grey")} />}
                    Status = "student"
                />
                <OneProgress
                    Icon = {(props.statusNum >= 50) ? (<RxCheckCircled />) : (<RxCrossCircled/>)}
                    Bar = {<Bar color = {(props.statusNum > 50) ? ("green") : ("grey")} />}
                    Status = "tutor"
                />
                <OneProgress
                    Icon = {(props.statusNum >= 75) ? (<RxCheckCircled />) : (<RxCrossCircled/>)}
                    Bar = {<Bar color = {(props.statusNum > 75) ? ("green") : ("grey")} />}
                    Status = "Mr.Decker"
                />
                <OneProgress
                    Icon = {(props.statusNum > 100) ? (<RxCheckCircled />) : (<RxCrossCircled/>)}
                    Status = "Completed"
                />
            </ol>
            <div className="flex flex-row">
            <span className="mr-[13%]">Student</span>                
            <span className="mr-[13%]">Tutor</span>                
            <span className="mr-[5%]">Mr.Decker</span>                
            <span>Completed</span>
            </div>
        </div>
    )
}