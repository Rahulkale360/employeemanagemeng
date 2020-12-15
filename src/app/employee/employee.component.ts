import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/models/employee';
import { Constants } from '../helpers/constants';
import { GridComponent } from '../helpers/controls/grid/grid.component';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @ViewChild('gridComponent') gridComponent : GridComponent;
  
  searchText: string;
  employees: Employee[];
  columns = [];
  labels = Constants;
  constructor(
    private employeeService: EmployeeService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.generateColumns();
    this.getEmployees();
  }

  //gets employees
  getEmployees(){

    //params observable for listening routing changes.
    this.router.params.subscribe((params) => {
      // if year paramter is present on route then get employees having experince more than 'x' years.
      //else get all the employees.

      if (params['years']) {
        this.employees = this.employeeService.getEmployeeWithExperiece(
          params['years']
        );
      } else {
        this.employees = this.employeeService.getEmployees();
      }

    });
  }

  // searches the employees by name.
  searchEmployees(){
    // if no searchText present then return all the employees else filter the data.
    if (!this.searchText) {
      this.gridComponent.onEmployeeSearch(this.employees);
      return;
    }
    let filteredEmployees = this.employees.filter(employee => employee.name.toLowerCase().includes(this.searchText.toLowerCase())).slice();
    
    this.gridComponent.onEmployeeSearch(filteredEmployees);

  }

  generateColumns() {
    this.columns.push({ text: 'Name', field: 'name' , isSorttable: true});
    this.columns.push({ text: 'Department', field: 'department' , isSorttable: false});
    this.columns.push({ text: 'Joining Date', field: 'joining_date', isSorttable: true });
  }

  // removes the employees having development department.
  removeDevelopmentEmployees(){
   this.employees = this.employeeService.removeEmployeesWithDevelopmentDepartment('Development');
    }

}
