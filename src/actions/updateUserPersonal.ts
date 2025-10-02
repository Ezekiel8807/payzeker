"use server";
import User from "@/model/userModel";

export async function updateUserPersonal(formData: FormData) {
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const username = formData.get("username");
  const email = formData.get("email");

  console.log(firstname, lastname, username, email);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: { firstname, lastname } }
    );

    if (!updatedUser) {
      throw new Error("Error while Updating user");
    }

    // return redirect("/profile?succes=true");
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}
