import React from "react";
import BasicTable from "../../components/BasicTable";


/*
TODO
* add intercativity to table rows like showing faculty attendance when admin click on faculty ro

*/

const columns = [
  { field: "faculty_name", headerName: "Faculty Name", align: "left" },
  { field: "subject", headerName: "Subject", align: "right" },
  { field: "class_name", headerName: "Class Name", align: "right" },
  { field: "status", headerName: "Absents or Present", align: "right" },
];

// Sample rows data
const rows = [
  { id: 1, faculty_name: "Dr. Smith", subject: "Mathematics", class_name: "Class 10-A", status: "Present" },
  { id: 2, faculty_name: "Ms. Johnson", subject: "Physics", class_name: "Class 10-B", status: "Absent" },
  { id: 3, faculty_name: "Mr. Lee", subject: "Chemistry", class_name: "Class 11-A", status: "Present" },
  { id: 4, faculty_name: "Mrs. Martinez", subject: "Biology", class_name: "Class 12-C", status: "Absent" },
  { id: 5, faculty_name: "Dr. Allen", subject: "English", class_name: "Class 9-B", status: "Present" },
  { id: 6, faculty_name: "Ms. Patel", subject: "History", class_name: "Class 11-B", status: "Present" },
  { id: 7, faculty_name: "Mr. Brown", subject: "Geography", class_name: "Class 10-C", status: "Absent" },
  { id: 8, faculty_name: "Mrs. Wilson", subject: "Economics", class_name: "Class 12-B", status: "Present" },
];

export default function ManageFaculty() {
  return (
    <>
      <BasicTable columns={columns} rows={rows} onRowClick={(row) => console.log(row)} />
    </>
  );
}
