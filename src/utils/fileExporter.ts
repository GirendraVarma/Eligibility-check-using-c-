import { assignmentQuestions } from "../data/assignmentData";

export interface StudentInfo {
  fullName: string;
  rollNumber: string;
  course: string;
  assignment: string;
  institution: string;
  submissionDate: string;
}

export function downloadCppFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function downloadAllCppFiles() {
  assignmentQuestions.forEach((q, index) => {
    setTimeout(() => {
      downloadCppFile(q.fileName, q.sourceCode);
    }, index * 200);
  });
}

export function generateAssignmentMarkdown(student: StudentInfo): string {
  let md = `# C++ & DATA STRUCTURES - ASSIGNMENT 1
=============================================================

## 1. COVER & STUDENT DETAILS
- **Full Name**         : ${student.fullName}
- **Roll Number**       : ${student.rollNumber}
- **Institution**       : ${student.institution}
- **Course/Internship** : ${student.course}
- **Assignment**        : ${student.assignment}
- **Submission Date**   : ${student.submissionDate}

=============================================================
`;

  assignmentQuestions.forEach((q) => {
    md += `\n\n# ${q.title}
-------------------------------------------------------------

### 1. Objective
${q.objective}

### 2. Complete C++ Source Code (${q.fileName})
\`\`\`cpp
${q.sourceCode}
\`\`\`

### 3. Explanation of the Code
${q.explanation.summary}

${q.explanation.sections
  .map((sec) => `#### ${sec.heading}\n${sec.content}`)
  .join("\n\n")}

### 4. Sample / Expected Output
\`\`\`text
${q.sampleOutput}
\`\`\`

### 5. Important Concepts Used
${q.conceptsUsed.map((c) => `- ${c}`).join("\n")}
`;

    if (q.extraSection) {
      md += `\n### ${q.extraSection.title}\n`;
      q.extraSection.items.forEach((item) => {
        md += `**${item.label}**:\n${item.explanation}\n\n`;
      });
    }

    md += `\n### 6. Viva / Interview Questions & Trainer Explanation\n`;
    md += `**Trainer Quick Summary (How to explain to trainer):**\n> "${q.trainerPitch}"\n\n`;
    q.vivaQuestions.forEach((viva, idx) => {
      md += `**Q${idx + 1}: ${viva.question}**\n**A:** ${viva.answer}\n\n`;
    });
  });

  md += `\n\n=============================================================
# 7. FINAL SUBMISSION CHECKLIST
- [x] All 5 separate .cpp programs implemented and verified
- [x] Clear variable names and beginner-friendly C++ code
- [x] Output screenshot / sample terminal run for each program included
- [x] Q4 constructor and destructor detailed explanations included
- [x] Q5 inheritance explanation and real-life example included
- [x] Full student name and course details included
=============================================================
`;

  return md;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return Promise.resolve(true);
    } catch {
      document.body.removeChild(textArea);
      return Promise.resolve(false);
    }
  }
}
