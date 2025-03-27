"use client";
import { Logout } from "../utils/logout";

// components
import Button from "./Button";

type Logout_btnProbs = {
  logoutBtnStyle: string;
};

export default function Logout_btn({ logoutBtnStyle }: Logout_btnProbs) {
  return (
    <Button disabled={false} btnAction={Logout} btnStyle={logoutBtnStyle}>
      Logout
    </Button>
  );
}
