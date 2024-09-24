import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTaskMutation } from "@/state/api";
import { PRIORITY, STATUS } from "@/lib/types";
import Modal from "@/components/Modal";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const ModalNewTask: React.FC<Props> = ({ isOpen, onClose, id }) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const priorityEnum = z.enum(["Urgent", "High", "Medium", "Low", "Backlog"]);
  const statusEnum = z.enum([
    "To Do",
    "Work In Progress",
    "Under Review",
    "Completed",
  ]);

  // Define the newTaskFormSchema according to Task type
  const newTaskFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: statusEnum.optional(),
    priority: priorityEnum.optional(),
    tags: z.string().optional(),
    startDate: z.string().optional(),
    dueDate: z.string().optional(),
    points: z.number().optional(),
    projectId: z.number().optional(),
    authorUserId: z.string().min(1, { message: "Author ID is required." }),
    assignedUserId: z.string().optional(),
  });

  type NewTaskType = z.infer<typeof newTaskFormSchema>;

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const errorSpanStyles = "mt-2 py-2 text-xs text-red-400 font-semibold";

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const { handleSubmit, register, setError, formState } = useForm<NewTaskType>({
    resolver: zodResolver(newTaskFormSchema),
  });

  const onSubmit: SubmitHandler<NewTaskType> = async (data) => {
    let formattedStartDateISO = "";
    let formattedDueDateISO = "";

    if (data.startDate) {
      formattedStartDateISO = formatISO(new Date(data.startDate), {
        representation: "complete",
      });
    } else {
      formattedStartDateISO = formatISO(new Date(), {
        representation: "complete",
      });
    }

    if (data.dueDate) {
      formattedDueDateISO = formatISO(new Date(data.dueDate), {
        representation: "complete",
      });
    } else {
      formattedDueDateISO = formatISO(new Date(), {
        representation: "complete",
      });
    }

    const newTaskBody = {
      ...data,
      startDate: formattedStartDateISO,
      dueDate: formattedDueDateISO,
      projectId: id !== null ? Number(id) : data.projectId,
      authorUserId: parseInt(data.authorUserId),
      assignedUserId: data.assignedUserId
        ? parseInt(data.assignedUserId)
        : undefined,
    };

    try {
      console.log("newTaskBody: ", newTaskBody);

      await createTask(newTaskBody);

      // console.log(newTaskFormSchema.safeParse(newTaskBody));
    } catch (error: any) {
      console.error(error);
      setError("root", {
        message: `Something went wrong. Please try again. ${error.message || ""}`,
      });
    } finally {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form className="mt-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          type="text"
          className={inputStyles}
          placeholder="Title"
        />
        {formState.errors.title && (
          <span className={errorSpanStyles}>
            {formState.errors.title.message}
          </span>
        )}
        <textarea
          {...register("description")}
          className={inputStyles}
          placeholder="Description"
        />

        {formState.errors.description && (
          <span className={errorSpanStyles}>
            {formState.errors.description.message}
          </span>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select className={selectStyles} {...register("status")}>
            <option value="">Select Status</option>
            <option value={STATUS.ToDo}>To Do</option>
            <option value={STATUS.WorkInProgress}>Work In Progress</option>
            <option value={STATUS.UnderReview}>Under Review</option>
            <option value={STATUS.Completed}>Completed</option>
          </select>

          {formState.errors.status && (
            <span className={errorSpanStyles}>
              {formState.errors.status.message}
            </span>
          )}
          <select className={selectStyles} {...register("priority")}>
            <option value="">Select Priority</option>
            <option value={PRIORITY.Urgent}>Urgent</option>
            <option value={PRIORITY.High}>High</option>
            <option value={PRIORITY.Medium}>Medium</option>
            <option value={PRIORITY.Low}>Low</option>
            <option value={PRIORITY.Backlog}>Backlog</option>
          </select>

          {formState.errors.priority && (
            <span className={errorSpanStyles}>
              {formState.errors.priority.message}
            </span>
          )}
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          {...register("tags")}
        />

        {formState.errors.tags && (
          <span className={errorSpanStyles}>
            {formState.errors.tags.message}
          </span>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            {...register("startDate")}
          />

          {formState.errors.startDate && (
            <span className={errorSpanStyles}>
              {formState.errors.startDate.message}
            </span>
          )}
          <input type="date" className={inputStyles} {...register("dueDate")} />

          {formState.errors.dueDate && (
            <span className={errorSpanStyles}>
              {formState.errors.dueDate.message}
            </span>
          )}
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          {...register("authorUserId")}
        />

        {formState.errors.authorUserId && (
          <span className={errorSpanStyles}>
            {formState.errors.authorUserId.message}
          </span>
        )}
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          {...register("assignedUserId")}
        />

        {formState.errors.assignedUserId && (
          <span className={errorSpanStyles}>
            {formState.errors.assignedUserId.message}
          </span>
        )}
        {id === null && (
          <>
            <input
              type="text"
              className={inputStyles}
              placeholder="Project ID"
              {...register("projectId")}
            />
            {formState.errors.projectId && (
              <span className={errorSpanStyles}>
                {formState.errors.projectId.message}
              </span>
            )}
          </>
        )}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            isLoading || formState.isSubmitting
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          disabled={isLoading || formState.isSubmitting}
        >
          {isLoading || formState.isSubmitting ? "Creating..." : "Create Task"}
        </button>
        {formState.errors.root && (
          <span className={errorSpanStyles}>
            {formState.errors.root.message}
          </span>
        )}
      </form>
    </Modal>
  );
};

export default ModalNewTask;
