import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@praxav99/freelancing";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Spinner} from "../component/ui/Spinner"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);  // Loading state

    async function sendRequest() {
        setLoading(true); 
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            console.log(jwt);
            localStorage.setItem("token", jwt);  // Store the token under the key "token"
            navigate("/Services");
        } catch(e) {
            alert("Error while signing up");
        }
        finally {
            setLoading(false);  // End loading
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create an account" : "Sign in"}
                        </div>
                        <div className="text-slate-500">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === "signup" && (
                            <LabelledInput label="Name" placeholder="Pranav Kulkarni..." onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value
                                });
                            }} />
                        )}
                        <LabelledInput label="Username" placeholder="Pranav@gmail.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value
                            });
                        }} />
                        <LabelledInput label="Password" type="password" placeholder="123456" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            });
                        }} />
                       <button 
                        onClick={sendRequest} 
                        type="button" 
                        className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                        disabled={loading}  // Disable button while loading
                    >
                        {loading ? <Spinner /> : (type === "signup" ? "Sign up" : "Sign in")}  {/* Show spinner when loading */}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    );
}