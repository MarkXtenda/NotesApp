const fs = require("fs");
const chalk = require("chalk");
const { constrainedMemory } = require("process");

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note)=>note.title === title);
    if (foundNote) {
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red.inverse(`Note titled: ${title} does not exist!`))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note)=>note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })  
        console.log(chalk.green.inverse("New note aded!"))
    } else {
        console.log(chalk.red.inverse("Note title taken!"))
    }

    saveNotes(notes)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    }
    catch(e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const removedNoteArray = notes.filter((note)=>note.title !== title);
    if (notes.length !== removedNoteArray.length) {
        saveNotes(removedNoteArray)
        console.log(chalk.green.invesrse(`Note titled: ${title} had been removed!`));
    } else {
        console.log(chalk.red.invesrse(`No notes titled ${title} was found!`));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("Your Notes:"));
    notes.forEach(note => console.log(`- ${note.title}`));
}

module.exports = {
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}