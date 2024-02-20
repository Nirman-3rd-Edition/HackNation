"use client";
import { EyeClosed } from "@/components/icons/EyeClosed";
import { EyeOpen } from "@/components/icons/EyeOpen";
import { useState } from "react";

function Register() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<form action="" className="w-[50dvw] xl:w-[24dvw] mt-20 space-y-10">
				<div className="grid gap-1">
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
						className="input input-md input-bordered focus-visible:input-primary"
					/>
				</div>
				<div className="grid gap-1">
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="text"
						className="input input-md input-bordered focus-visible:input-primary"
					/>
				</div>
				<div className="grid gap-1 relative">
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type={isPasswordVisible ? "text" : "password"}
						className="input input-md input-bordered focus-visible:input-primary"
					/>
					<div
						className="text-2xl right-3 top-[40px] absolute cursor-pointer"
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
					>
						{isPasswordVisible ? <EyeClosed /> : <EyeOpen />}
					</div>
				</div>
				<div className="grid gap-1">
					<label htmlFor="email">Confirm password</label>
					<input
						name="confirmPassword"
						type={isPasswordVisible ? "text" : "password"}
						className="input input-md input-bordered focus-visible:input-primary"
					/>
				</div>
				<div className="form-control w-full">
					<label className="cursor-pointer label">
						<span className="label-text">Login directly?</span>
						<input type="checkbox" className="toggle toggle-primary" />
					</label>
				</div>
				<button className="btn btn-primary btn-block btn-accent">Submit</button>
			</form>
		</main>
	);
}

export default Register;
