import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

const getAllTrips = asyncHandler(async (req, res) => {
  const trips = await prisma.trip.findMany();

  return res.json(trips);
});

const getTripById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id) {
    const trip = await prisma.trip.findUnique({
      where: {
        id: String(id),
      },
    });

    return res.status(200).json(trip);
  }
});

const addTrip = asyncHandler(async (req, res) => {
  const { name, color, startDate, endDate } = req.body;

  try {
    await prisma.trip.create({
      data: {
        color,
        name,
        startDate,
        endDate,
      },
    });

    return res.status(200).json({});
  } catch (e) {
    return res.status(400).send(e);
  }
});

export { getAllTrips, addTrip, getTripById };
