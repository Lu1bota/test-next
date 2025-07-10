"use client";

import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { getMe } from "@/lib/api";
import { updateMe, uploadImage } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
// import { Metadata } from "next";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Edit Profile",
//   description: "Edit your user details and settings",
// };

const ProfileEdit = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? "");
      setPhotoUrl(user.photoUrl ?? "");
    });
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value);
  }

  async function handleSaveUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const newPhotoUrl = imageFile ? await uploadImage(imageFile) : "";
      await updateMe({ userName, photoUrl: newPhotoUrl });
      router.push("/profile");
    } catch (error) {
      console.error("Oops, some error: ", error);
    }
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <AvatarPicker profilePhotoUrl={photoUrl} onChangePhoto={setImageFile} />
      <br />
      <form onSubmit={handleSaveUser}>
        <input type="text" value={userName} onChange={handleChange} />
        <br />
        <button type="submit">Save user</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
