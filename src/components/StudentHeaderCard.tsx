import React, { useState } from "react";
import { User, Award, Calendar, Building, Edit3, Check, X } from "lucide-react";
import { StudentInfo } from "../utils/fileExporter";

// Import generated header image
import headerVisual from "../assets/images/cpp_workbench_header_1791142920898.jpg";

interface StudentHeaderCardProps {
  student: StudentInfo;
  onUpdateStudent: (info: StudentInfo) => void;
}

export const StudentHeaderCard: React.FC<StudentHeaderCardProps> = ({
  student,
  onUpdateStudent,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<StudentInfo>(student);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudent(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8">
      {/* Visual Banner */}
      <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden">
        <img
          src={headerVisual}
          alt="C++ & Data Structures workbench"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-70"
          onError={(e) => {
            // Graceful fallback if image path issues
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                Academic Assignment & Practical Submission
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                C++ & Data Structures – Assignment 1
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                5 standalone beginner-friendly C++ programs with complete explanations, sample runs, memory diagrams, and viva preparation.
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 self-start sm:self-end px-3 py-1.5 text-xs font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg transition-colors border border-white/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? "Close Editor" : "Edit Student Info"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Details Bar */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-6 bg-slate-50 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Roll / Student ID</label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Institution</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Course / Internship</label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Assignment</label>
              <input
                type="text"
                value={formData.assignment}
                onChange={(e) => setFormData({ ...formData, assignment: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Submission Date</label>
              <input
                type="text"
                value={formData.submissionDate}
                onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <Check className="w-3.5 h-3.5" />
              Save Student Info
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 sm:p-5 bg-white flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="font-semibold text-slate-900">{student.fullName}</span>
              <span className="text-slate-400 mx-1.5">·</span>
              <span className="font-mono text-slate-600">{student.rollNumber}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{student.institution}</span>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              {student.course} — {student.assignment}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{student.submissionDate}</span>
          </div>
        </div>
      )}
    </div>
  );
};
