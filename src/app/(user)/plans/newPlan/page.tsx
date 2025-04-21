import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import PlanCreationForm from "@/components/form/PlanCreationForm";

export default function page() {
  return (
    <Main>
      <SubHeading title="Create Plan" desc="creating user subcribtion plan" />

      <PlanCreationForm />
    </Main>
  );
}
