const chalk = require("chalk");
const yargs = require("yargs")
const notes = require("./notes")


// create add command
yargs.command({
    command: "add",
    describe: "Adding a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
}
);

yargs.command({
    command: "remove",
    describe: "Removing a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        const response = notes.removeNote(argv.title)
    }
});

yargs.command({
    command: "read",
    describe: "Read a note",
    handler() {
        console.log("Reading a note")
    }
});

yargs.command({
    command: "list",
    describe: "list notes",
    handler() {
        console.log("Listing notes")
    }
});

yargs.parse()
