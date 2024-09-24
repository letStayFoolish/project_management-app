export type Project = {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;

  // tasks: Task[];
  // projectTeams: ProjectTeam[];
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  status?: StatusType;
  priority?: PriorityType;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
};

export type User = {
  userId: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
};

export type Comment = {
  id: number;
  text: string;
  taskId: number;
  userId: number;
};

export type Attachment = {
  id: number;
  fileURL: string;
  fileName?: string;
  taskId: number;
  uploadedById: number;
};

export const PRIORITY = {
  Urgent: "Urgent",
  High: "High",
  Medium: "Medium",
  Low: "Low",
  Backlog: "Backlog",
} as const;

export type PriorityType = ObjectValues<typeof PRIORITY>;

export const STATUS = {
  ToDo: "To Do",
  WorkInProgress: "Work In Progress",
  UnderReview: "Under Review",
  Completed: "Completed",
} as const;

export type StatusType = ObjectValues<typeof STATUS>;

// export type ProjectTeam = {};

export type ObjectKeys<T> = keyof T;
export type ObjectValues<T> = T[keyof T];

export type SearchResult = {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
};

export type Team = {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
};
