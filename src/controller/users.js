const users = [];

export const addUser = ({ id, name, room, senderId }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );

  if (existingUser) {
    return { error: "Username already exist" };
  }

  const user = { id, name, room, senderId };

  users.push(user);

  // console.log("xxxxx ", users);
  return { user };
};

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id) => {
  return users.find((user) => user.id === id);
};

export const getUsersInRoom = (room) => {
  users.filter((user) => user.room === room);
};
