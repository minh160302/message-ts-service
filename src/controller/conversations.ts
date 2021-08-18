import { Request, Response } from "express";
import { Model, Schema, Types } from "mongoose";
import Conversation, { ConversationType } from "../model/conversation";
import Profile from "../model/profile";

// create new conversation between 2 people
export const createConversation = async (req: Request, res: Response) => {
  const creator = req.body.creator
  const visitor = req.body.visitor

  const conversation = new Conversation({
    _id: Types.ObjectId(),
    members: [creator, visitor],
    created_at: req.body.createdAt,
    shared_media: ["none"],
    status: req.body.status
  })

  // get conversation of 2 people
  const listConversations = await Conversation.find({ $expr: { $eq: [{ $size: "$members" }, 2] } })

  let sameConversation = 0

  listConversations.map((conversation) => {
    // console.log(conversation.members[0].user_id)
    // console.log(conversation.members[1].user_id)
    // console.log(conversation.members[0].user_id)
    // console.log(conversation.members[0].user_id)
    if (conversation.members[0].user_id === creator.user_id && conversation.members[1].user_id === visitor.user_id) sameConversation += 1
    if (conversation.members[0].user_id === visitor.user_id && conversation.members[1].user_id === creator.user_id) sameConversation += 1
  })

  console.log(sameConversation)

  if (sameConversation > 0) {
    return res.status(200).json({
      success: false,
      message: "Conversation exists",
      error: `Already have conversation with user: ${visitor.username}`,
    });
  }

  else {
    return conversation
      .save()
      .then((conversation: ConversationType) => {
        return res.status(201).json({
          success: true,
          data: conversation
        })
      })
      .catch((error: any) => {
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      })
  }

}

export const getActiveConversations = async (req: Request, res: Response) => {
  const type = req.params.type
  // another params is current user_id
  console.log(type)

  // get conversation of 2 people
  const listConversations = await Conversation.find({ $expr: { $eq: ["$status", type] } }).then((result) => {
    console.log(result)
    // TODO: filter to get conversations contains only currentUser's id
  })

}