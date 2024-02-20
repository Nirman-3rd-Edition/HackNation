import express from "express";
import { config } from "dotenv-safe";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import cors from "cors";
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
config();

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

// setting session types
declare module "express-session" {
	export interface SessionData {
		userId: string;
	}
}

const app = express();
const db = new PrismaClient();

// redis setup for session storage
const redis = new Redis();
const redisStore = new RedisStore({
	client: redis,
	prefix: "colab_session_store:",
	disableTouch: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	cors({
		origin: ["localhost:3000"],
		credentials: true,
	})
);

app.use(
	// session and cookies settings
	session({
		name: "qid",
		secret: process.env.SESSION_SECRET as string,
		resave: false,
		saveUninitialized: false,
		store: redisStore,
		cookie: {
			httpOnly: true,
			sameSite: "lax",
			maxAge: 1000 * 60 * 60 /* cookie will expire after 1 hour */,
			secure: "auto",
		},
	})
);

app.get("/", (req, res) => {
	return res.json({
		msg: "hello world",
	});
});

// user login
app.post("/login", async (req: LoginRequest, res) => {
	const user = await db.user.findUnique({
		where: {
			email: req.body.email,
		},
	});

	if (user === null) {
		return res.status(400).json({
			msg: `User with email: ${req.body.email} not found`,
			field: "email",
			success: false,
		});
	}

	const isPasswordVerified = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (!isPasswordVerified) {
		return res.status(400).json({
			msg: "Invalid password",
			field: "password",
			success: false,
		});
	}

	req.session.userId = user.id;

	return res.status(200).json({
		msg: "Logged in successfully",
		success: true,
	});
});

// register new user
app.post("/register", async (req: RegisterRequest, res) => {
	console.log(req.body);
	const user = await db.user.findUnique({
		where: {
			email: req.body.email,
		},
	});

	if (user !== null) {
		return res.status(500).json({
			msg: `User with email: ${req.body.email} already exists`,
			field: "email",
			success: false,
		});
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const newUser = await db.user.create({
		data: {
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		},
	});

	if (req.body.loginDirectly === true) {
		req.session.userId = newUser.id;
		return res.status(201).json({
			msg: "Registered and Logged in successfully",
			success: true,
		});
	}

	return res.status(201).json({
		msg: "Registered successfully",
		success: true,
	});
});

app.listen(4000, () => {
	console.log(`listening on http://localhost:4000`);
});
