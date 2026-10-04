import React, { useState } from "react";
import { CheckCircle2, Circle, Download, FileText, ExternalLink, ShieldCheck } from "lucide-react";
import { downloadAllCppFiles, StudentInfo } from "../utils/fileExporter";

interface ChecklistViewProps {
  student: StudentInfo;
  onOpenReport: () => void;
  onSelectQuestion: (id: string) => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  student,
  onOpenReport,
  onSelectQuestion,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c3: true,
    c4: true,
    c5: true,
    c6: true,
    c7: true,
    c8: true,
    c9: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checklist = [
    {
      id: "c1",
      title: "All 5 separate .cpp files created & compilable",
      desc: "q1_name_age_category.cpp, q2_even_numbers_sum.cpp, q3_array_and_functions.cpp, q4_student_class.cpp, q5_single_inheritance.cpp",
      targetQ: "q1",
    },
    {
      id: "c2",
      title: "Q1: Name, Age and Category logic verified",
      desc: "cin/cout, if-else-if ladder, Minor (<18), Adult (18-59), Senior Citizen (60+), welcome message.",
      targetQ: "q1",
    },
    {
      id: "c3",
      title: "Q2: Even Numbers and Sum verified",
      desc: "Positive integer N, for loop, modulo condition i % 2 == 0, running sum accumulation.",
      targetQ: "q2",
    },
    {
      id: "c4",
      title: "Q3: Array & 3 exact functions verified",
      desc: "5 user integers, findMax(arr[], n), findMin(arr[], n), findAverage(arr[], n) returning float.",
      targetQ: "q3",
    },
    {
      id: "c5",
      title: "Q4: Student Class with Constructor & Destructor verified",
      desc: "5 private data members, parameterized constructor, calculateAverage(), display(), ~Student() printing 'Object for roll number X destroyed'.",
      targetQ: "q4",
    },
    {
      id: "c6",
      title: "Q4 Required 2-3 line explanation included",
      desc: "Why we use constructor (automatic valid initialization) and destructor (automatic resource deallocation).",
      targetQ: "q4",
    },
    {
      id: "c7",
      title: "Q5: Single Inheritance & Method Overriding verified",
      desc: "Base class Vehicle, derived class Car publicly inheriting Vehicle, displayInfo() overridden, both objects invoked.",
      targetQ: "q5",
    },
    {
      id: "c8",
      title: "Q5 Required 2-3 line explanation & real-life example included",
      desc: "Inheritance explanation and real-life Vehicle -> Car example.",
      targetQ: "q5",
    },
    {
      id: "c9",
      title: "Student Information & Cover Header synced",
      desc: `Full Name: ${student.fullName} | Roll No: ${student.rollNumber} | Course: ${student.course}`,
      targetQ: null,
    },
  ];

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
              Final Submission Audit
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Assignment 1 Requirements Checklist
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verify every grading criteria specified in your brief before submitting to your trainer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadAllCppFiles}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .cpp Files</span>
            </button>
            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Open Full Document</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-700">Completion Status</span>
            <span className="text-emerald-600">
              {completedCount} of {checklist.length} Passed (100% Ready)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / checklist.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {checklist.map((item) => {
          const isDone = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                isDone
                  ? "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                  : "bg-slate-50 border-slate-200 opacity-70"
              }`}
            >
              <button
                onClick={() => toggleCheck(item.id)}
                className="mt-0.5 shrink-0 focus:outline-none"
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div
                  onClick={() => toggleCheck(item.id)}
                  className={`text-sm font-semibold cursor-pointer ${
                    isDone ? "text-slate-900" : "text-slate-500 line-through"
                  }`}
                >
                  {item.title}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
              </div>

              {item.targetQ && (
                <button
                  onClick={() => onSelectQuestion(item.targetQ!)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 shrink-0"
                >
                  <span>Review Code</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
