import React from "react";
import { useGetTasksQuery } from "@/state/api";
import LoadingDots from "@/components/Loader";
import Error from "@/components/ErrorComponent";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/lib/types";

export type Props = {
  projectId: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView: React.FC<Props> = ({ projectId, setIsModalNewTaskOpen }) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(projectId) });

  if (isLoading) {
    return <LoadingDots />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
