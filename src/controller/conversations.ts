import { Request, Response } from "express";
import User from "../model/user";
import { Model, Schema, Types } from "mongoose";
import Conversation, { ConversationType } from "../model/conversation";
import Messages from "../model/messages";
import { fetchMessages } from "./room";

// create new conversation between 2 people
export const createConversation = async (req: Request, res: Response) => {
  const members = req.body.members

  const conversation = new Conversation({
    _id: Types.ObjectId(),
    members: members,
    created_at: req.body.createdAt,
    updated_at: req.body.updatedAt,
    avatar: "s3_url",
    chatName: "",
    status: req.body.status
  })

  // get conversation of 2 people
  const listConversations = await Conversation
    .find({ $expr: { $eq: [{ $size: "$members" }, 2] } })

  const sameConversation = listConversations
    .filter(conversation =>
      conversation.members.includes(members[0])
      && conversation.members.includes(members[1]))

  if (sameConversation.length > 0) {
    return res.status(200).json({
      success: false,
      message: "Conversation exists",
      error: `Already have conversation with this user!`,
    });
  }

  else {
    return conversation
      .save()
      .then(async (conversation: ConversationType) => {
        const messages = new Messages({
          _id: Types.ObjectId(),
          conversationId: conversation._id,
          messages: []
        })

        await messages.save();

        return res.status(201).json({
          success: true,
          data: conversation
        })
      })
      .catch((error: any) => {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      })
  }

}

export const getActiveConversations = async (req: Request, res: Response) => {
  const status = req.params.status
  const username = req.params.username

  // get conversation of 2 people
  Conversation
    .find({ status: status })
    .then((result) => {
      // TODO: filter to get conversations contains only currentUser's username
      return result.filter((conversation) => conversation.members.includes(username))
    })
    .then((conversations) => {
      return res.status(200).json({
        success: true,
        data: conversations
      })
    })
}


export const getConversationById = async (req: Request, res: Response) => {
  const convId = req.params.id;
  const messages = await fetchMessages(convId);
  return res.status(200).json({
    success: true,
    data: messages
  })
}