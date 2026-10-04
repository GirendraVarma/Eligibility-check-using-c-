export interface SimulationResult {
  output: string;
  steps: { title: string; detail: string; status?: "info" | "success" | "warn" }[];
  exitCode: number;
}

export function simulateQ1(name: string, age: number): SimulationResult {
  const steps: SimulationResult["steps"] = [];
  const cleanName = name.trim() || "User";
  const numAge = Number.isInteger(age) ? age : Math.floor(age);

  steps.push({
    title: "1. Input Stream Extraction (cin)",
    detail: `cin >> name (Extracted: "${cleanName}")\ncin >> age (Extracted: ${numAge})`,
    status: "info",
  });

  let category = "";
  if (numAge < 18) {
    category = "Minor";
    steps.push({
      title: "2. Evaluated if (age < 18)",
      detail: `${numAge} < 18 is TRUE -> Assigned category = "Minor"`,
      status: "success",
    });
  } else if (numAge >= 18 && numAge <= 59) {
    category = "Adult";
    steps.push({
      title: "2. Evaluated if (age < 18)",
      detail: `${numAge} < 18 is FALSE -> Proceeded to next condition in ladder`,
      status: "info",
    });
    steps.push({
      title: "3. Evaluated else if (age >= 18 && age <= 59)",
      detail: `(${numAge} >= 18 && ${numAge} <= 59) is TRUE -> Assigned category = "Adult"`,
      status: "success",
    });
  } else {
    category = "Senior Citizen";
    steps.push({
      title: "2. Evaluated if (age < 18)",
      detail: `${numAge} < 18 is FALSE -> Continued down ladder`,
      status: "info",
    });
    steps.push({
      title: "3. Evaluated else if (age >= 18 && age <= 59)",
      detail: `(${numAge} >= 18 && ${numAge} <= 59) is FALSE -> Fell through to else`,
      status: "info",
    });
    steps.push({
      title: "4. Executed final else branch",
      detail: `Condition (age >= 60) satisfied -> Assigned category = "Senior Citizen"`,
      status: "success",
    });
  }

  const output = `Enter your name: ${cleanName}
Enter your age: ${numAge}

Welcome, ${cleanName}!
Category: ${category}
`;

  return { output, steps, exitCode: 0 };
}

export function simulateQ2(n: number): SimulationResult {
  const steps: SimulationResult["steps"] = [];

  if (n <= 0) {
    steps.push({
      title: "1. Boundary Validation (n <= 0)",
      detail: `n = ${n} is not a positive integer. Execution aborted with code 1.`,
      status: "warn",
    });
    return {
      output: `Enter N: ${n}\nPlease enter a positive integer greater than 0.\n`,
      steps,
      exitCode: 1,
    };
  }

  steps.push({
    title: "1. Loop Initialization",
    detail: `Input N = ${n}. for loop initialized with int i = 1; loop condition: i <= ${n}; increment: i++`,
    status: "info",
  });

  const evens: number[] = [];
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      evens.push(i);
      sum += i;
    }
  }

  steps.push({
    title: "2. Modulo Filter & Accumulation",
    detail: `Tested ${n} iterations.\nEven numbers detected (i % 2 == 0): ${evens.join(", ") || "None"}\nAccumulator total: sum = ${sum}`,
    status: "success",
  });

  const output = `Enter N: ${n}
Even numbers: ${evens.join(" ")}
Sum of even numbers: ${sum}
`;

  return { output, steps, exitCode: 0 };
}

export function simulateQ3(elements: number[]): SimulationResult {
  const steps: SimulationResult["steps"] = [];
  const n = elements.length;

  steps.push({
    title: "1. Array Allocation & Input",
    detail: `Stored ${n} integers in contiguous array: [${elements.join(", ")}]`,
    status: "info",
  });

  // findMax
  let maxVal = elements[0];
  for (let i = 1; i < n; i++) {
    if (elements[i] > maxVal) {
      maxVal = elements[i];
    }
  }
  steps.push({
    title: "2. Function findMax(numbers, 5)",
    detail: `Initialized maxVal = arr[0] (${elements[0]}). Found maximum: ${maxVal}`,
    status: "success",
  });

  // findMin
  let minVal = elements[0];
  for (let i = 1; i < n; i++) {
    if (elements[i] < minVal) {
      minVal = elements[i];
    }
  }
  steps.push({
    title: "3. Function findMin(numbers, 5)",
    detail: `Initialized minVal = arr[0] (${elements[0]}). Found minimum: ${minVal}`,
    status: "success",
  });

  // findAverage
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += elements[i];
  }
  const avg = (total / n).toFixed(4).replace(/\.?0+$/, "");
  steps.push({
    title: "4. Function findAverage(numbers, 5)",
    detail: `Total sum = ${total}. Evaluated (float)total / n = ${total} / ${n} = ${avg}`,
    status: "success",
  });

  let output = `Enter 5 integers:\n`;
  elements.forEach((val, idx) => {
    output += `Enter element ${idx + 1}: ${val}\n`;
  });
  output += `\n--- Results ---\n`;
  output += `Maximum: ${maxVal}\n`;
  output += `Minimum: ${minVal}\n`;
  output += `Average: ${avg}\n`;

  return { output, steps, exitCode: 0 };
}

