import { useState } from "react";
import { ReactComponent as LoginBg } from "../shared/svg/LoginBg.svg";


interface LoginPageProps {
    setLoggedIn: (value: boolean) => void
    setUser: (value: string) => void
}

export default function LoginPage({ setLoggedIn, setUser }: LoginPageProps) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    
    let loginHandler = async () => {

        if (username === "Kaustuv" && password === "password") {
            setUser("Kaustuv");
            setLoggedIn(true);
        }
        
    }

    return (
        <div className="flex justify-center items-center h-screen bg-breen-blueFade">
            <LoginBg height="100%" style={{ position: "absolute", top: 0, left: 0 }} />
            <div className="flex flex-col w-1/3 pb-16 border border-1 rounded-2xl shadow-lg" style={{ zIndex: 100, backgroundColor: "white" }}>
                <div className="p-10 text-h1 flex justify-center">
                    <DerqIcon />
                    <span className="text-breen-b1 ml-3">
                        Derq
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="h-full w-4/6">
                        <label className="form-labelb text-gray-700 text-b1">Email</label>
                        <div className="mt-1.5">
                            <input type="text" placeholder="Your email address" className="border border-1 rounded-lg w-full px-5 py-4 text-b1 focus:outline-none" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div className="h-full mt-6 w-4/6">
                        <label className="form-labelb text-gray-700 text-b1">Password</label>
                        <div className="mt-1.5">
                            <input type="password" placeholder="Your password" className="border border-1 rounded-lg w-full px-5 py-4 text-b1 focus:outline-none" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="h-full mt-9 w-4/6">
                        <button className="uppercase bg-breen-blue text-white w-full py-4 rounded-lg btn-text" onClick={() => loginHandler()}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DerqIcon() {
    return (
        <svg width="38" height="49" viewBox="0 0 38 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.9 49C29.3368 49 37.8 40.4392 37.8 29.8822C37.8 19.3213 29.3368 10.7643 18.9 10.7643V0C18.9 0 4.95911e-05 6.80641 4.95911e-05 29.886C-0.00374559 40.4392 8.45951 49 18.9 49ZM25.109 29.8822C25.109 33.3526 22.3309 36.1626 18.9 36.1626C15.4692 36.1626 12.6911 33.3526 12.6911 29.8822C12.6911 26.4118 15.4692 23.6017 18.9 23.6017C22.3271 23.6017 25.109 26.4118 25.109 29.8822Z" fill="#4F73D1" />
        </svg>
    );
}