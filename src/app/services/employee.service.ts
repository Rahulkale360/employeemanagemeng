import { Injectable } from '@angular/core';
import { Employee } from 'src/models/employee';
import { EmployeeDataContext } from '../data/EmployeeDataContext';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees ;
  constructor() {
   this.employees = EmployeeDataContext.employees;
  }

  getEmployees() {
    return this.employees;
  }

  getEmployeeWithExperiece(years: number) {
    let employees = [];
    this.employees.forEach((employee) => {
      //getting employee's joing year.
      let joiningYear = Number(
        employee.joining_date.substr(employee.joining_date.length - 4)
      );

      // current year
      let currentYear = new Date().getFullYear();

      // calculating experience.
      let experience = currentYear - joiningYear;

      // push employees having more than two years of experience into array.
      if (experience > 2) employees.push(employee);
    });
    return employees;
  }

  getDepartmentDetails() {
    let departments : {department: string, candidates: number}[] = [];

    for(let index = 0; index < this.employees.length; index++){
      // getting each employee
      let employee = this.employees[index];

      let departmentIndex = departments.findIndex(x => x.department === employee.department);

      // if department is not present then add to department array.
      if(departmentIndex == -1){

        let obj = {
          department : employee.department,
          candidates: 1
        }
        departments.push(obj);

      }else{
        // if department is present then update count of department.
        let candidates = departments[departmentIndex].candidates;
        departments[departmentIndex].candidates = ++candidates;
      }  
    }

    return departments;
    
  }

  removeEmployeesWithDevelopmentDepartment(department: string){
    if(department)
        this.employees = this.employees.filter(x => x.department.toLowerCase() !== department.toLocaleLowerCase());
        
    return this.employees;
  }
}
