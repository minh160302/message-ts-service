import { Request, Response } from "express";
import { Model, Schema, Types } from "mongoose";
import User from "../model/user";

export const findUserByUsername = (req: Request, res: Response) => {
  const username = req.params.id
  User.findOne({ username: username })
    .select("_id username profile_picture")
    .then((user) => {
      return res.status(200).json({
        status: 200,
        data: user
      });
    })
    .catch((error) => {
      console.log(error)
    })
}