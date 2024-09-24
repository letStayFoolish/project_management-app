"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSearchQuery } from "@/state/api";
import LoadingDots from "@/components/Loader";
import Error from "@/components/ErrorComponent";
import TaskCard from "@/components/TaskCard";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import UserCard from "@/components/UserCard";

const SearchPage: React.FC = () => {
  const [searchTherm, setSearchTherm] = useState("");

  const {
    data: searchResults,
    isError,
    isLoading,
  } = useSearchQuery(searchTherm, {
    skip: searchTherm.length < 3,
  });

  const handleSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTherm(event.target.value as string);
  }, 500);

  useEffect(() => {
    return handleSearch.cancel();
  }, [handleSearch.cancel]);

  if (isLoading) {
    return <LoadingDots />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="p-8">
      <Header name="Search" />
      <div className="relative flex h-auto w-1/4">
        <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
        <input
          type="text"
          className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2>Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {searchResults.users && searchResults.users?.length > 0 && (
              <h2>Users</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
