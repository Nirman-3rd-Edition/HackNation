import express from "express";

const app = express();

app.get("/", (req, res) => {
	return res.json({
		msg: "hello world",
	});
});

app.listen(4000, () => {
	console.log(`listening on http://localhost:4000`);
});
