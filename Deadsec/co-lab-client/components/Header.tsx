import Link from "next/link";
import React from "react";

function Header() {
	return (
		<header className="flex items-center justify-between fixed w-full p-4">
			<Link href={"/"} className="text-2xl font-bold">
				Co-Lab
			</Link>

			<nav className="navbar-end w-fit space-x-2">
				<Link href={"/login"} className="btn btn-primary">
					Login
				</Link>
				<Link href={"/register"} className="btn btn-secondary btn-outline">
					Register
				</Link>
			</nav>
		</header>
	);
}

export default Header;
