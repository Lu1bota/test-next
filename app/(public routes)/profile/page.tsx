import Link from "next/link";

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
      <Link href={`/profile/edit`}>Edit profile</Link>
    </div>
  );
};

export default Profile;
