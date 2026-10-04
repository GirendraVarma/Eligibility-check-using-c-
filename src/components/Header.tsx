import React from "react";
import { Download, FileText } from "lucide-react";

interface HeaderProps {
  activeView: "workbench" | "report" | "viva" | "checklist";
  setActiveView: (view: "workbench" | "report" | "viva" | "checklist") => void;
  onDownloadAll: () => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onDownloadAll,
  onOpenReport,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveView("workbench")}
          className="text-left font-bold tracking-tight text-slate-900 text-lg hover:text-indigo-600 transition-colors whitespace-nowrap"
        >
          C++ & Data Structures
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveView("workbench")}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap ${
              activeView === "workbench"
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1"
                : ""
            }`}
          >
            Programs (Q1–Q5)
          </button>
          <button
            onClick={() => setActiveView("report")}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap ${
              activeView === "report"
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1"
                : ""
            }`}
          >
            Assignment Document
          </button>
          <button
            onClick={() => setActiveView("viva")}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap ${
              activeView === "viva"
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1"
                : ""
            }`}
          >
            Viva Prep
          </button>
          <button
            onClick={() => setActiveView("checklist")}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap ${
              activeView === "checklist"
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1"
                : ""
            }`}
          >
            Checklist
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReport}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            title="View complete printable assignment document"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Full Document</span>
          </button>

          <button
            onClick={onDownloadAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-indigo-600 rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap"
            title="Download all 5 separate .cpp files"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All .cpp</span>
          </button>
        </div>
      </div>
    </header>
  );
};
