/*
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
    cout << "\nWelcome, " << name << "!" << endl;
    cout << "Category: " << category << endl;

    return 0;
}
