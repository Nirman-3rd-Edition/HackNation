"use client";
import { useRef } from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { Crown } from "./icons/Crown";

interface Member {
	id: string;
	name: string;
}

interface Team {
	id: string;
	name: string;
	creatorId: string;
	members: Member[];
}

function TeamBar() {
	const modal = useRef<HTMLDialogElement>(null);
	const userTeams = async () => {
		const res = await fetch("http://localhost:4000/teams", {
			credentials: "include",
		});
		return (await res.json()) as Team[];
	};

	const { data } = useSWR("userTeams", userTeams);

	const createTeam = async (_: unknown, { arg }: { arg: { name: string } }) => {
		const res = await fetch("http://localhost:4000/create-team", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ name: arg.name }),
		});

		return await res.json();
	};

	const { trigger } = useSWRMutation("login", createTeam, {
		onSuccess: () => {
			mutate("userTeams");
		},
	});

	const handleCreateTeamAction = async (formData: FormData) => {
		await trigger({
			name: formData.get("teamName") as string,
		});
	};

	return (
		<>
			<dialog
				id="my_modal_2"
				className="modal z-10 backdrop-blur-sm"
				ref={modal}
			>
				<form
					className="modal-box space-y-3"
					action={handleCreateTeamAction}
					method="dialog"
				>
					<input
						type="text"
						name="teamName"
						className="input input-md input-bordered w-full"
						placeholder="Team name"
					/>
					<button className="btn float-right btn-primary">Submit</button>
				</form>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
			<div className="fixed w-[20dvw] lg:w-[14dvw] left-0 pt-28 p-2 -z-10 h-screen space-y-3 border-r-2 border-r-base-content/5">
				<button
					className="btn btn-secondary w-full"
					onClick={() => modal.current?.showModal()}
				>
					Create team
				</button>
				<div className="divider pt-5 pb-3">Teams</div>

				{data?.map((t) => (
					<div className="collapse bg-base-200" key={t.id}>
						<input type="radio" name="teams" />
						<div className="collapse-title">{t.name}</div>
						<div className="collapse-content pl-6 grid gap-1">
							{t.members.map((m) => (
								<small className="flex items-center gap-2" key={m.id}>
									{m.id === t.creatorId && <Crown />}
									{m.name}
								</small>
							))}
						</div>
					</div>
				))}

				{/* <div className="collapse bg-base-200">
				<input type="radio" name="my-accordion-1" />
				<div className="collapse-title">Team 2</div>
				<div className="collapse-content">
					<p>hello</p>
				</div>
			</div>
			<div className="collapse bg-base-200">
				<input type="radio" name="my-accordion-1" />
				<div className="collapse-title">Team 3</div>
				<div className="collapse-content">
					<p>hello</p>
				</div>
			</div> */}
			</div>
		</>
	);
}

export default TeamBar;
