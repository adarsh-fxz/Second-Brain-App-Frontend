import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        interface SigninResponse {
            token: string;
        }

        const response = await axios.post<SigninResponse>(BACKEND_URL + "/api/v1/signin", {
                username,
                password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">

        <div className="bg-white rounded-xl shadow-md min-w-48 p-8 rounded">
            <Input reference={usernameRef} placeholder={"Username"} />
            <Input reference={passwordRef} placeholder={"Password"} />
            <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} variant="primary" text="Sign In" fullWidth={true} />
            </div>
        </div>

    </div>

}