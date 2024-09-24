import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Project,
  SearchResult,
  StatusType,
  Task,
  Team,
  User,
} from "@/lib/types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Teams", "Users"],
  endpoints: (build) => ({
    // PROJECTS
    // Query - GET request
    //                        return type | sending
    //                   Project[]: TS Schema we get back from backend, void: what we pass as an argument
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    // Mutation - POST request
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    // *****************************************************************************************************************

    // TASKS
    // Query - GET request
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),

    // Mutation - POST request
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    // Mutation - PATCH request
    updateTaskStatus: build.mutation<
      Task,
      { status: StatusType; taskId: number }
    >({
      query: ({ status, taskId }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),

    // *****************************************************************************************************************
    // USERS
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    // *****************************************************************************************************************
    // TEAMS
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),

    // *****************************************************************************************************************
    // SEARCH
    search: build.query<SearchResult, string>({
      query: (query) => `search?query=${query}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useGetTeamsQuery,
  useGetUsersQuery,
  useSearchQuery,
} = api;
