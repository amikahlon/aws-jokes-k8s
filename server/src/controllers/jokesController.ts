import { Request, Response, NextFunction } from "express";
import { fetchJoke } from "../services/jokesService";

export const getJoke = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const joke = await fetchJoke();

    res.json({
      success: true,
      joke
    });

  } catch (error) {

    next(error);

  }
};