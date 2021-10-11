import Conversation, { ConversationType } from "../model/conversation";
import User from "../model/user";
import Messages, { MessagesType, SingleMsgType } from "../model/messages";
import { Types } from "mongoose";

const users = [];
let conversation;
let user;

export const joinConversation = async ({ id, name, room, senderId }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // console.log(name, room);
  // find room by id (get conversation by id)
  conversation = await Conversation.findById(room);

  const returnUser = {
    id: conversation._id,
    name: name,
    room: conversation._id,
    senderId: name,
  };

  return returnUser;
};

export const getUser = async (id) => {
  user = await User.findById(id);
  const responseGetUser = {
    room: conversation._id,
    senderId: user._id,
    name: user.username,
  };

  return responseGetUser;
};


export const saveMessages = async (roomInfo, message) => {
  // console.log(roomInfo, message)
  const conversationId = roomInfo.room;

  const singleMsg: SingleMsgType = {
    senderId: roomInfo.senderId,
    content: message.content,
    createdAt: message.createdAt,
    isDeleted: false,
    isSeen: false
  }

  const document = await Messages.findOne({ conversationId: conversationId })
  // .then((doc) => {
  //   doc?.messages.push(singleMsg);
  // })
  document?.messages.push(singleMsg);
  document?.save();

  return document;
}


export const fetchMessages = async (conversationId) => {
  return Messages.findOne({ conversationId: conversationId })
}