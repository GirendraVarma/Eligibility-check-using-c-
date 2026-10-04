import React, { useState } from "react";
import {
  Copy,
  Check,
  Download,
  Code2,
  BookOpen,
  HelpCircle,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";
import { QuestionData } from "../data/assignmentData";
import { downloadCppFile, copyToClipboard } from "../utils/fileExporter";
import { TerminalSimulator } from "./TerminalSimulator";

interface QuestionDetailViewProps {
  questions: QuestionData[];
  activeQuestionId: string;
  onSelectQuestion: (id: string) => void;
}

export const QuestionDetailView: React.FC<QuestionDetailViewProps> = ({
  questions,
  activeQuestionId,
  onSelectQuestion,
}) => {
  const currentQ = questions.find((q) => q.id === activeQuestionId) || questions[0];

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [activeCodeView, setActiveCodeView] = useState<"code" | "ide-guide">("code");

  const handleCopyCode = async () => {
    const success = await copyToClipboard(currentQ.sourceCode);
    if (success) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyPitch = async () => {
    const success = await copyToClipboard(currentQ.trainerPitch);
    if (success) {
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2000);
    }
  };

  const handleDownloadSingle = () => {
    downloadCppFile(currentQ.fileName, currentQ.sourceCode);
  };

  return (
    <div>
      {/* Question Selector Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl mb-6 overflow-x-auto">
        {questions.map((q) => {
          const isActive = q.id === currentQ.id;
          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(q.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <span
                className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-mono ${
                  isActive ? "bg-indigo-100 text-indigo-700" : "bg-slate-300 text-slate-700"
                }`}
              >
                Q{q.num}
              </span>
              <span>{q.shortTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Main Question Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-semibold text-indigo-600 tracking-wide uppercase mb-1">
              Question {currentQ.num} of 5
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {currentQ.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              {currentQ.fileName}
            </span>
            <button
              onClick={handleDownloadSingle}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
              title="Download this C++ source file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .cpp</span>
            </button>
          </div>
        </div>

        {/* Objective */}
        <div className="pt-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Objective & Problem Statement
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-normal">
            {currentQ.objective}
          </p>
        </div>
      </div>

      {/* Source Code Section */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-md mb-8">
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono font-medium text-slate-300">
              {currentQ.fileName} (Standard C++ Source Code)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => setActiveCodeView("code")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeCodeView === "code"
                    ? "bg-slate-800 text-white font-medium"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeView("ide-guide")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeCodeView === "ide-guide"
                    ? "bg-slate-800 text-white font-medium"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                IDE Setup Guide
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Copy C++ source code to clipboard"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {activeCodeView === "code" ? (
          <div className="p-4 overflow-x-auto bg-slate-950/90 text-xs sm:text-sm font-mono leading-relaxed max-h-[460px] overflow-y-auto">
            <pre className="text-slate-200">
              <code>{currentQ.sourceCode}</code>
            </pre>
          </div>
        ) : (
          <div className="p-5 bg-slate-900 text-xs text-slate-300 space-y-4">
            <div className="font-semibold text-white text-sm">
              How to Compile & Run {currentQ.fileName} in Your Preferred Tool:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="font-semibold text-indigo-400 block mb-1">VS Code (Visual Studio Code)</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  1. Install C/C++ extension by Microsoft.<br />
                  2. Open the file <code>{currentQ.fileName}</code>.<br />
                  3. Press <code>Ctrl + Shift + B</code> or click the play button in the top right, or run in terminal:<br />
                  <code className="text-emerald-400 bg-black/50 px-1 py-0.5 rounded block mt-1">g++ {currentQ.fileName} -o program && ./program</code>
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="font-semibold text-indigo-400 block mb-1">Code::Blocks / Dev-C++</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  1. Go to File &gt; New &gt; Empty File.<br />
                  2. Paste the code and save as <code>{currentQ.fileName}</code>.<br />
                  3. Press <code>F9</code> (Build and Run) in Code::Blocks, or <code>F11</code> (Compile & Run) in Dev-C++.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 md:col-span-2">
                <span className="font-semibold text-emerald-400 block mb-1">OnlineGDB (Browser-based, zero setup)</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  1. Visit onlinegdb.com and choose <strong>Language: C++</strong>.<br />
                  2. Paste this code and click <strong>Run</strong>.<br />
                  3. Type input directly into the console window at the bottom.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Runtime Sandbox */}
      <TerminalSimulator question={currentQ} />

      {/* Code Explanation & Concepts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left: Detailed Explanation (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-base">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Step-by-Step Code Explanation</span>
          </div>

          <p className="text-xs text-slate-600 mb-5 leading-relaxed">
            {currentQ.explanation.summary}
          </p>

          <div className="space-y-4">
            {currentQ.explanation.sections.map((sec, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="text-xs font-bold text-slate-800 mb-1.5">
                  {sec.heading}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>

          {/* Extra Specific Concepts Section for Q4/Q5 */}
          {currentQ.extraSection && (
            <div className="mt-6 pt-5 border-t border-slate-200">
              <div className="text-xs font-bold text-indigo-700 tracking-wide uppercase mb-3">
                {currentQ.extraSection.title}
              </div>
              <div className="space-y-3">
                {currentQ.extraSection.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg text-xs">
                    <span className="font-semibold text-indigo-950 block mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-slate-700 leading-relaxed">
                      {item.explanation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Concepts & Expected Output (1 col) */}
        <div className="space-y-6">
          {/* Sample Output Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3 flex items-center justify-between">
              <span>Expected Sample Output</span>
              <span className="text-[10px] text-slate-400 font-normal">Console run</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">
              {currentQ.sampleOutput}
            </div>
          </div>

          {/* Important Concepts Used */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Important Concepts Used</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              {currentQ.conceptsUsed.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trainer Viva Prep Box */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 border border-indigo-200 rounded-xl p-6 shadow-sm mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-indigo-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-bold text-slate-900">
              Trainer Pitch & Viva Preparation (Q{currentQ.num})
            </span>
          </div>

          <button
            onClick={handleCopyPitch}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-300 rounded-lg transition-colors self-start sm:self-auto"
          >
            {copiedPitch ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Pitch Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy 30-Sec Viva Pitch</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-white border border-indigo-100 rounded-lg mb-6 shadow-2xs">
          <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            How to Explain this Program to your Trainer (30-Second Summary)
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
            "{currentQ.trainerPitch}"
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Key Viva Questions for this Program:</span>
          </div>
          {currentQ.vivaQuestions.map((viva, idx) => (
            <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg text-xs">
              <div className="font-semibold text-slate-900 mb-1 flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                <span>{viva.question}</span>
              </div>
              <p className="text-slate-600 pl-5 leading-relaxed">{viva.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