export function simulateQ4(
  s1: { name: string; roll: number; m1: number; m2: number; m3: number },
  s2: { name: string; roll: number; m1: number; m2: number; m3: number }
): SimulationResult {
  const steps: SimulationResult["steps"] = [];

  const avg1 = ((s1.m1 + s1.m2 + s1.m3) / 3).toFixed(4);
  const avg2 = ((s2.m1 + s2.m2 + s2.m3) / 3).toFixed(4);

  steps.push({
    title: "1. Parameterized Constructor s1",
    detail: `Allocated s1 on stack. Initialized: rollNo=${s1.roll}, name="${s1.name}", marks=[${s1.m1}, ${s1.m2}, ${s1.m3}]`,
    status: "info",
  });

  steps.push({
    title: "2. Parameterized Constructor s2",
    detail: `Allocated s2 on stack. Initialized: rollNo=${s2.roll}, name="${s2.name}", marks=[${s2.m1}, ${s2.m2}, ${s2.m3}]`,
    status: "info",
  });

  steps.push({
    title: "3. Member Functions Invoked",
    detail: `s1.display() computed average ${avg1}\ns2.display() computed average ${avg2}`,
    status: "success",
  });

  steps.push({
    title: "4. Scope Exit & LIFO Destruction",
    detail: `main() function exits. Stack unwinding destroys objects in reverse order of creation: s2 (Roll ${s2.roll}) destroyed first, followed by s1 (Roll ${s1.roll}).`,
    status: "warn",
  });

  const output = `=== Creating Student 1 ===
[Constructor] Object created for Roll No: ${s1.roll} (${s1.name})

=== Creating Student 2 ===
[Constructor] Object created for Roll No: ${s2.roll} (${s2.name})

=== Displaying Student Details ===
----------------------------------------
Student Name : ${s1.name}
Roll Number  : ${s1.roll}
Marks 1      : ${s1.m1}
Marks 2      : ${s1.m2}
Marks 3      : ${s1.m3}
Average      : ${avg1}
----------------------------------------

----------------------------------------
Student Name : ${s2.name}
Roll Number  : ${s2.roll}
Marks 1      : ${s2.m1}
Marks 2      : ${s2.m2}
Marks 3      : ${s2.m3}
Average      : ${avg2}
----------------------------------------

=== Exiting main() scope (Destructors will be triggered) ===
Object for roll number ${s2.roll} destroyed
Object for roll number ${s1.roll} destroyed
`;

  return { output, steps, exitCode: 0 };
}

export function simulateQ5(): SimulationResult {
  const steps: SimulationResult["steps"] = [];

  steps.push({
    title: "1. Class Hierarchy Established",
    detail: `Base Class: Vehicle\nDerived Class: Car (publicly inherits Vehicle)\nInheritance Type: Single Inheritance`,
    status: "info",
  });

  steps.push({
    title: "2. Car Object Instantiation & Method Override",
    detail: `myCar.displayInfo() invoked -> Executes Car's overridden displayInfo() method: "This is a car with 4 wheels and a steering wheel."`,
    status: "success",
  });

  steps.push({
    title: "3. Vehicle Object Instantiation & Direct Call",
    detail: `myVehicle.displayInfo() invoked -> Executes base class Vehicle's method: "This is a vehicle."`,
    status: "info",
  });

  const output = `=== Demonstrating Single Inheritance in C++ ===

Calling displayInfo() using Car object:
This is a car with 4 wheels and a steering wheel.

Calling displayInfo() using Vehicle object:
This is a vehicle.
`;

  return { output, steps, exitCode: 0 };
}
