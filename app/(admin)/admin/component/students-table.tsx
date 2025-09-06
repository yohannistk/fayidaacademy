"use client";

import { Profile } from "@/types";

interface Props {
  students: Profile[];
}

export default function StudentsTable({ students }: Props) {
  return (
    <div className="mt-6 w-full px-4 sm:px-0">
      <h2 className="text-lg font-semibold mb-4">Students List</h2>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  School
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                      {s.first_name} {s.last_name} {s.grand_name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {s.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {s.school_name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {s.grade}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
