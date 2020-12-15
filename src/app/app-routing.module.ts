import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {path: '', component: EmployeeComponent},
  {path: 'employees', redirectTo:''}, 
  {path: 'experience/:years', component: EmployeeComponent},
  {path: 'departments', component: DepartmentComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
