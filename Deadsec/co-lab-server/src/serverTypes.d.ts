import express from "express";

interface LoginRequest extends express.Request {
	body: {
		email: string;
		password: string;
	};
}
interface RegisterRequest extends express.Request {
	body: {
		name: string;
		email: string;
		password: string;
		loginDirectly: boolean;
	};
}
interface CreateTeamRequest extends express.Request {
	body: {
		name: string;
	};
}

// setting session types
declare module "express-session" {
	export interface SessionData {
		userId: string;
	}
}
