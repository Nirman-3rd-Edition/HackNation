"use client";
import { EyeClosed } from "@/components/icons/EyeClosed";
import { EyeOpen } from "@/components/icons/EyeOpen";
import { useState } from "react";

function Login() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<form action="" className="w-[50dvw] xl:w-[24dvw] mt-20 space-y-10">
				<div className="grid gap-1">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						className="input input-md input-bordered focus-visible:input-primary"
					/>
				</div>
				<div className="grid gap-1 relative">
					<label htmlFor="email">Password</label>
					<input
						type="text"
						className="input input-md input-bordered focus-visible:input-primary"
					/>
					<div
						className="text-2xl right-3 top-[40px] absolute cursor-pointer"
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
					>
						{isPasswordVisible ? <EyeClosed /> : <EyeOpen />}
					</div>
				</div>
				<button className="btn btn-primary btn-block btn-accent">Submit</button>
			</form>
		</main>
	);
}

export default Login;
