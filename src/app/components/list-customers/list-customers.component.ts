import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Sort, MatSort} from '@angular/material/sort';
import {CustomerI} from '../../models/customer.interface'

import {CustomerService} from '../../services/customer.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {FormEditComponent} from '../form-edit/form-edit.component';
@Component({
  selector: 'list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})

export class ListCustomersComponent implements OnInit {
  public customers=[];
  //Columnas de la Tabla
  displayedColumns: string[] = ['name', 'age', 'city', 'order','actions','new'];
  //Información  de La Tabla
  dataSource = new MatTableDataSource();
  //Decorador que indica que la vista del componente tendrá Sort.
@ViewChild(MatSort) sort: MatSort;

  constructor(
    private customerService:CustomerService,
    private dialog: MatDialog
    ){ 
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
    this.customerService.getAllCustomers().subscribe(res => this.dataSource.data=res);

    this.customerService.getAllCustomers().subscribe(customers=>{
      this.customers=customers;  
      console.log(customers);
    });
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
    this.openModal();
    if(element){
      this.customerService.customerEdit=element;
      console.log("si",element);
    }
  }
  onCreate(){
    this.resetEditForm();
    this.openModal();
  }
  onDelete(event,customer:CustomerI){
    console.log("deleting :",customer);
    this.customerService.deleteCustomer(customer);
  }  

  openModal():void{
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      title:'Modal',    
    };
    dialogConfig.autoFocus=true;
    this.dialog.open(FormEditComponent,dialogConfig);
  }

  resetEditForm():void{
    this.customerService.customerEdit.name='';
    this.customerService.customerEdit.id=null;
    this.customerService.customerEdit.city='';
    this.customerService.customerEdit.order='';
    this.customerService.customerEdit.age=0;
  }
}
