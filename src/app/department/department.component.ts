import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departments = [];
  columns = [];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.generateColumns();
    this.getDepartmentDetails();
  }

  // generates columns for grid.
  generateColumns() {
    this.columns.push({ text: 'Department', field: 'department' });
    this.columns.push({ text: 'Candidates', field: 'candidates' });
  }

  // gets departsmentwise data.
  getDepartmentDetails() {
    this.departments = this.employeeService.getDepartmentDetails();
  }
}
