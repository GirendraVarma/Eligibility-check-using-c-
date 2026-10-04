import React, { useState } from "react";
import { Sparkles, HelpCircle, Copy, Check, MessageSquare, BookOpen } from "lucide-react";
import { assignmentQuestions } from "../data/assignmentData";
import { copyToClipboard } from "../utils/fileExporter";

export const VivaMasteryView: React.FC = () => {
  const [selectedQ, setSelectedQ] = useState<string>("all");
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedIdx(id);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  const filteredQuestions =
    selectedQ === "all"
      ? assignmentQuestions
      : assignmentQuestions.filter((q) => q.id === selectedQ);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              Oral Exam & Trainer Review Preparation
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Viva & Technical Interview Guide
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Master the exact 30-second pitches and answers your trainer will expect during the lab viva.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto overflow-x-auto">
            <button
              onClick={() => setSelectedQ("all")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedQ === "all"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Questions
            </button>
            {assignmentQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => setSelectedQ(q.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedQ === q.id
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Q{q.num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content grouped by Question */}
      <div className="space-y-8">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center font-mono">
                  Q{q.num}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{q.title}</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{q.fileName}</span>
            </div>

            {/* 30-Sec Pitch Card */}
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>30-Second Explanation to Trainer:</span>
                </div>
                <button
                  onClick={() => handleCopy(q.trainerPitch, `pitch-${q.id}`)}
                  className="text-indigo-600 hover:text-indigo-800 text-xs font-medium inline-flex items-center gap-1"
                >
                  {copiedIdx === `pitch-${q.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Pitch</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                "{q.trainerPitch}"
              </p>
            </div>

            {/* Viva Questions */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Common Trainer Questions & Answers
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.vivaQuestions.map((viva, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-900 mb-1.5 flex items-start gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                        <span>{viva.question}</span>
                      </div>
                      <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                        {viva.answer}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex justify-end">
                      <button
                        onClick={() =>
                          handleCopy(
                            `Q: ${viva.question}\nA: ${viva.answer}`,
                            `qa-${q.id}-${idx}`
                          )
                        }
                        className="text-[11px] text-slate-400 hover:text-slate-700 inline-flex items-center gap-1"
                      >
                        {copiedIdx === `qa-${q.id}-${idx}` ? (
                          <span className="text-emerald-600 font-medium">Copied Q&A</span>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Q&A</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
