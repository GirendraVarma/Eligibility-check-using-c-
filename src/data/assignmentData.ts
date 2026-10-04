export interface VivaItem {
  question: string;
  answer: string;
  tip?: string;
}

export interface QuestionData {
  id: string;
  num: number;
  title: string;
  shortTitle: string;
  fileName: string;
  objective: string;
  sourceCode: string;
  explanation: {
    summary: string;
    sections: { heading: string; content: string }[];
  };
  sampleOutput: string;
  conceptsUsed: string[];
  trainerPitch: string;
  vivaQuestions: VivaItem[];
  extraSection?: {
    title: string;
    items: { label: string; explanation: string }[];
  };
  simulatedInputsDefault: Record<string, string | number | number[]>;
}

export const assignmentQuestions: QuestionData[] = [
  {
    id: "q1",
    num: 1,
    title: "Q1 – Name, Age and Category",
    shortTitle: "Name, Age & Category",
    fileName: "q1_name_age_category.cpp",
    objective:
      "Create a C++ program that asks the user to enter their Name and Age using cin. Use an if-else-if ladder to classify the person into one of three categories: Below 18 (Minor), 18 to 59 (Adult), or 60 and above (Senior Citizen). Finally, print a personalized welcome message containing the user's name and their category using cout.",
    sourceCode: `/*
 * Course / Internship : C++ & Data Structures
 * Assignment          : Assignment 1
 * Question            : Q1 - Name, Age and Category
 * Description         : Asks user for name and age, classifies person using an
 *                       if-else-if ladder, and displays a welcome message.
 */

#include <iostream>
#include <string>

using namespace std;

int main() {
    // Variable declaration
    string name;
    int age;
    string category;

    // Taking user input
    cout << "Enter your name: ";
    cin >> name;

    cout << "Enter your age: ";
    cin >> age;

    // if-else-if ladder to determine category based on age
    if (age < 18) {
        category = "Minor";
    }
    else if (age >= 18 && age <= 59) {
        category = "Adult";
    }
    else {
        // Age is 60 and above
        category = "Senior Citizen";
    }

    // Displaying the final result
    cout << "\\nWelcome, " << name << "!" << endl;
    cout << "Category: " << category << endl;

    return 0;
}`,
    explanation: {
      summary:
        "This program demonstrates basic input/output operations in C++ using cin and cout, variable declaration, and multi-way conditional branching using an if-else-if ladder.",
      sections: [
        {
          heading: "1. Header Files and Namespace",
          content:
            "#include <iostream> provides standard input/output streams (cin, cout). #include <string> allows using the C++ string class to store textual names. using namespace std; makes standard library identifiers accessible without prefixing std::.",
        },
        {
          heading: "2. Variable Declarations",
          content:
            "string name stores the user's name, int age holds their integer age, and string category stores the determined classification.",
        },
        {
          heading: "3. Input and Output Operations",
          content:
            "cout << prints prompt messages to the console screen. cin >> reads values typed by the user from the keyboard into the respective variables.",
        },
        {
          heading: "4. How the if-else-if Ladder Works",
          content:
            "The program evaluates conditions sequentially from top to bottom:\n• Condition 1 (age < 18): If true, category is assigned 'Minor', and the rest of the ladder is skipped.\n• Condition 2 (age >= 18 && age <= 59): Evaluated only if the first condition is false. The logical AND (&&) operator checks that age is both at least 18 and at most 59. If true, category is assigned 'Adult'.\n• Default else: If both previous tests fail, it means age is 60 or greater, assigning 'Senior Citizen'. Only one branch ever executes.",
        },
      ],
    },
    sampleOutput: `Enter your name: Riya
Enter your age: 21

Welcome, Riya!
Category: Adult`,
    conceptsUsed: [
      "Stream Input & Output (cin, cout)",
      "Primitive Data Types (int, string)",
      "Decision Making with if-else-if Ladder",
      "Relational & Logical Operators (<, >=, <=, &&)",
      "Standard Namespace (std)",
    ],
    trainerPitch:
      "Sir/Ma'am, in Q1 I wrote a beginner-friendly C++ program that reads the user's name and age using cin. I used an if-else-if ladder to test the age sequentially: under 18 is classified as Minor, between 18 and 59 as Adult using the logical AND operator, and 60 or above defaults to Senior Citizen. The program then prints a customized greeting with the person's name and category using cout.",
    vivaQuestions: [
      {
        question: "What is an if-else-if ladder and how does it execute?",
        answer:
          "An if-else-if ladder is a multi-way decision-making structure in C++. It tests conditions sequentially from top to bottom. As soon as one condition evaluates to true, its statement block executes and all remaining conditions in the ladder are skipped. If none are true, the final else block executes.",
      },
      {
        question: "What does the logical AND (&&) operator do in C++?",
        answer:
          "The && operator evaluates to true only if both operands/conditions on its left and right sides are true. For example, (age >= 18 && age <= 59) ensures the age lies strictly in the inclusive range from 18 to 59.",
      },
      {
        question: "What is the difference between cin >> name and getline(cin, name)?",
        answer:
          "cin >> reads a single word until it encounters whitespace (space, tab, or newline). getline(cin, name) reads the entire line of text including spaces until the Enter key is pressed.",
      },
      {
        question: "Why do we return 0 from the main function in C++?",
        answer:
          "Returning 0 from main() indicates to the operating system that the program executed successfully without any runtime errors.",
      },
    ],
    simulatedInputsDefault: {
      name: "Riya",
      age: 21,
    },
  },
  {
    id: "q2",
    num: 2,
    title: "Q2 – Even Numbers and Sum",
    shortTitle: "Even Numbers & Sum",
    fileName: "q2_even_numbers_sum.cpp",
    objective:
      "Create a C++ program that takes a positive integer N from the user, uses a for loop to iterate from 1 to N, prints all even numbers within that range, and calculates and prints the total sum of those even numbers.",
    sourceCode: `/*
 * Course / Internship : C++ & Data Structures
 * Assignment          : Assignment 1
 * Question            : Q2 - Even Numbers and Sum
 * Description         : Takes a positive integer N, prints all even numbers
 *                       from 1 to N using a for loop, and prints their total sum.
 */

#include <iostream>

using namespace std;

int main() {
    int n;
    int sum = 0;

    // Prompt user for input
    cout << "Enter N: ";
    cin >> n;

    // Check for positive integer
    if (n <= 0) {
        cout << "Please enter a positive integer greater than 0." << endl;
        return 1;
    }

    // Printing even numbers from 1 to N
    cout << "Even numbers: ";
    for (int i = 1; i <= n; i++) {
        // Check if current number is divisible by 2
        if (i % 2 == 0) {
            cout << i << " ";
            sum += i; // Add to running sum
        }
    }
    cout << endl;

    // Printing total sum of even numbers
    cout << "Sum of even numbers: " << sum << endl;

    return 0;
}`,
    explanation: {
      summary:
        "This program demonstrates the use of a for loop, arithmetic operations (the modulus operator %), and accumulator variables to filter and sum numbers.",
      sections: [
        {
          heading: "1. The for Loop Structure",
          content:
            "A for loop contains three essential expressions: initialization (int i = 1), condition test (i <= n), and increment (i++). It repeats the loop body for every value of i starting from 1 up to and including N.",
        },
        {
          heading: "2. Even Number Condition (i % 2 == 0)",
          content:
            "The modulo operator (%) calculates the remainder of integer division. When any integer is divided by 2, a remainder of 0 strictly means the number is even. Thus, if (i % 2 == 0) reliably identifies even numbers.",
        },
        {
          heading: "3. Sum Calculation (sum += i)",
          content:
            "The variable sum is initialized to 0. Whenever an even number i is encountered, sum += i (equivalent to sum = sum + i) adds that even number to the running total.",
        },
      ],
    },
    sampleOutput: `Enter N: 10
Even numbers: 2 4 6 8 10
Sum of even numbers: 30`,
    conceptsUsed: [
      "Iteration with for Loops",
      "Modulus Operator (%) for Divisibility",
      "Accumulator Pattern for Summation (sum += i)",
      "Input Boundary Validation (n <= 0)",
      "Standard Output Formatting",
    ],
    trainerPitch:
      "Sir/Ma'am, in Q2 I wrote a program that reads a positive integer N. It executes a for loop from 1 to N, tests each number with the modulus condition i % 2 == 0 to check if it divides cleanly by 2, prints each even number on a single line, and adds it to an accumulator variable sum. Finally, it displays the total sum of even numbers.",
    vivaQuestions: [
      {
        question: "How does the for loop work step-by-step in C++?",
        answer:
          "1. Initialization runs once at the beginning (int i = 1). 2. The loop condition is checked (i <= n). If true, the loop body executes; if false, loop terminates. 3. After the body runs, the update step executes (i++). 4. The condition is tested again, repeating until false.",
      },
      {
        question: "What is the modulo operator (%) and what does i % 2 == 0 mean?",
        answer:
          "The modulo operator returns the remainder after integer division. If i % 2 evaluates to 0, there is zero remainder when dividing by 2, meaning the integer is an even number.",
      },
      {
        question: "Can we write this loop without the if (i % 2 == 0) condition?",
        answer:
          "Yes! We can start the loop directly at 2 and increment by 2 in each iteration: for (int i = 2; i <= n; i += 2) { cout << i << ' '; sum += i; }. This cuts the number of loop iterations in half.",
      },
      {
        question: "Why must sum be initialized to 0 before the loop?",
        answer:
          "In C++, local variables contain undefined garbage values unless explicitly initialized. Initializing sum = 0 guarantees our accumulator starts from zero.",
      },
    ],
    simulatedInputsDefault: {
      n: 10,
    },
  },
  {
    id: "q3",
    num: 3,
    title: "Q3 – Array and Functions",
    shortTitle: "Array & Functions",
    fileName: "q3_array_and_functions.cpp",
    objective:
      "Create a C++ program that takes 5 integers from the user into an array and calls three distinct functions: findMax(int arr[], int n) to return the largest number, findMin(int arr[], int n) to return the smallest number, and findAverage(int arr[], int n) to return the average as a float. Display all three computed results from main().",
    sourceCode: `/*
 * Course / Internship : C++ & Data Structures
 * Assignment          : Assignment 1
 * Question            : Q3 - Array and Functions
 * Description         : Reads 5 integers into an array, computes maximum, minimum,
 *                       and average using findMax, findMin, and findAverage functions.
 */

#include <iostream>

using namespace std;

// Function to find and return the largest number in the array
int findMax(int arr[], int n) {
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}

// Function to find and return the smallest number in the array
int findMin(int arr[], int n) {
    int minVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < minVal) {
            minVal = arr[i];
        }
    }
    return minVal;
}

// Function to calculate and return the average as a float
float findAverage(int arr[], int n) {
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += arr[i];
    }
    // Typecast to float so fractional decimals are preserved
    return (float)total / n;
}

int main() {
    const int SIZE = 5;
    int numbers[SIZE];

    // Taking 5 integers from the user
    cout << "Enter 5 integers:" << endl;
    for (int i = 0; i < SIZE; i++) {
        cout << "Enter element " << (i + 1) << ": ";
        cin >> numbers[i];
    }

    // Calling the functions
    int maximum = findMax(numbers, SIZE);
    int minimum = findMin(numbers, SIZE);
    float average = findAverage(numbers, SIZE);

    // Displaying the results
    cout << "\\n--- Results ---" << endl;
    cout << "Maximum: " << maximum << endl;
    cout << "Minimum: " << minimum << endl;
    cout << "Average: " << average << endl;

    return 0;
}`,
    explanation: {
      summary:
        "This program demonstrates the core concepts of arrays, modular function decomposition, passing arrays as parameters, return values, and explicit floating-point typecasting.",
      sections: [
        {
          heading: "1. What is an Array?",
          content:
            "An array is a collection of elements of the same data type stored in contiguous memory locations. The elements are accessed using zero-based indexing (0 to SIZE - 1).",
        },
        {
          heading: "2. Functions and Modularity",
          content:
            "Instead of writing all logic in main(), we divide the tasks into reusable functions: findMax, findMin, and findAverage. Each function takes the array int arr[] and its size int n as parameters and returns a single computed result.",
        },
        {
          heading: "3. Function Parameters and Passing Arrays",
          content:
            "When an array is passed to a function in C++ (int arr[]), it decays into a pointer pointing to the first element (arr[0]). Passing the size n tells the function how many elements to safely process.",
        },
        {
          heading: "4. Return Values and Floating-Point Average",
          content:
            "findMax and findMin return an int. findAverage returns a float because dividing an integer sum by integer count would otherwise perform integer division (truncating decimals). Explicit typecasting (float)total / n ensures precise decimal accuracy.",
        },
      ],
    },
    sampleOutput: `Enter 5 integers:
Enter element 1: 15
Enter element 2: 42
Enter element 3: 8
Enter element 4: 99
Enter element 5: 23

--- Results ---
Maximum: 99
Minimum: 8
Average: 37.4`,
    conceptsUsed: [
      "1D Arrays & Contiguous Memory",
      "Zero-based Indexing (arr[0] to arr[n-1])",
      "Modular Function Design",
      "Passing Arrays to Functions (int arr[], int n)",
      "Explicit Typecasting ((float)total / n)",
      "Linear Search for Extremes (Min & Max)",
    ],
    trainerPitch:
      "Sir/Ma'am, in Q3 I organized the program into three modular functions: findMax, findMin, and findAverage. In main(), I accept 5 integers into an array and pass the array and its size to each function. findMax and findMin iterate through the array to find the extremes, while findAverage sums the elements and typecasts the sum to float to preserve fractional averages.",
    vivaQuestions: [
      {
        question: "How are arrays passed to functions in C++?",
        answer:
          "In C++, an array name decays to a pointer to its first element when passed as a function argument. Thus, arrays are effectively passed by address/reference, allowing functions to access the original elements without copying the entire array.",
      },
      {
        question: "Why is float used as the return type for findAverage?",
        answer:
          "Because the average of integers often contains fractional decimal digits (e.g., 23 / 5 = 4.6). If we used int, C++ would perform integer division and truncate 4.6 to 4, losing precision.",
      },
      {
        question: "Why do we initialize maxVal with arr[0] instead of 0?",
        answer:
          "If the array contains only negative numbers (e.g., -10, -5, -20), initializing maxVal = 0 would return 0 as the maximum, which is incorrect because 0 was not even in the array. Starting with arr[0] guarantees correctness for all numbers.",
      },
      {
        question: "What is the difference between a formal parameter and an actual parameter?",
        answer:
          "Actual parameters are the real values or variables passed in the function call in main() (e.g., findMax(numbers, SIZE)). Formal parameters are the variables defined in the function signature that receive those values (e.g., int arr[], int n).",
      },
    ],
    simulatedInputsDefault: {
      elements: [15, 42, 8, 99, 23],
    },
  },
  {
    id: "q4",
    num: 4,
    title: "Q4 – Student Class, Constructor and Destructor",
    shortTitle: "Student Class & Lifecycle",
    fileName: "q4_student_class.cpp",
    objective:
      "Create a class named Student with private data members (name, rollNo, marks1, marks2, marks3), a parameterized constructor Student(string n, int r, int m1, int m2, int m3) to initialize all members, calculateAverage() returning the float average, display() showing all student details, and a destructor ~Student() printing 'Object for roll number X destroyed'. Instantiate 2 student objects in main().",
    sourceCode: `/*
 * Course / Internship : C++ & Data Structures
 * Assignment          : Assignment 1
 * Question            : Q4 - Student Class, Constructor and Destructor
 * Description         : Implements a Student class with private members,
 *                       a parameterized constructor, calculateAverage(),
 *                       display(), and a destructor printing roll number.
 */

#include <iostream>
#include <string>

using namespace std;

class Student {
    // Private data members (accessible only within the class)
private:
    string name;
    int rollNo;
    int marks1;
    int marks2;
    int marks3;

public:
    // Parameterized Constructor to initialize all 5 data members
    Student(string n, int r, int m1, int m2, int m3) {
        name = n;
        rollNo = r;
        marks1 = m1;
        marks2 = m2;
        marks3 = m3;
        cout << "[Constructor] Object created for Roll No: " << rollNo << " (" << name << ")" << endl;
    }

    // Member function to calculate and return average marks
    float calculateAverage() {
        int total = marks1 + marks2 + marks3;
        return (float)total / 3.0f;
    }

    // Member function to display student details
    void display() {
        cout << "\\n----------------------------------------" << endl;
        cout << "Student Name : " << name << endl;
        cout << "Roll Number  : " << rollNo << endl;
        cout << "Marks 1      : " << marks1 << endl;
        cout << "Marks 2      : " << marks2 << endl;
        cout << "Marks 3      : " << marks3 << endl;
        cout << "Average      : " << calculateAverage() << endl;
        cout << "----------------------------------------" << endl;
    }

    // Destructor called automatically when object goes out of scope
    ~Student() {
        cout << "Object for roll number " << rollNo << " destroyed" << endl;
    }
};

int main() {
    cout << "=== Creating Student 1 ===" << endl;
    Student s1("Aarav Sharma", 101, 85, 90, 88);

    cout << "\\n=== Creating Student 2 ===" << endl;
    Student s2("Pooja Patel", 102, 92, 78, 84);

    cout << "\\n=== Displaying Student Details ===";
    s1.display();
    s2.display();

    cout << "\\n=== Exiting main() scope (Destructors will be triggered) ===" << endl;
    return 0;
}`,
    explanation: {
      summary:
        "This program demonstrates the core principles of Object-Oriented Programming (OOP): class design, encapsulation with private data members, parameterized constructors for safe initialization, member functions, and automatic cleanup using destructors.",
      sections: [
        {
          heading: "1. What is a Class?",
          content:
            "A class is a user-defined blueprint or template that groups data members (attributes) and member functions (behaviors) together into a single cohesive unit.",
        },
        {
          heading: "2. What is a Private Data Member?",
          content:
            "Data members declared under the 'private:' access specifier cannot be accessed directly from outside the class (e.g. from main()). This enforces Data Encapsulation, shielding internal state from accidental tampering.",
        },
        {
          heading: "3. What is a Constructor?",
          content:
            "A constructor is a special member function that has the exact same name as the class and has NO return type (not even void). It is invoked automatically by the C++ compiler whenever a new object of that class is instantiated.",
        },
        {
          heading: "4. Why do we use a Parameterized Constructor?",
          content:
            "A parameterized constructor takes arguments at the moment of object creation, allowing each object to be initialized with custom, valid starting values directly instead of relying on default or garbage memory.",
        },
        {
          heading: "5. What is a Destructor?",
          content:
            "A destructor is a special member function having the same name as the class preceded by a tilde (~). It takes no arguments, cannot be overloaded, and has no return type. It is invoked automatically when an object goes out of scope to release memory and resources.",
        },
        {
          heading: "6. When is the Destructor Called?",
          content:
            "The destructor is invoked automatically when a stack-allocated object's scope ends (such as exiting main() or a block {}), or explicitly when delete is used on dynamically allocated objects. In C++, stack objects are destroyed in reverse order of their creation (LIFO - Last In, First Out).",
        },
      ],
    },
    sampleOutput: `=== Creating Student 1 ===
[Constructor] Object created for Roll No: 101 (Aarav Sharma)

=== Creating Student 2 ===
[Constructor] Object created for Roll No: 102 (Pooja Patel)

=== Displaying Student Details ===
----------------------------------------
Student Name : Aarav Sharma
Roll Number  : 101
Marks 1      : 85
Marks 2      : 90
Marks 3      : 88
Average      : 87.6667
----------------------------------------

----------------------------------------
Student Name : Pooja Patel
Roll Number  : 102
Marks 1      : 92
Marks 2      : 78
Marks 3      : 84
Average      : 84.6667
----------------------------------------

=== Exiting main() scope (Destructors will be triggered) ===
Object for roll number 102 destroyed
Object for roll number 101 destroyed`,
    conceptsUsed: [
      "Class Design & Object Instantiation",
      "Data Encapsulation (private specifier)",
      "Parameterized Constructor Initialization",
      "Member Methods (calculateAverage, display)",
      "Destructor Lifecycle & LIFO Destruction Order",
    ],
    trainerPitch:
      "Sir/Ma'am, in Q4 I created a Student class encapsulating private members for name, roll number, and three subject marks. I wrote a parameterized constructor that initializes all fields upon instantiation, a calculateAverage() method that returns the floating-point average, a display() method, and a destructor ~Student() that prints the destroyed roll number when objects go out of scope at the end of main().",
    vivaQuestions: [
      {
        question: "Why do we use a constructor and a destructor? (2–3 line summary)",
        answer:
          "We use a constructor to automatically initialize an object's data members with valid values at the time of creation, preventing garbage values. We use a destructor to automatically perform cleanup and release system resources when the object's lifecycle ends.",
      },
      {
        question: "Can a constructor have a return type like void or int?",
        answer:
          "No, constructors cannot have any return type, not even void. Their sole purpose is object construction and initialization.",
      },
      {
        question: "Why are destructors called in reverse order (LIFO)?",
        answer:
          "C++ allocates stack objects in a Last-In-First-Out (LIFO) order. Object s2 was constructed after s1, so when main() exits, s2 is destroyed first, followed by s1. This ensures dependencies between objects remain valid during cleanup.",
      },
      {
        question: "Can a destructor be overloaded in C++?",
        answer:
          "No, a class can have only one destructor because it does not accept any parameters or return types.",
      },
    ],
    extraSection: {
      title: "Core Concepts Breakdown for Q4",
      items: [
        {
          label: "1. What is a class?",
          explanation:
            "A class is a user-defined blueprint or data type in C++ that binds data variables (attributes) and methods (behaviors) into a single cohesive structure.",
        },
        {
          label: "2. What is a private data member?",
          explanation:
            "A variable declared inside the 'private:' section of a class that is inaccessible from outside functions, protecting sensitive data through encapsulation.",
        },
        {
          label: "3. What is a constructor?",
          explanation:
            "A special member function having the same name as the class and no return type, automatically called when an object of the class is instantiated.",
        },
        {
          label: "4. Why do we use a parameterized constructor?",
          explanation:
            "It allows passing dynamic arguments to initialize an object's member variables with specific values immediately upon creation.",
        },
        {
          label: "5. What is a destructor?",
          explanation:
            "A special member function with the same name as the class prefixed with ~ that cleans up memory and resources when an object is destroyed.",
        },
        {
          label: "6. When is the destructor called?",
          explanation:
            "It is automatically invoked when an object goes out of its declaring scope (e.g., when the function containing it returns or ends).",
        },
        {
          label: "Required 2–3 Line Summary",
          explanation:
            "A constructor ensures that an object is safely initialized with valid data right at birth, avoiding garbage values. A destructor guarantees that all allocated resources are cleanly released when the object dies, preventing resource leaks.",
        },
      ],
    },
    simulatedInputsDefault: {
      s1_name: "Aarav Sharma",
      s1_roll: 101,
      s1_m1: 85,
      s1_m2: 90,
      s1_m3: 88,
      s2_name: "Pooja Patel",
      s2_roll: 102,
      s2_m1: 92,
      s2_m2: 78,
      s2_m3: 84,
    },
  },
  {
    id: "q5",
    num: 5,
    title: "Q5 – Single Inheritance",
    shortTitle: "Single Inheritance",
    fileName: "q5_single_inheritance.cpp",
    objective:
      "Demonstrate single inheritance in C++ by creating a base class Vehicle with a public method displayInfo() printing 'This is a vehicle.', and a derived class Car that publicly inherits from Vehicle and overrides displayInfo() to print 'This is a car with 4 wheels and a steering wheel.' In main(), instantiate one Car object and one Vehicle object, invoke displayInfo() on both, and display both outputs.",
    sourceCode: `/*
 * Course / Internship : C++ & Data Structures
 * Assignment          : Assignment 1
 * Question            : Q5 - Single Inheritance
 * Description         : Demonstrates single inheritance where derived class Car
 *                       publicly inherits from base class Vehicle and overrides displayInfo().
 */

#include <iostream>

using namespace std;

// Base Class
class Vehicle {
public:
    // Base class method
    void displayInfo() {
        cout << "This is a vehicle." << endl;
    }
};

// Derived Class publicly inheriting from Vehicle (Single Inheritance)
class Car : public Vehicle {
public:
    // Overriding the base class displayInfo() method
    void displayInfo() {
        cout << "This is a car with 4 wheels and a steering wheel." << endl;
    }
};

int main() {
    cout << "=== Demonstrating Single Inheritance in C++ ===\\n" << endl;

    // 1. Create a Car object and call displayInfo()
    cout << "Calling displayInfo() using Car object:" << endl;
    Car myCar;
    myCar.displayInfo();

    cout << endl;

    // 2. Create a Vehicle object and call displayInfo()
    cout << "Calling displayInfo() using Vehicle object:" << endl;
    Vehicle myVehicle;
    myVehicle.displayInfo();

    return 0;
}`,
    explanation: {
      summary:
        "This program demonstrates single inheritance, where one derived class inherits directly from one base class, and shows function overriding, where the child class provides its own specialized implementation of a parent method.",
      sections: [
        {
          heading: "1. What is Inheritance?",
          content:
            "Inheritance is a fundamental Object-Oriented Programming (OOP) mechanism by which a new class (derived/child class) acquires the properties, attributes, and methods of an existing class (base/parent class). It promotes code reusability and hierarchical classification.",
        },
        {
          heading: "2. Base Class vs Derived Class",
          content:
            "The Base Class (Vehicle) is the parent class whose members are inherited. The Derived Class (Car) is the child class that inherits from the base class using the syntax: class Car : public Vehicle.",
        },
        {
          heading: "3. What does 'public' Inheritance Mean?",
          content:
            "Public inheritance preserves accessibility: public members of the base class remain public in the derived class, and protected members remain protected. This models an 'IS-A' relationship (a Car IS-A Vehicle).",
        },
        {
          heading: "4. What does Function Overriding Mean?",
          content:
            "Function overriding occurs when a derived class defines a member function with the exact same name, return type, and parameter list as a function in its base class. When invoked on a derived object, the derived version executes instead of the base version.",
        },
        {
          heading: "5. Real-Life Example of Inheritance",
          content:
            "Think of a generic 'Vehicle' in real life: every vehicle has basic traits like engine and movement. A 'Car' inherits all those general vehicle attributes but adds specific features like 4 wheels, a steering wheel, and airbags.",
        },
      ],
    },
    sampleOutput: `=== Demonstrating Single Inheritance in C++ ===

Calling displayInfo() using Car object:
This is a car with 4 wheels and a steering wheel.

Calling displayInfo() using Vehicle object:
This is a vehicle.`,
    conceptsUsed: [
      "Single Inheritance (`class Car : public Vehicle`)",
      "Base Class & Derived Class Relationship",
      "Public Access Specifier Inheritance",
      "Function Overriding (Method Re-implementation)",
      "Object Instantiation & Direct Member Invocation",
      "Code Reusability & IS-A Hierarchy",
    ],
    trainerPitch:
      "Sir/Ma'am, in Q5 I demonstrated single inheritance where class Car publicly inherits from class Vehicle. The base class has a displayInfo() method printing 'This is a vehicle.' The derived class Car overrides this method to output 'This is a car with 4 wheels and a steering wheel.' In main(), calling displayInfo() on the Car object executes the overridden car version, while calling it on the Vehicle object executes the base vehicle version.",
    vivaQuestions: [
      {
        question: "Explain inheritance and a real-life example in 2–3 lines.",
        answer:
          "Inheritance is an OOP mechanism where a derived class inherits properties and methods from a base class, eliminating redundant code. A real-life example is Vehicle and Car: a Car inherits basic transportation traits from Vehicle, but adds specific features like 4 wheels and a steering wheel.",
      },
      {
        question: "What is the difference between Function Overloading and Function Overriding?",
        answer:
          "Function Overloading happens in the SAME class when functions share the same name but have DIFFERENT parameter types or counts (compile-time polymorphism). Function Overriding happens in INHERITANCE between base and derived classes when functions have the EXACT SAME signature and parameters.",
      },
      {
        question: "What is Single Inheritance?",
        answer:
          "Single inheritance is an inheritance model where a derived class inherits directly from only ONE base class (e.g., class Car : public Vehicle).",
      },
      {
        question: "What would happen if Car did not override displayInfo()?",
        answer:
          "If Car did not override displayInfo(), invoking myCar.displayInfo() would simply execute the inherited base class implementation, printing 'This is a vehicle.'",
      },
    ],
    extraSection: {
      title: "Inheritance Core Concepts for Q5",
      items: [
        {
          label: "What is inheritance?",
          explanation:
            "An OOP feature that allows a child class to inherit fields and methods from a parent class, enabling code reuse.",
        },
        {
          label: "What is a base class?",
          explanation:
            "The existing parent class whose properties are inherited by other classes.",
        },
        {
          label: "What is a derived class?",
          explanation:
            "The child class that inherits from the base class and can add new features or modify existing ones.",
        },
        {
          label: "What does public inheritance mean?",
          explanation:
            "Public members of the base class remain public in the derived class, establishing an 'is-a' relationship.",
        },
        {
          label: "What does function overriding mean?",
          explanation:
            "When a derived class redefines a base class function using the exact same signature to provide specific behavior.",
        },
        {
          label: "Real-life Example & 2–3 Line Summary",
          explanation:
            "Inheritance allows a new class to acquire properties from an existing class, promoting reuse. For example, a 'Car' inherits foundational traits (engine, movement) from a generic 'Vehicle', while specifying unique features like 4 wheels and steering.",
        },
      ],
    },
    simulatedInputsDefault: {},
  },
];
