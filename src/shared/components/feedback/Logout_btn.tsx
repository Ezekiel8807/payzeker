"use client";
import { Logout } from "@/shared/utils/logout";
import Button from "@/shared/components/ui/Button";
import { Icon } from "@iconify/react";

type Logout_btnProbs = { logoutBtnStyle: string; };

export default function Logout_btn({ logoutBtnStyle }: Logout_btnProbs) {
  return (
    <Button disabled={false} btnAction={Logout} btnStyle={logoutBtnStyle}>
      <Icon icon="material-symbols:logout" width={20} />
      <span> Logout </span>
    </Button>
  );
}
