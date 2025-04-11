// import Button from "@/components/Button";

import UserCreationForm from "@/components/form/UserCreationForm";
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";

export default function page() {
  return (
    <Main>
      <SubHeading title="Create User" desc="Setup a new user account." />

      <UserCreationForm />
    </Main>
  );
}
