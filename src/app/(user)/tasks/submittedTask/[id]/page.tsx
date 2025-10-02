import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import SubmittedTask from "@/model/submittedTaskModel";
import { fetchModelById } from "@/utils/modelFunc";

//cononents
import SubmittedTaskDetails from "@/components/SubmittedTaskDetails";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import Footer from "@/components/layout/Footer";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getToken();
  if (!user) return redirect("/login");

  const { isAdmin } = user;
  if (!isAdmin) return redirect("/dashboard");

  const subTask = await fetchModelById(SubmittedTask, id);

  return (
    <>
      <Header />
      <Main>
        <SubmittedTaskDetails subTask={subTask} />

        <Footer />
      </Main>
    </>
  );
}
