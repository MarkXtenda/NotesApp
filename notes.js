const fs = require("fs");
const { constrainedMemory } = require("process");

const getNotes = () => {
    return "Your notes..."
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note)=>note.title === title)
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })  
        console.log("New note dded") 
    } else {
        console.log("Note title taken!")
    }

    saveNotes(notes)
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    }
    catch(e) {
        return []
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const removedNoteArray = notes.filter((note)=>note.title !== title)
    if (notes.length !== removedNoteArray.length) {
        saveNotes(removedNoteArray)
        console.log("Note titled: '" + title + "' had been removed!")
    } else {
        console.log("No notes titled '" + title + "' was found!")
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}