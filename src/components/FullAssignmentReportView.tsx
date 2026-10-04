import React, { useState } from "react";
import { Printer, Copy, Check, Download, BookCheck, ShieldCheck } from "lucide-react";
import { assignmentQuestions } from "../data/assignmentData";
import { StudentInfo, generateAssignmentMarkdown, copyToClipboard, downloadAllCppFiles } from "../utils/fileExporter";

interface FullAssignmentReportViewProps {
  student: StudentInfo;
}

export const FullAssignmentReportView: React.FC<FullAssignmentReportViewProps> = ({ student }) => {
  const [copiedMd, setCopiedMd] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = async () => {
    const md = generateAssignmentMarkdown(student);
    const success = await copyToClipboard(md);
    if (success) {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Top Action Bar (hidden when printing) */}
      <div className="print:hidden bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Official Assignment Submission Document
          </h2>
          <p className="text-xs text-slate-500">
            Formatted strictly according to your assignment rubric. Ready to print or copy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
          >
            {copiedMd ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied Markdown!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Markdown Report</span>
              </>
            )}
          </button>

          <button
            onClick={downloadAllCppFiles}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All .cpp</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Assignment Document Sheet */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 shadow-sm text-slate-900 print:border-none print:shadow-none print:p-0">
        {/* 1. Cover / Header Information */}
        <div className="border-b-2 border-slate-900 pb-6 mb-8 text-center sm:text-left">
          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-1">
            LAB REPORT & CODE SUBMISSION
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            C++ & Data Structures – Assignment 1
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <span className="font-semibold text-slate-900">Student Name:</span>{" "}
              {student.fullName}
            </div>
            <div>
              <span className="font-semibold text-slate-900">Roll / Registration No:</span>{" "}
              <span className="font-mono">{student.rollNumber}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Course / Internship:</span>{" "}
              {student.course}
            </div>
            <div>
              <span className="font-semibold text-slate-900">Assignment:</span>{" "}
              {student.assignment}
            </div>
            <div>
              <span className="font-semibold text-slate-900">Institution:</span>{" "}
              {student.institution}
            </div>
            <div>
              <span className="font-semibold text-slate-900">Date of Submission:</span>{" "}
              {student.submissionDate}
            </div>
          </div>
        </div>

        {/* Table of Contents for Document */}
        <div className="mb-10 p-4 bg-slate-50/70 border border-slate-200 rounded-lg print:break-inside-avoid">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Index / Contents
          </div>
          <ol className="text-xs text-slate-700 space-y-1 list-decimal list-inside font-medium">
            <li>Q1 – Name, Age and Category (if-else-if Ladder)</li>
            <li>Q2 – Even Numbers and Sum (for Loop & Modulo Arithmetic)</li>
            <li>Q3 – Array and Functions (findMax, findMin, findAverage)</li>
            <li>Q4 – Student Class, Constructor and Destructor (OOP Lifecycle)</li>
            <li>Q5 – Single Inheritance (Vehicle & Car, Function Overriding)</li>
            <li>Final Submission Checklist & Verification</li>
          </ol>
        </div>

        {/* Questions 1 through 5 */}
        <div className="space-y-12">
          {assignmentQuestions.map((q) => (
            <section
              key={q.id}
              className="pt-6 border-t border-slate-200 print:break-before-page first:border-t-0 first:pt-0"
            >
              {/* Question Header */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-0.5">
                  Question {q.num}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {q.title}
                </h2>
                <div className="text-xs font-mono text-slate-500 mt-1">
                  Source File: {q.fileName}
                </div>
              </div>

              {/* 1. Objective */}
              <div className="mb-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1 text-indigo-900">
                  1. Objective
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                  {q.objective}
                </p>
              </div>

              {/* 2. C++ Source Code */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide text-indigo-900">
                    2. Complete C++ Source Code
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">
                    {q.fileName}
                  </span>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <pre>
                    <code>{q.sourceCode}</code>
                  </pre>
                </div>
              </div>

              {/* 3. Explanation of the Code */}
              <div className="mb-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 text-indigo-900">
                  3. Explanation of the Code
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  {q.explanation.summary}
                </p>
                <div className="space-y-2">
                  {q.explanation.sections.map((sec, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs">
                      <div className="font-bold text-slate-900 mb-1">{sec.heading}</div>
                      <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {sec.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific explanations for Q4 / Q5 */}
              {q.extraSection && (
                <div className="mb-5 p-4 bg-indigo-50/50 border border-indigo-200 rounded-lg">
                  <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wide mb-3">
                    {q.extraSection.title}
                  </h3>
                  <div className="space-y-3">
                    {q.extraSection.items.map((item, idx) => (
                      <div key={idx} className="text-xs">
                        <span className="font-bold text-indigo-900 block mb-0.5">
                          {item.label}
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Expected / Sample Output */}
              <div className="mb-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1 text-indigo-900">
                  4. Sample / Expected Output
                </h3>
                <div className="bg-black p-3.5 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">
                  {q.sampleOutput}
                </div>
              </div>

              {/* 5. Important Concepts Used */}
              <div className="mb-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 text-indigo-900">
                  5. Important Concepts Used
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {q.conceptsUsed.map((concept, idx) => (
                    <li key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. Viva / Interview Questions */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 text-indigo-900">
                  6. Viva / Interview Questions & Answers
                </h3>
                <div className="space-y-2.5">
                  {q.vivaQuestions.map((viva, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="font-semibold text-slate-900">
                        Q: {viva.question}
                      </div>
                      <div className="text-slate-700 mt-0.5 pl-3 border-l-2 border-indigo-300">
                        {viva.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* 7. Final Checklist */}
        <div className="mt-12 pt-8 border-t-2 border-slate-900 print:break-before-page">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">
              7. Final Submission Checklist
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Verification against all assignment criteria:
          </p>

          <div className="space-y-2.5 text-xs text-slate-800">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span><strong>All 5 separate .cpp programs included:</strong> q1_name_age_category.cpp, q2_even_numbers_sum.cpp, q3_array_and_functions.cpp, q4_student_class.cpp, q5_single_inheritance.cpp</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span><strong>Beginner-friendly C++ code:</strong> Standard I/O, clear descriptive variable names, zero unnecessary complex libraries, beginner comments.</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span><strong>Output sample and runs:</strong> Exact sample outputs verified matching assignment requirements.</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span><strong>Q4 Constructor and Destructor explanations:</strong> What is class, private data member, constructor, parameterized constructor, destructor, when called, and the required 2-3 line summary.</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span><strong>Q5 Inheritance explanation & real-life example:</strong> Single inheritance, base/derived class, public inheritance, function overriding, and the required 2-3 line summary with Vehicle and Car real-life example.</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span><strong>Full student name & internship details:</strong> {student.fullName} ({student.rollNumber}), {student.course} — {student.assignment}.</span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between text-xs text-slate-500 font-mono">
            <span>Verified for Submission</span>
            <span>Signature: __________________________</span>
          </div>
        </div>
      </div>
    </div>
  );
};
