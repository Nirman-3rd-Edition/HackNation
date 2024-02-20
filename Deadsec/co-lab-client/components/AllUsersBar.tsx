"use client";
import { Suspense } from "react";
import useSWR from "swr";

interface User {
	id: string;
	name: string;
	email: string;
}

function AllUsersBar() {
	const allUsers = async () => {
		const res = await fetch("http://localhost:4000/all-users", {
			credentials: "include",
		});
		return (await res.json()) as User[];
	};

	const { data } = useSWR("allUsers", allUsers);

	return (
		<Suspense>
			<div className="fixed w-[40dvw] lg:w-[24dvw] right-0 pt-28 px-4 -z-10 h-screen space-y-3 border-l-2 border-l-base-content/5">
				<span className="w-fit">Users</span>
				{data?.map((u) => (
					<div
						key={u.id}
						className="bg-base-200 p-5 rounded-xl flex justify-between items-center"
					>
						<div>
							<h4>{u.name}</h4>
							<span className="text-base-content/50 text-xs">{u.email}</span>
						</div>
						<button className="btn btn-sm btn-success">Add</button>
					</div>
				))}
			</div>
		</Suspense>
	);
}

export default AllUsersBar;
