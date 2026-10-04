/*
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
        cout << "\n----------------------------------------" << endl;
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

    cout << "\n=== Creating Student 2 ===" << endl;
    Student s2("Pooja Patel", 102, 92, 78, 84);

    cout << "\n=== Displaying Student Details ===";
    s1.display();
    s2.display();

    cout << "\n=== Exiting main() scope (Destructors will be triggered) ===" << endl;
    return 0;
}
