const fs = require("fs");
const chalk = require("chalk");
const { constrainedMemory } = require("process");

const getNotes = () => {
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note)=>note.title === title)
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })  
        console.log(chalk.bgGreen("New note aded!"))
    } else {
        console.log(chalk.bgRed("Note title taken!"))
    }

    saveNotes(notes)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
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
    const removedNoteArray = notes.filter((note)=>note.title !== title)
    if (notes.length !== removedNoteArray.length) {
        saveNotes(removedNoteArray)
        console.log(chalk.bgGreen("Note titled: '" + title + "' had been removed!"))
    } else {
        console.log(chalk.bgRed("No notes titled '" + title + "' was found!"))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}