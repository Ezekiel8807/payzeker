// import Button from "@/components/Button";
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import TaskCreationForm from "@/components/TaskCreationForm";

export default function page() {
  return (
    <Main>
      <SubHeading
        title="Create Task"
        desc="Where you get your task up runing."
      />

      <TaskCreationForm />
    </Main>
  );
}
