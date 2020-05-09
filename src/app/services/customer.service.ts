import { Injectable } from '@angular/core';

// En esta ejemplo no importa Fireba en el appModule sino en el Servicio propiamente.
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
//Importando operadores de Angular Necesarios
import {Observable, from} from 'rxjs';
import {map} from 'rxjs/operators';
//model-Interface
import {CustomerI} from '../models/customer.interface';


// //Interface Extra Para el id Firebase(document)
// export interface CustomerId extends CustomerI {
//   id:String
// };

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerCollection: AngularFirestoreCollection<CustomerI>;

  //Customer que se va a Editar
    //arreglo de tipo Product,guarda los productos pero sin id
    customers:Observable<CustomerI[]>;

    //se crea como colección para poder obetener el id de los productos tambien,
    // no solo los objetos con datos
    customersCollection:AngularFirestoreCollection<CustomerI>;
  
    //documento o registro que hay dentro de la colección
    customerDoc:AngularFirestoreDocument<CustomerI>;

    public customerEdit:CustomerI={
      id:null,
      name:'',
      city:'',
      order:''
    };


 

  //iterar en los documentos para obtener el id
  constructor(private readonly db: AngularFirestore) { 
    //Inicializa La Coleccion de User
    this.customerCollection=db.collection<CustomerI>('customers');
    this.customers=this.customerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const data= a.payload.doc.data() as CustomerI;
        const id= a.payload.doc.id;
        return {id, ...data};
      }))
    );

  }

  // editCustomer(customer: CustomerI){
  //   // let id= customer.id;
  //   let id='';
  //   return this.customerCollection.doc(id).update(customer);
  // }

  editCustomer(customer:CustomerI){
    this.customerDoc=this.db.doc(`customers/${customer.id}`);
    this.customerDoc.update(customer);
  }

  deleteCustomer(customer:CustomerI){
    //Obtiene el registro del la colecccion customers
    this.customerDoc=this.db.doc(`customers/${customer.id}`);
    console.log(customer);
    this.customerDoc.delete();
  }

  addCustomer(customer:CustomerI){
    return this.customerCollection.add(customer);
  }
  /**
   * Retorna Todos los usuarios de la BD.
   */
  getAllCustomers(){
    return this.customers;
  }



}
