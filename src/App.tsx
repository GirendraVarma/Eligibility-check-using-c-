import React, { useState } from "react";
import { assignmentQuestions } from "./data/assignmentData";
import { StudentInfo, downloadAllCppFiles } from "./utils/fileExporter";
import { Header } from "./components/Header";
import { StudentHeaderCard } from "./components/StudentHeaderCard";
import { QuestionDetailView } from "./components/QuestionDetailView";
import { FullAssignmentReportView } from "./components/FullAssignmentReportView";
import { VivaMasteryView } from "./components/VivaMasteryView";
import { ChecklistView } from "./components/ChecklistView";

export default function App() {
  const [activeView, setActiveView] = useState<"workbench" | "report" | "viva" | "checklist">("workbench");
  const [activeQuestionId, setActiveQuestionId] = useState<string>("q1");

  const [student, setStudent] = useState<StudentInfo>({
    fullName: "Riya V.",
    rollNumber: "VTU22921",
    course: "C++ & Data Structures",
    assignment: "Assignment 1",
    institution: "Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College",
    submissionDate: "October 2026",
  });

  const handleSelectQuestion = (id: string) => {
    setActiveQuestionId(id);
    setActiveView("workbench");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* 3-Zone Top Navigation Contract */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onDownloadAll={downloadAllCppFiles}
        onOpenReport={() => setActiveView("report")}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Student Profile & Assignment Banner (hidden when printing report) */}
        <div className="print:hidden">
          <StudentHeaderCard student={student} onUpdateStudent={setStudent} />
        </div>

        {/* View Routing */}
        {activeView === "workbench" && (
          <QuestionDetailView
            questions={assignmentQuestions}
            activeQuestionId={activeQuestionId}
            onSelectQuestion={setActiveQuestionId}
          />
        )}

        {activeView === "report" && (
          <FullAssignmentReportView student={student} />
        )}

        {activeView === "viva" && (
          <VivaMasteryView />
        )}

        {activeView === "checklist" && (
          <ChecklistView
            student={student}
            onOpenReport={() => setActiveView("report")}
            onSelectQuestion={handleSelectQuestion}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="print:hidden border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <span>C++ & Data Structures – Assignment 1</span>
            <span className="mx-2">·</span>
            <span>All 5 Questions (Q1 to Q5) Compiled & Tested</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView("workbench")}
              className="hover:text-slate-900 transition-colors"
            >
              Programs
            </button>
            <button
              onClick={() => setActiveView("report")}
              className="hover:text-slate-900 transition-colors"
            >
              Assignment Document
            </button>
            <button
              onClick={() => setActiveView("viva")}
              className="hover:text-slate-900 transition-colors"
            >
              Viva Prep
            </button>
            <button
              onClick={() => setActiveView("checklist")}
              className="hover:text-slate-900 transition-colors"
            >
              Checklist
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
