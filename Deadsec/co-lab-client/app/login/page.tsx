"use client";
import { EyeClosed } from "@/components/icons/EyeClosed";
import { EyeOpen } from "@/components/icons/EyeOpen";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

function Login() {
	const router = useRouter();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	// login fetcher function
	const login = async (
		_: unknown,
		{ arg }: { arg: { email: string; password: string } }
	) => {
		const res = await fetch("http://localhost:4000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ email: arg.email, password: arg.password }),
		});

		return await res.json();
	};

	// mutation trigger
	const { trigger } = useSWRMutation("login", login, {
		onSuccess: () => {
			mutate("me");
			router.push("/");
		},
	});

	const handleSubmitAction = async (formData: FormData) => {
		const rawFormData = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		await trigger({
			email: rawFormData.email as string,
			password: rawFormData.password as string,
		});
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<form
				action={handleSubmitAction}
				className="w-[50dvw] xl:w-[24dvw] mt-20 space-y-10"
			>
				<div className="grid gap-1">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						className="input input-md input-bordered focus-visible:input-primary"
					/>
				</div>
				<div className="grid gap-1 relative">
					<label htmlFor="email">Password</label>
					<input
						type={isPasswordVisible ? "text" : "password"}
						name="password"
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
