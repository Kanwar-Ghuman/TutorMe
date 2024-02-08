"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
// import firebase from 'firebase/compat/app';
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'

const Login = () => {

    return (
        <div className="bg-[#000] min-h-screen w-full h-full flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle className = "flex justify-center">Login</CardTitle>
                    <CardDescription>Login to TutorMe to submit a tutoring request to NHS.</CardDescription>
                </CardHeader>
                <CardContent> 
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
