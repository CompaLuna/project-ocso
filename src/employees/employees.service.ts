import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { find } from 'rxjs';
import { v4 as uuidv } from 'uuid';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  private employees = [
    {
      id: uuidv(),
      name: 'Diego',
      lastName: 'Luna',
      phoneNumber: 'xxxxxx7088'
    },
    {
      id: uuidv(),
      name: 'Fernanda',
      lastName: 'Alcantara',
      phoneNumber: 'xxxxxx3590'
    }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuidv();
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    // retornar todos los empleados
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    if (!employee) throw new NotFoundException()
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);
    employeeToUpdate = {
      ... employeeToUpdate,
      ... updateEmployeeDto,
    }
    if (employeeToUpdate) throw new NotFoundException()
    this.employees = this.employees.map((employee) => {
      if (employee.id === id) {
        employee = employeeToUpdate
      }
      return employee
    })

    return employeeToUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
