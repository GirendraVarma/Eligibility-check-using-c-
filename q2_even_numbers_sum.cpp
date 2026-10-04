/*
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
}
