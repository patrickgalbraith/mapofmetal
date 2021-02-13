const { fstat } = require("fs");
const fs = require("fs");
const path = require("path");
const concatGenreInfo = require("./concat-genre-info");

const DATA_DIR = path.resolve(__dirname, "../data");
const PUBLIC_DIR = path.resolve(__dirname, "../public");

const run = () => {
  console.log("Begin preparing data.");

  concatGenreInfo(() => {
    fs.copyFileSync(
      path.join(DATA_DIR, "genre-overlays.json"),
      path.join(PUBLIC_DIR, "./data/genre-overlays.json")
    );

    console.log("Finished preparing data.");
  });
};

run();
