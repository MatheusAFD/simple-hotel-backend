import express from "express";

const app = express();

app.get("/hotels", (request, response) => {
  return response.json([
    { id: 1, name: "Hotel 1" },
    { id: 2, name: "Hotel 2" },
    { id: 3, name: "Hotel 3" },
  ]);
});

app.listen(3333);
