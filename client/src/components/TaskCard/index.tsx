import React from "react";
import { Task } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";

type Props = {
  task: Task;
};

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <div className="mb-6 rounded-lg border border-gray-300 bg-white p-6 shadow-sm transition-transform duration-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <strong className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
            Attachments:
          </strong>

          <div className="flex flex-wrap gap-2">
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName as string}
              width={400}
              height={200}
              className="h-auto w-full rounded-md object-cover"
            />
          </div>
        </div>
      )}
      <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
        <strong>ID:</strong> {task.id}
      </p>

      <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        {task.title}
      </h3>

      <p className="mb-4 text-sm text-gray-700 dark:text-gray-400">
        {task.description || "No description provided"}
      </p>

      <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
        <p>
          <strong className="font-medium text-gray-600 dark:text-gray-300">
            Status:
          </strong>{" "}
          {task.status}
        </p>
        <p>
          <strong className="font-medium text-gray-600 dark:text-gray-300">
            Priority:
          </strong>{" "}
          {task.priority}
        </p>
        <p>
          <strong className="font-medium text-gray-600 dark:text-gray-300">
            Tags:
          </strong>{" "}
          {task.tags || "No tags"}
        </p>
        <p>
          <strong className="font-medium text-gray-600 dark:text-gray-300">
            Start Date:
          </strong>{" "}
          {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
        </p>
        <p>
          <strong className="font-medium text-gray-600 dark:text-gray-300">
            Due Date:
          </strong>{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
        </p>
        <p>
          <strong className="font-medium text-gray-600 dark:text-gray-300">
            Author:
          </strong>{" "}
          {task.author ? task.author.username : "Unknown"}
        </p>
        <p>
          <strong className="font-medium text-gray-600 dark:text-gray-300">
            Assignee:
          </strong>{" "}
          {task.assignee ? task.assignee.username : "Unassigned"}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
