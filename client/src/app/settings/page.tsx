import React from "react";
import Header from "@/components/Header";

const SettingsPage: React.FC = () => {
  const userSettings = {
    username: "John Doe",
    email: "johndoe@example.com",
    team: "Development Team",
    roleName: "Developer",
  };

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  return (
    <div className="p-4">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyles}>{userSettings.username}</div>
        </div>

        <div>
          <label className={labelStyles}>Email</label>
          <div className={textStyles}>{userSettings.email}</div>
        </div>

        <div>
          <label className={labelStyles}>Team</label>
          <div className={textStyles}>{userSettings.team}</div>
        </div>

        <div>
          <label className={labelStyles}>Role</label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;