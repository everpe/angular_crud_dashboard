import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Sort, MatSort} from '@angular/material/sort';
import {CustomerI} from '../../models/customer.interface'

import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  public customers:CustomerI;
  //Columnas de la Tabla
  displayedColumns: string[] = ['name', 'age', 'city', 'order','actions'];
  //Información  de La Tabla
  dataSource = new MatTableDataSource();

  //Decorador que indica que la vista del componente tendrá Sort.
@ViewChild(MatSort) sort: MatSort;

  constructor(private customerService:CustomerService) { 
  }

/**
 * Metodo que se ejecuta luego de inicializarse la vista
 * del Componente.
 */
  ngAfterViewInit(){
    //Al contenido de la tabla se le agrega el Sort.
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {
    //LLenando La tabla mediante el Servicio.
    this.customerService.getallCostumers().subscribe(res => this.dataSource.data=res);
  }

 
  /**
   * Metodo para filtrar por nombre de Material.
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element){
    console.log("editar",element);
  }
  onDelete(id:string){
    console.log("delete:",id);
    this.customerService.deleteCustomer(id);
  }  

}
