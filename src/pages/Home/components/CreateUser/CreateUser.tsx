import React, { ChangeEvent, FormEvent, useState } from "react";
import { observer } from "mobx-react-lite";

import { store } from "src/models/User";

const userInitialValue = {
  name: "",
  username: "",
  email: "",
};

const CreateUser: React.FC = observer(() => {
  const [createUserData, setCreateUserData] = useState(userInitialValue);

  const handleCreateUser = (event: FormEvent) => {
    event.preventDefault();

    store.addUser({
      name: createUserData.name,
      username: createUserData.username,
      email: createUserData.email,
      blocked: false,
    });

    setCreateUserData(userInitialValue);
  };

  const handleChangeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreateUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleCreateUser}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={createUserData.name}
          onChange={handleChangeFields}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={createUserData.username}
          onChange={handleChangeFields}
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={createUserData.email}
          onChange={handleChangeFields}
          required
        />
      </div>
      <button type={"submit"}>create user</button>
    </form>
  );
});

export default CreateUser;
