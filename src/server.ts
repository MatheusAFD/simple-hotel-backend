import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// app.post("/hotels", (request, response) => {
//   return response.status(201).json([]);
// });

app.get("/cities", async (request, response) => {
  const cities = await prisma.city.findMany({
    include: {
      _count: {
        select: {
          hotels: true,
        },
      },
    },
  });

  return response.json(cities);
});

app.get("/cities/:id/hotels", async (request, response) => {
  const cityId = request.params.id;

  const hotels = await prisma.hotel.findMany({
    where: {
      cityId,
    },
  });

  return response.json(hotels);
});

app.listen(3333);
