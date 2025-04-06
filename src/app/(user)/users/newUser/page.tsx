// import Button from "@/components/Button";

import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import TaskCreationForm from "@/components/form/TaskCreationForm";

export default function page() {
  return (
    <Main>
      <SubHeading title="Create User" desc="Setup a new user account." />

      <TaskCreationForm />
    </Main>
  );
}
