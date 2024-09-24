"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import Board from "@/app/projects/BoardView";
import List from "@/app/projects/ListView";
import Timeline from "@/app/projects/TimelineView";
import Table from "@/app/projects/TableView";
import ModalNewTask from "@/components/ModalNewTask";

type Props = {
  params: { id: string };
};

const Page: React.FC<Props> = ({ params }) => {
  const { id } = params;
  const [isActiveTab, setIsActiveTab] = useState<string>("Border");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false);

  return (
    <div>
      {/*  NEW TASK MODAL*/}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={isActiveTab} setActiveTab={setIsActiveTab} />
      {isActiveTab === "Border" && (
        <Board projectId={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {isActiveTab === "List" && (
        <List projectId={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {isActiveTab === "Timeline" && (
        <Timeline
          projectId={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {isActiveTab === "Table" && (
        <Table projectId={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Page;
