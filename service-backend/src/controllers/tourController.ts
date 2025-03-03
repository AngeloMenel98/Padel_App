import { Club, Tour } from "../entity";
import { ClubService, TourService, UserService } from "../services";
import { generateCode } from "../helpers/generateTourCode.helper";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";
import { Manager } from "../helpers/manager";

export class TourController {
  private tourService: TourService;
  private clubService: ClubService;
  private manager: Manager;

  constructor() {
    this.tourService = new TourService();
    this.clubService = new ClubService();
    this.manager = Manager.getInstance();
  }

  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const { title, userId, clubsId } = req.body;

      const newTour = new Tour();
      newTour.title = title;
      newTour.tourCode = generateCode(6);

      const user = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(user);

      const clubs: Club[] = [];
      for (let clubId of clubsId) {
        const club = await this.clubService.findById(clubId);
        clubs.push(club);
      }

      const tour = await this.tourService.create(newTour, user, clubs);

      const response = {
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        isDeleted: tour.isDeleted,
        usersId: tour.users.map((u) => u.id),
        clubsId: tour.clubs.map((c) => c.id),
      };

      res.status(201).json(response);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            message: error.msg,
          })),
        });
      }

      const { tourId, userId } = req.body;

      const existingTour = await this.tourService.findById(tourId);
      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const tour = await this.tourService.delete(existingTour);

      const response = {
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        isDeleted: tour.isDeleted,
      };

      res.status(201).json(response);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async joinUser(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const { userId, tourCode } = req.body;

      const user = await this.manager.checkUserExists(userId);

      const tour = await this.tourService.joinUserToTour(user, tourCode);

      const response = {
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        usersId: tour.users.map((u) => u.id),
      };

      res.status(201).json(response);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const userId = req.params.userId;

      const tours = await this.tourService.getAll(userId);

      res.status(201).json(tours);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async getTourById(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const tourId = req.params.tourId;
      const existingTour = await this.tourService.findById(tourId);

      res.status(201).json(existingTour);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new TourController();
