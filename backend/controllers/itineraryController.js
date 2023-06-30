import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// @desc    Fetch all itinenaries belong to a trip
// @route   GET/api/itineraries
// @access  Public

const getAllItinerary = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const itineraries = await prisma.itinerary.findMany({
    where: {
      tripId: String(id),
    },
    // orderBy: {
    //   chosenDate: "desc",
    // },
  });

  const sortedItinerary = itineraries.sort((a, b) => {
    const chosenDateComparison =
      new Date(a.chosenDate) - new Date(b.chosenDate);
    if (chosenDateComparison === 0) {
      return new Date(a.startTime) - new Date(b.startTime);
    }
    return chosenDateComparison;
  });

  return res.json(sortedItinerary);
});

// @desc    Create an itinerary for a specific trip
// @route   POST/api/:tripId/itineraries
// @access  Public

const addItinerary = asyncHandler(async (req, res) => {
  const {
    tripId,
    title,
    location,
    chosenDate,
    startTime,
    endTime,
    description,
  } = req.body;

  const itinerary = await prisma.itinerary.create({
    data: {
      title,
      location,
      chosenDate,
      startTime,
      endTime,
      description,
      trip: {
        connect: { id: tripId },
      },
    },
  });
  return res.json(itinerary);
});

// @desc    Retrieves itinerary details
// @route   GET/api/itineraries/:id
// @access  Public
const getItineraryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const itinerary = await prisma.itinerary.findUnique({
      where: {
        id: String(id),
      },
    });
    return res.status(200).json(itinerary);
  } catch (e) {
    throw new Error(e);
  }
});

// @desc    Deletes an itinerary
// @route   DELETE/api/:tripId/itineraries
// @access  Public

const deleteItinerary = asyncHandler(async (req, res) => {
  const { itineraryId } = req.body;

  try {
    await prisma.itinerary.delete({
      where: {
        id: String(itineraryId),
      },
    });
    return res.status(200).json({});
  } catch (e) {
    return res.status(400);
  }
});

export { addItinerary, deleteItinerary, getAllItinerary, getItineraryById };
