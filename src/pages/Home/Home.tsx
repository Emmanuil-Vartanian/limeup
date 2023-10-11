import React from "react";
import { observer } from "mobx-react-lite";

import "./style.css";

import CreateUser from "./components/CreateUser";
import UserData from "./components/UserData";

const Home: React.FC = observer(() => {
  return (
    <div>
      <UserData />
      <CreateUser />
    </div>
  );
});

export default Home;
