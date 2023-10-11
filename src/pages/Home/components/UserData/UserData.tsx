import React, { ChangeEvent, useState } from "react";
import { observer } from "mobx-react-lite";

import { store } from "src/models/User";

interface UsersNames {
  [key: number]: string;
}

const UserData: React.FC = observer(() => {
  const [changeNameIds, setChangeNameIds] = useState<number[]>([]);
  const [usersNames, setUsersNames] = useState<UsersNames>({});

  const handleDeleteUser = (userId: number) => () => {
    store.deleteUser(userId);
  };

  const handleChangeValueName =
    (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
      setUsersNames((prev) => ({ ...prev, [id]: event.target.value }));
    };

  const handleOpenChangeName = (id: number) => () => {
    setChangeNameIds((prev) => [...prev, id]);
  };

  const handleCloseChangeName = (id: number) => () => {
    setChangeNameIds((prev) => {
      return prev.filter((userId) => userId !== id);
    });
    setUsersNames((prev) => {
      delete prev[id];
      return prev;
    });
  };

  const handleChangeUserName =
    (id: number, changeName: (name: string) => void) => () => {
      changeName(usersNames[id]);
      handleCloseChangeName(id)();
    };

  return (
    <div>
      {store.users.map(
        ({ id, name, username, email, blocked, changeName, toggle }) => (
          <div key={id}>
            <div>
              name:
              {!changeNameIds.includes(id) ? (
                name
              ) : (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={usersNames[id] || name}
                    onChange={handleChangeValueName(id)}
                    required
                  />
                  <span
                    className="icon-field-name"
                    onClick={handleCloseChangeName(id)}
                  >
                    &#10539;
                  </span>
                  <span
                    className="icon-field-name"
                    onClick={handleChangeUserName(id, changeName)}
                  >
                    &#10003;
                  </span>
                </>
              )}
              {!blocked && !changeNameIds.includes(id) ? (
                <span
                  className="icon-field-name"
                  onClick={handleOpenChangeName(id)}
                >
                  &#9998;
                </span>
              ) : null}
            </div>
            <div>username: {username}</div>
            <div>email: {email}</div>
            <div>blocked: {`${blocked}`}</div>
            <button onClick={toggle}>{blocked ? "unlock" : "block"}</button>
            {!blocked ? (
              <button onClick={handleDeleteUser(id)}>delete user</button>
            ) : null}
            <hr />
          </div>
        )
      )}
    </div>
  );
});

export default UserData;
