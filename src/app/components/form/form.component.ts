import { Component, OnInit } from '@angular/core';
//importa el servicio
import{CuestionarioService} from '../../services/cuestionario.service';
import { Cuestionario } from 'src/app/models/cuestionario';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public status:string;
  //el cuestionario que se va a agregar
  cuestionario = {} as Cuestionario;
  constructor(public cuestionarioService: CuestionarioService) {

  }

  ngOnInit(): void {
    this.cuestionarioService.getQuestionarys().subscribe(forms=>{
      // this.questiorys=forms;  
      console.log(forms);
    });
  }

  addCuestionario(form){
    // console.log(this.cuestionario);
    this.cuestionarioService.addForm(this.cuestionario);
    form.reset();
    this.status='true';
  }
}
