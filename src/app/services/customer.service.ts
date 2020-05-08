import { Injectable } from '@angular/core';

// En esta ejemplo no importa Fireba en el appModule sino en el Servicio propiamente.
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore';
//Importando operadores de Angular Necesarios
import {Observable, from} from 'rxjs';
import {map} from 'rxjs/operators';
//model-Interface
import {CustomerI} from '../models/customer.interface';


//Interface Extra Para el id Firebase(document)
export interface CustomerId extends CustomerI {id:String};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerCollection: AngularFirestoreCollection<CustomerI>;
  customers:Observable<CustomerId[]>;

  //iterar en los documentos para obtener el id
  constructor(private readonly afs: AngularFirestore) { 
    //Inicializa La Coleccion de User
    this.customerCollection=afs.collection<CustomerI>('customers');
    this.customers=this.customerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const data= a.payload.doc.data() as CustomerI;
        const id= a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  editCustomer(customer: CustomerI){
    // let id= customer.id;
    let id='';
    return this.customerCollection.doc(id).update(customer);
  }

  deleteCustomer(id:string){
    return this.customerCollection.doc(id).delete();
  }
  /**
   * Retorna Todos los usuarios de la BD.
   */
  getallCostumers(){
    return this.customers;
  }
}
