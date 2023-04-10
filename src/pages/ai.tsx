import React, { useState, useEffect } from "react";
import Papa, { ParseResult } from "papaparse";
import { NextPage } from "next";

interface CSVRow {
  College: string;
  Course: string;
  LO: string;
  Rubic: string;
  Description: string;
}
const Dropdown = () => {
  const [options, setOptions] = useState<CSVRow[]>([]);

  const uniqueColleges = [
    ...new Set(options.map((obj) => obj.College)),
  ] as const;
  type College = (typeof uniqueColleges)[number];
  const [college, setCollege] = useState<College | null>(null);

  const uniqueCoursesInCollege = options
    .filter((obj) => obj.College == college)
    .map((obj) => obj.Course)
    .filter((obj, idx, self) => self.indexOf(obj) == idx);
  type Course = (typeof uniqueCoursesInCollege)[number];
  const [course, setCourse] = useState<Course | null>(null);

  const uniqueLOsInCourse = options
    .filter((obj) => obj.Course == course)
    .map((obj) => obj.LO)
    .filter((obj, idx, self) => self.indexOf(obj) == idx);
  type LO = (typeof uniqueLOsInCourse)[number];
  const [LO, setLO] = useState<LO | null>(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/data/LOs_cleaned.csv");
      if (!response || !response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }
      const reader = response.body!.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      Papa.parse(csv, {
        header: true,
        complete: function (results: ParseResult<CSVRow>) {
          setOptions(results.data);
        },
      });
    }

    getData();
  }, []);

  return (
    <>
      <select onChange={(e) => setCollege(e.target.value)}>
        {uniqueColleges.map((college, index) => (
          <option key={index} value={college}>
            {college}
          </option>
        ))}
      </select>
      {college && (
        <select onChange={(e) => setCourse(e.target.value)}>
          {uniqueCoursesInCollege.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      )}
      {course && (
        <select onChange={(e) => setLO(e.target.value)}>
          {uniqueLOsInCourse.map((LO, index) => (
            <option key={index} value={LO}>
              #{LO}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

const MyPage: NextPage = () => {
  return (
    <div>
      <Dropdown />
    </div>
  );
};

export default MyPage;
