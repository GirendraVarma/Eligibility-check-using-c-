/*
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
    cout << "=== Demonstrating Single Inheritance in C++ ===\n" << endl;

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
}
