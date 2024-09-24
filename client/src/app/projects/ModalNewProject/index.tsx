import React from "react";
import Modal from "@/components/Modal";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProjectMutation } from "@/state/api";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject: React.FC<Props> = ({ isOpen, onClose }) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const newProjectSchema = z.object({
    name: z.string().min(1, { message: "Project name is required" }),
    description: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  });

  type NewProjectType = z.infer<typeof newProjectSchema>;

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const errorSpanStyles = "mt-2 py-2 text-xs text-red-400 font-semibold";

  const form = useForm<NewProjectType>({
    resolver: zodResolver(newProjectSchema),
  });

  const onSubmit: SubmitHandler<NewProjectType> = async (data) => {
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

    if (data.endDate) {
      formattedDueDateISO = formatISO(new Date(data.endDate), {
        representation: "complete",
      });
    } else {
      formattedDueDateISO = formatISO(new Date(), {
        representation: "complete",
      });
    }

    const body = {
      ...data,
      startDate: formattedStartDateISO,
      endDate: formattedDueDateISO,
    };

    try {
      await createProject(body);
      console.log(newProjectSchema.safeParse(body));
      // eslint-disable-next-line
    } catch (error: any) {
      console.error(error);
      form.setError("root", {
        message: `Something went wrong. Please try again. ${error.message || ""}`,
      });
    } finally {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form className="mt-4 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <input
          {...form.register("name")}
          type="text"
          className={inputStyles}
          placeholder="Project Name"
        />
        {form.formState.errors.name && (
          <span className={errorSpanStyles}>
            {form.formState.errors.name.message}
          </span>
        )}
        <textarea
          {...form.register("description")}
          className={inputStyles}
          placeholder="Description"
        />
        {form.formState.errors.description && (
          <span className={errorSpanStyles}>
            {form.formState.errors.description.message}
          </span>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            {...form.register("startDate")}
            type="date"
            className={inputStyles}
          />

          {form.formState.errors.startDate && (
            <span className={errorSpanStyles}>
              {form.formState.errors.startDate.message}
            </span>
          )}
          <input
            {...form.register("endDate")}
            type="date"
            className={inputStyles}
          />
          {form.formState.errors.endDate && (
            <span className={errorSpanStyles}>
              {form.formState.errors.endDate.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            isLoading || form.formState.isSubmitting
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          disabled={isLoading || form.formState.isSubmitting}
        >
          {isLoading || form.formState.isSubmitting
            ? "Creating..."
            : "Create Project"}
        </button>
        {form.formState.errors.root && (
          <span className={errorSpanStyles}>
            {form.formState.errors.root.message}
          </span>
        )}
      </form>
    </Modal>
  );
};

export default ModalNewProject;
