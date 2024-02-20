"use client";
import { EyeClosed } from "@/components/icons/EyeClosed";
import { EyeOpen } from "@/components/icons/EyeOpen";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

function Register() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const router = useRouter();
	const register = async (
		_: unknown,
		{
			arg,
		}: {
			arg: {
				name: string;
				email: string;
				password: string;
				loginDirectly: boolean;
			};
		}
	) => {
		const res = await fetch("http://localhost:4000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				name: arg.name,
				email: arg.email,
				password: arg.password,
				loginDirectly: arg.loginDirectly,
			}),
		});

		return await res.json();
	};

	const loginDirectlyRef = useRef<HTMLInputElement>(null);

	// mutation trigger
	const { trigger } = useSWRMutation("register", register, {
		onSuccess: () => {
			if (loginDirectlyRef.current?.checked) {
				router.push("/dashboard");
			} else router.push("/login");
			mutate("me");
		},
	});

	const handleSubmitAction = async (formData: FormData) => {
		const rawFormData = {
			name: formData.get("name"),
			email: formData.get("email"),
			password: formData.get("password"),
			confirmpassword: formData.get("confirmPassword"),
			loginDirectly: formData.get("loginDirectly") === "on" ? true : false,
		};

		if (rawFormData.password === rawFormData.confirmpassword) {
			await trigger({
				name: rawFormData.name as string,
				email: rawFormData.email as string,
				password: rawFormData.password as string,
				loginDirectly: rawFormData.loginDirectly,
			});
		}
	};
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<form
				action={handleSubmitAction}
				className="w-[50dvw] xl:w-[24dvw] mt-20 space-y-10"
			>
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
						<input
							type="checkbox"
							name="loginDirectly"
							className="toggle toggle-primary"
							ref={loginDirectlyRef}
						/>
					</label>
				</div>
				<button className="btn btn-primary btn-block btn-accent">Submit</button>
			</form>
		</main>
	);
}

export default Register;
