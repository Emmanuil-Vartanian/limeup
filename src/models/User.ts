import { types } from "mobx-state-tree";
import usersData from "src/bd/users.json";

interface CreateUser {
  name: string;
  username: string;
  email: string;
  blocked: boolean;
}

export const User = types
  .model("User", {
    id: types.number,
    name: types.string,
    username: types.string,
    email: types.string,
    blocked: types.boolean,
  })
  .actions((self) => ({
    changeName(name: string) {
      self.name = name;
    },
    toggle() {
      self.blocked = !self.blocked;
    },
  }));

export const RootStore = types
  .model("UserStore", {
    users: types.array(User),
  })
  .actions((self) => {
    const addUser = (data: CreateUser) => {
      const newId = self.users[self.users.length - 1].id + 1;

      self.users.push({
        id: newId,
        ...data,
      });
    };

    const deleteUser = (id: number) => {
      const todoIndex = self.users.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        self.users.splice(todoIndex, 1);
      }
    };

    return { addUser, deleteUser };
  });

export const store = RootStore.create({
  users: usersData,
});
