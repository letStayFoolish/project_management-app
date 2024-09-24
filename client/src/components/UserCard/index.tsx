import React from "react";
import { User } from "@/lib/types";
import Image from "next/image";

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex items-center gap-2 rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`/${user.profilePictureUrl}`}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
