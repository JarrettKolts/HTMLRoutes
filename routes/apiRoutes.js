const router = require("express").Router();
const {
  readFromFile, writeToFile, readAndAppend
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid"); // For generating unique note IDs
// const path = require("path");

// TODO: Define the path to the database JSON file
const filePath = "db/db.json";

router.get("/notes", (req, res) => {
  readFromFile(filePath)
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/notes", (req, res) => {

  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: "Note title and text required!" });
  }

  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  readAndAppend(newNote, filePath);
  res.json(newNote);
});

// BONUS
// router.delete('/notes/:id', (req, res) => {
//   // TODO: Get the ID of the note to delete from the request parameters

//   // TODO: Read the current notes from the JSON file

//   // TODO: Parse the data into an array of notes

//   // TODO: Filter the notes array to remove the note with the matching ID

//   // TODO: Write the updated notes array back to the JSON file

//   // TODO: Send a response indicating the note was successfully deleted

//   // TODO: Handle any errors that occur during the file operations
// });

module.exports = router;
