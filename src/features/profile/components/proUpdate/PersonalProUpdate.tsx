"use client";

//components
import Button from "@/shared/components/ui/Button";
import ProfileField from "@/shared/components/ui/ProfileField";
import ProUpdateForm from "@/features/profile/forms/ProUpdateForm";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import SuccessModal from "@/shared/components/modals/SuccessModal";

//hooks
import useFormState from "@/shared/hooks/useFormState";

type PersonalProUpdateProbs = {
  userpersonalData: {
    firstname: string;
    lastname: string;
    setLastname: React.Dispatch<React.SetStateAction<string>>;
    setFirstname: React.Dispatch<React.SetStateAction<string>>;
    username: string;
    email: string;
  };
};

export default function PersonalProUpdate({
  userpersonalData,
}: PersonalProUpdateProbs) {
  const { isPen, setIspen, isSuc, setIssuc, isErr, setIserr, errMsg, setErrmsg, sucMsg, setSucmsg } = useFormState();

  const { firstname, lastname, setFirstname, setLastname, username, email } =
    userpersonalData;

  //
  async function handlePerProUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //set pending to true
    setIspen(true);

    const response = await fetch(`/api/users/${username}?updateType=personal`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setIssuc(true);
      setSucmsg(result.success);
    } else {
      setIserr(true);
      setErrmsg(result.error);
    }

    //set pending to false
    setIspen(false);
  }

  return (
    <ProUpdateForm handleForm={handlePerProUp} title="Personal Information">
      <ProfileField label="Firstname" htmlFor="firstname">
        <input
          className="input text-right"
          type="text"
          value={firstname}
          name="firstname"
          id="firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </ProfileField>

      <ProfileField label="Surname" htmlFor="lastname">
        <input
          className="input text-right"
          type="text"
          value={lastname}
          name="lastname"
          id="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
      </ProfileField>

      <ProfileField label="Username" htmlFor="username">
        <input
          className="input text-right"
          type="text"
          value={username}
          readOnly
          disabled
          autoComplete="true"
          name="username"
          id="username"
        />
      </ProfileField>

      <ProfileField label="Email" htmlFor="email">
        <input
          className="input text-right"
          type="email"
          value={email}
          readOnly
          disabled
          autoComplete="true"
          name="email"
          id="email"
        />
      </ProfileField>
      <div className="text-right mt-5">
        <Button btnStyle="btn btn-primary w-[100px]">
          {isPen ? "Updating..." : "Update"}
        </Button>
      </div>

      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </ProUpdateForm>
  );
}
