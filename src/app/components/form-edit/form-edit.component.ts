
import { Component, OnInit,Inject } from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {CustomerI} from '../../models/customer.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'form-edit-dialog',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})


export class FormEditComponent implements OnInit {

  public customer:CustomerI;
 
  constructor(
    public customerService: CustomerService,
    private dialogRef: MatDialogRef<FormEditComponent>,
    @Inject(MAT_DIALOG_DATA) data){
    }
   



  
  ngOnInit(): void {
    this.customer=this.customerService.customerEdit;
  }

  onSaveForm(){
    if(this.customerService.customerEdit.id==null){
      let newCustomer={
        name:this.customerService.customerEdit.name,
        age:this.customerService.customerEdit.age,
        city:this.customerService.customerEdit.city,
        order:this.customerService.customerEdit.order
      };
      this.customerService.addCustomer(newCustomer);
      console.log('newww:',newCustomer);
    }else{
      this.customerService.editCustomer(this.customerService.customerEdit);
      console.log("guardando");  
    }
    //Luego de ejecutar cerramos
    this.close();
   }

   /**
    * Metodo para cerrar este formulario de edición y creación de Customers.
    */
   close(){
     this.dialogRef.close();
   }

}
