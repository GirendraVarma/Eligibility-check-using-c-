/*
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
    cout << "\n--- Results ---" << endl;
    cout << "Maximum: " << maximum << endl;
    cout << "Minimum: " << minimum << endl;
    cout << "Average: " << average << endl;

    return 0;
}
