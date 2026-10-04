import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Terminal, Cpu, CheckCircle2 } from "lucide-react";
import { QuestionData } from "../data/assignmentData";
import {
  simulateQ1,
  simulateQ2,
  simulateQ3,
  simulateQ4,
  simulateQ5,
  SimulationResult,
} from "../utils/cppSimulator";

interface TerminalSimulatorProps {
  question: QuestionData;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ question }) => {
  // Input states
  const [q1Name, setQ1Name] = useState("Riya");
  const [q1Age, setQ1Age] = useState<number>(21);

  const [q2N, setQ2N] = useState<number>(10);

  const [q3Arr, setQ3Arr] = useState<number[]>([15, 42, 8, 99, 23]);

  const [q4S1, setQ4S1] = useState({
    name: "Aarav Sharma",
    roll: 101,
    m1: 85,
    m2: 90,
    m3: 88,
  });
  const [q4S2, setQ4S2] = useState({
    name: "Pooja Patel",
    roll: 102,
    m1: 92,
    m2: 78,
    m3: 84,
  });

  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [activeTab, setActiveTab] = useState<"terminal" | "tracer">("terminal");
  const [isRunning, setIsRunning] = useState(false);

  // Run simulation
  const runSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      let res: SimulationResult;
      switch (question.id) {
        case "q1":
          res = simulateQ1(q1Name, q1Age);
          break;
        case "q2":
          res = simulateQ2(q2N);
          break;
        case "q3":
          res = simulateQ3(q3Arr);
          break;
        case "q4":
          res = simulateQ4(q4S1, q4S2);
          break;
        case "q5":
        default:
          res = simulateQ5();
          break;
      }
      setSimResult(res);
      setIsRunning(false);
    }, 180);
  };

  // Run automatically when switching question
  useEffect(() => {
    runSimulation();
  }, [question.id]);

  const resetDefaults = () => {
    setQ1Name("Riya");
    setQ1Age(21);
    setQ2N(10);
    setQ3Arr([15, 42, 8, 99, 23]);
    setQ4S1({ name: "Aarav Sharma", roll: 101, m1: 85, m2: 90, m3: 88 });
    setQ4S2({ name: "Pooja Patel", roll: 102, m1: 92, m2: 78, m3: 84 });
    setTimeout(runSimulation, 50);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg text-slate-100 mb-8">
      {/* Top Bar of Sandbox */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive C++ Runtime: {question.fileName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab("terminal")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "terminal"
                  ? "bg-indigo-600 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Console Output
            </button>
            <button
              onClick={() => setActiveTab("tracer")}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === "tracer"
                  ? "bg-indigo-600 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>Logic Tracer</span>
            </button>
          </div>

          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-lg transition-all"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isRunning ? "Executing..." : "Run Program"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls / Input Deck */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="text-slate-400 font-medium mb-2 flex items-center justify-between">
          <span>Simulation Inputs (Simulates cin & object arguments)</span>
          <button
            onClick={resetDefaults}
            className="text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to Sample Inputs
          </button>
        </div>

        {/* Q1 Inputs */}
        {question.id === "q1" && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-slate-400">Name:</label>
              <input
                type="text"
                value={q1Name}
                onChange={(e) => setQ1Name(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-200 w-32 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-slate-400">Age:</label>
              <input
                type="number"
                value={q1Age}
                onChange={(e) => setQ1Age(parseInt(e.target.value) || 0)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-200 w-24 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto text-[11px]">
              <span className="text-slate-400">Presets:</span>
              <button
                onClick={() => {
                  setQ1Name("Riya");
                  setQ1Age(21);
                  setTimeout(runSimulation, 20);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Adult (21)
              </button>
              <button
                onClick={() => {
                  setQ1Name("Karan");
                  setQ1Age(15);
                  setTimeout(runSimulation, 20);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Minor (15)
              </button>
              <button
                onClick={() => {
                  setQ1Name("Mr. Sharma");
                  setQ1Age(68);
                  setTimeout(runSimulation, 20);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Senior (68)
              </button>
            </div>
          </div>
        )}

        {/* Q2 Inputs */}
        {question.id === "q2" && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-slate-400">Target Integer N:</label>
              <input
                type="number"
                min={1}
                max={100}
                value={q2N}
                onChange={(e) => setQ2N(parseInt(e.target.value) || 1)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-200 w-24 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto text-[11px]">
              <span className="text-slate-400">Quick Test N:</span>
              {[6, 10, 15, 20].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setQ2N(val);
                    setTimeout(runSimulation, 20);
                  }}
                  className={`px-2 py-0.5 rounded ${
                    q2N === val
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  N = {val}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q3 Inputs */}
        {question.id === "q3" && (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400">5 Array Elements:</span>
            {q3Arr.map((val, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="text-slate-400 font-mono text-[10px]">[{idx}]</span>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => {
                    const newArr = [...q3Arr];
                    newArr[idx] = parseInt(e.target.value) || 0;
                    setQ3Arr(newArr);
                  }}
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 w-16 text-center focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            ))}
            <button
              onClick={() => {
                setQ3Arr([15, 42, 8, 99, 23]);
                setTimeout(runSimulation, 20);
              }}
              className="ml-auto px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
            >
              Reset to [15, 42, 8, 99, 23]
            </button>
          </div>
        )}

        {/* Q4 Inputs */}
        {question.id === "q4" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-2.5 bg-slate-950/60 rounded border border-slate-800 space-y-2">
              <span className="font-semibold text-indigo-400 block">Student 1 (s1)</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={q4S1.name}
                  onChange={(e) => setQ4S1({ ...q4S1, name: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
                <input
                  type="number"
                  placeholder="Roll No"
                  value={q4S1.roll}
                  onChange={(e) => setQ4S1({ ...q4S1, roll: parseInt(e.target.value) || 0 })}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[11px]">Marks:</span>
                {[1, 2, 3].map((mIdx) => (
                  <input
                    key={mIdx}
                    type="number"
                    value={q4S1[`m${mIdx}` as "m1" | "m2" | "m3"]}
                    onChange={(e) =>
                      setQ4S1({
                        ...q4S1,
                        [`m${mIdx}`]: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-slate-200 w-14 text-center"
                  />
                ))}
              </div>
            </div>

            <div className="p-2.5 bg-slate-950/60 rounded border border-slate-800 space-y-2">
              <span className="font-semibold text-emerald-400 block">Student 2 (s2)</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={q4S2.name}
                  onChange={(e) => setQ4S2({ ...q4S2, name: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
                <input
                  type="number"
                  placeholder="Roll No"
                  value={q4S2.roll}
                  onChange={(e) => setQ4S2({ ...q4S2, roll: parseInt(e.target.value) || 0 })}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[11px]">Marks:</span>
                {[1, 2, 3].map((mIdx) => (
                  <input
                    key={mIdx}
                    type="number"
                    value={q4S2[`m${mIdx}` as "m1" | "m2" | "m3"]}
                    onChange={(e) =>
                      setQ4S2({
                        ...q4S2,
                        [`m${mIdx}`]: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-slate-200 w-14 text-center"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Q5 Inputs */}
        {question.id === "q5" && (
          <div className="flex items-center justify-between text-slate-300">
            <span>
              Single Inheritance: Derived class <code>Car</code> inherits base class{" "}
              <code>Vehicle</code> and overrides <code>displayInfo()</code>.
            </span>
            <span className="text-indigo-400 font-mono text-xs">Vehicle (Base) ➔ Car (Derived)</span>
          </div>
        )}
      </div>

      {/* Terminal Output Display */}
      {activeTab === "terminal" ? (
        <div className="p-4 font-mono text-xs sm:text-sm bg-black/95 min-h-[220px] max-h-[380px] overflow-y-auto leading-relaxed select-text">
          <div className="text-slate-500 mb-2 text-[11px]">
            $ g++ {question.fileName} -o program && ./program
          </div>
          <pre className="text-emerald-400 whitespace-pre-wrap font-mono">
            {simResult ? simResult.output : "Executing..."}
          </pre>
          <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Process exited with return code: {simResult?.exitCode ?? 0}
            </span>
            <span>Execution time: ~0.004s (ISO C++20 compliant)</span>
          </div>
        </div>
      ) : (
        /* Logic & Execution Step Tracer */
        <div className="p-5 bg-slate-950 min-h-[220px] max-h-[380px] overflow-y-auto space-y-3">
          <div className="text-xs font-semibold text-slate-400 mb-2">
            Execution Flow & Memory State Transitions:
          </div>
          {simResult?.steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border text-xs ${
                step.status === "warn"
                  ? "bg-amber-950/20 border-amber-800/40 text-amber-200"
                  : step.status === "success"
                  ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-200"
                  : "bg-slate-900 border-slate-800 text-slate-300"
              }`}
            >
              <div className="font-semibold font-mono flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span>{step.title}</span>
              </div>
              <pre className="font-mono text-[11px] whitespace-pre-wrap opacity-90 pl-3">
                {step.detail}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
