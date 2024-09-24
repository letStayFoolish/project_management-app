"use client";

import React, { useState } from "react";
import {
  Clock,
  Filter,
  Grid3X3Icon,
  List,
  PlusSquare,
  Share2,
  Table,
} from "lucide-react";
import Header from "@/components/Header";
import ModalNewProject from "./ModalNewProject";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] =
    useState<boolean>(false);

  return (
    <div className="px-4 xl:px-6">
      {/* NEW PROJECT MODAL */}
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name="Product Design Development"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" /> New Boards
            </button>
          }
        />
      </div>

      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name={"Border"}
            icon={<Grid3X3Icon className="h-5 w-5" />}
            setIsActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name={"List"}
            icon={<List className="h-5 w-5" />}
            setIsActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name={"Timeline"}
            icon={<Clock className="h-5 w-5" />}
            setIsActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name={"Table"}
            icon={<Table className="h-5 w-5" />}
            setIsActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>

          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>

          <div className="relative">
            <input
              type="search"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3X3Icon className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setIsActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton: React.FC<TabButtonProps> = ({
  name,
  setIsActiveTab,
  activeTab,
  icon,
}) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""}`}
      onClick={() => setIsActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
