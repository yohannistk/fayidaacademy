import { Profile } from "@/types";
import React from "react";
import StudentsTable from "./students-table";

interface Props {
  students: Profile[];
}

const StudentsList = (props: Props) => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-medium">Students</h1>
      <StudentsTable students={props.students} />
    </div>
  );
};

export default StudentsList;
