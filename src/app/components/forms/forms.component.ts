import { Component, OnInit } from '@angular/core';
import{CuestionarioService} from '../../services/cuestionario.service';
import { Cuestionario } from 'src/app/models/cuestionario';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
 //todos los cuestionarios
 questiorys= [];
  constructor(public cuestionarioService: CuestionarioService) { }

  ngOnInit(): void {
    this.cuestionarioService.getQuestionarys().subscribe(forms=>{
       this.questiorys=forms;  
      console.log(forms);
    });
  }

}
