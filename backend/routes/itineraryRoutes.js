import express from "express";
import {
  getAllItinerary,
  addItinerary,
  getItineraryById,
  deleteItinerary,
} from "../controllers/itineraryController.js";

const router = express.Router();

router.route("/itineraries").post(addItinerary);

router.route("/:id/itineraries").get(getAllItinerary).delete(deleteItinerary);

router.route("/itineraries/:id").get(getItineraryById);

export default router;
