const chalk = require("chalk");
const express = require("express");

const { addNote, removeNote, getNotes, editNote } = require("./notes.controller");

const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.json())
app.use(express.static("public"));
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", async (req, res) => {
	res.render("index", {
		title: "Express + eJS",
		notes: await getNotes(),
		created: false,
	});
});
app.post("/", async ({ body: { title } }, res) => {
	let created = false;
	if (title.trim().length) {
		await addNote(title);
		created = true;
	}
	res.render("index", {
		title: "Express + eJS",
		notes: await getNotes(),
		created,
	});
});
app.get("/", async (req, res) => {
	res.render("index", {
		title: "Express + eJS",
		notes: await getNotes(),
		created: false,
	});
});

app.delete("/:id", async (req, res) => {
	await removeNote(req.params.id)
	res.render("index", {
		title: "Express + eJS",
		notes: await getNotes(),
		created: false,
	});
});

app.put("/:id", async (req, res) => {
	await editNote(req.params.id, req.body.title)
	
	res.render("index", {
		title: "Express + eJS",
		notes: await getNotes(),
		created: false,
	});
});


app.listen(port, () => {
	console.log(
		chalk.greenBright.inverse(`Server has been started on port: ${port}`)
	);
});
