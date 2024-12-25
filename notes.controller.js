const fs = require("fs/promises");
const chalk = require("chalk");
const path = require("path");
const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
	const notes = await getNotes();
	const note = {
		title,
		id: Date.now().toString(),
	};
	notes.push(note);
	await saveNotes(notes);
	console.log(
		chalk.greenBright.inverse(`Note ${chalk.yellow(title)} was added!`)
	);
	printNotes();
}
async function removeNote(idForDeleting) {
	const notes = await getNotes();

	const notesWithoutDeletedNote = notes.filter(
		({ id }) => id !== idForDeleting
	);
	if (notes.length === notesWithoutDeletedNote.length) {
		console.log(
			chalk.yellowBright.inverse(
				`There is no the not with id ${idForDeleting}!`
			)
		);
		return;
	}
	await saveNotes(notesWithoutDeletedNote);
	console.log(
		chalk.redBright.inverse(
			`Note ${chalk.blue(idForDeleting)} was removed!`
		)
	);
	printNotes();
}

async function editNote(idForEditing, newTitle) {
	const notes = await getNotes();
	const notesWithEditedNote = notes.map((note) => note.id === idForEditing ? {...note, title: newTitle} : note)
	await saveNotes(notesWithEditedNote);
	console.log(
		chalk.yellow(
			`Note ${chalk.blue(idForEditing)} was edited!`
		)
	);
	printNotes();
}

async function saveNotes(notes) {
	await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
async function printNotes() {
	const notes = await getNotes();
	console.log(chalk.blueBright.inverse("Notes list:"));

	if (notes.length === 0) {
		console.log(chalk.cyan("...empty..."));
		return;
	}

	notes.forEach(({ id, title }) => {
		console.log(chalk.blue(id), chalk.blueBright(title));
	});
}

module.exports = {
	addNote,
	removeNote,
	getNotes,
	editNote
};
