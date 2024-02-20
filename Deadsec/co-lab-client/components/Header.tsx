"use client";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

function Header() {
	const me = async () => {
		const res = await fetch("http://localhost:4000/me", {
			credentials: "include",
		});
		return await res.json();
	};

	const { data } = useSWR("me", me);

	const logout = async (_: unknown) => {
		const res = await fetch("http://localhost:4000/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		return await res.json();
	};

	// mutation trigger
	const { trigger } = useSWRMutation("logout", logout, {
		onSuccess: () => {
			mutate("me");
		},
	});

	const handleLogout = async () => {
		await trigger();
	};

	return (
		<header className="flex items-center justify-between fixed w-full p-4">
			<Link href={"/"} className="text-2xl font-bold">
				Co-Lab
			</Link>

			<nav className="navbar-end w-fit space-x-2">
				{data?.user?.id ? (
					<>
						<strong>{data?.user?.name}</strong>
						<button className="btn btn-error" onClick={handleLogout}>
							Logout
						</button>
					</>
				) : (
					<>
						<Link href={"/login"} className="btn btn-primary">
							Login
						</Link>
						<Link href={"/register"} className="btn btn-secondary btn-outline">
							Register
						</Link>
					</>
				)}
			</nav>
		</header>
	);
}

export default Header;
