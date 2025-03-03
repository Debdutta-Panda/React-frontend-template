import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

import axios from "axios";

interface LoginRequest {
  password: string;
  email: string;
}

interface LoginResponse {
  status: string;
  httpStatus: number;
  message: string;
  api_key: string;
}

async function login(email: string, password: string) {
	const url = "https://debduttapanda.com/learn/super-admin/login";
	const data: LoginRequest = {
	  email,
	  password,
	};
  
	try {
	  const response = await axios.post<LoginResponse>(url, data, {
		headers: {
		  "Content-Type": "application/json",
		},
	  });
  
	  console.log("Response:", response.data);
	} catch (error) {
	  if (axios.isAxiosError(error)) {
		console.error("Axios error:", error.response?.data || error.message);
	  } else {
		console.error("Unexpected error:", error);
	  }
	}
  }

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPasword] = useState("");
	
	return (
		<div className="flex items-center justify-center bg-white-600 p-2 w-full h-full">
			<div className="shadow-2xl p-8 rounded-2xl bg-white">
				<div className="gap-4 w-[400px] flex flex-col items-center">
					<h1>Login</h1>
					<InputText
						value={email}
						onChange={(e) => {
							setEmail(
								e.target.value
							);
						}}
						className="w-full"
					/>
					<InputText
						value={password}
						onChange={(e) => {
							setPasword(
								e.target.value
							);
						}}
						className="w-full"
					/>
					<Button label="Proceed" className="w-full" onClick={(e)=>{
						login(email,password)
					}}/>
				</div>
			</div>
		</div>
	);
}
