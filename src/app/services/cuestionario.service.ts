import { Injectable } from '@angular/core';
//importa la bd
import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
//importa el model de datos para productos
import { Cuestionario} from '../models/cuestionario';
//el observable para que se actualicen los datos en tiempo real
import { Observable } from 'rxjs';
//para poder usar map y sacar id
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

   //arreglo de tipo Product,guarda los productos pero sin id
   
  questionarys:Observable<Cuestionario[]>;

   //se crea como colección para poder obetener el id de los productos tambien, no 
     //solo los objeetos con datos
    questionarysCollection:AngularFirestoreCollection<Cuestionario>;
 
   //documento o registro que hay dentro de la colección
   questionaryDoc:AngularFirestoreDocument<Cuestionario>;

  constructor(public db:AngularFirestore){
    // this.questionarys=this.db.collection('forms').valueChanges();

    this.questionarysCollection=this.db.collection('forms');
    this.questionarys=this.questionarysCollection.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a =>{
          const data=a.payload.doc.data()as Cuestionario;
          data.id= a.payload.doc.id;
          return data;
        });
      }));
  }

  getQuestionarys(){
    return this.questionarys;
  }

  addForm(cuestionario : Cuestionario){
    this.questionarysCollection.add(cuestionario);
  }
}
