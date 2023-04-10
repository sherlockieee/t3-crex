import React, { useState, useEffect } from "react";
import Papa, { ParseResult } from "papaparse";
import { NextPage } from "next";
import { SelectDropdown } from "~/components/SelectDropdown";

interface CSVRow {
  College: string;
  Course: string;
  LO: string;
  Rubic: string;
  Description: string;
}

const Dropdown = () => {
  const [options, setOptions] = useState<CSVRow[]>([]);

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

  const uniqueColleges = [
    ...new Set(options.map((obj) => obj.College)),
  ] as const;
  type College = (typeof uniqueColleges)[number];
  const [college, setCollege] = useState<College | undefined>(undefined);

  const uniqueCoursesInCollege = options
    .filter((obj) => obj.College == college)
    .map((obj) => obj.Course)
    .filter((obj, idx, self) => self.indexOf(obj) == idx);
  type Course = (typeof uniqueCoursesInCollege)[number];
  const [course, setCourse] = useState<Course | undefined>(undefined);

  const uniqueLOsInCourse = options
    .filter((obj) => obj.Course == course)
    .map((obj) => obj.LO)
    .filter((obj, idx, self) => self.indexOf(obj) == idx);
  type LO = (typeof uniqueLOsInCourse)[number];
  const [LO, setLO] = useState<LO | undefined>(undefined);

  return (
    <>
      <SelectDropdown
        value={college}
        onValueChange={(value) => setCollege(value)}
        placeholder="Select a college"
        valueList={uniqueColleges}
      />

      {college && (
        <SelectDropdown
          value={course}
          onValueChange={(value) => setCourse(value)}
          placeholder="Select a course"
          valueList={uniqueCoursesInCollege}
        />
      )}
      {course && (
        <SelectDropdown
          value={LO}
          onValueChange={(value) => setLO(value)}
          placeholder="Select a learning outcome"
          valueList={uniqueLOsInCourse}
          formatter={(val) => `#${val}`}
        />
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
