import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {routing,appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { UnoComponent } from './components/uno/uno.component';
import { DosComponent } from './components/dos/dos.component';
import { FormComponent } from './components/form/form.component';

//Importa todos los servicios y la configuración de Environments
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
//importa el servicio de almacenamiento
import { AngularFirestoreModule } from '@angular/fire/firestore';
//importar el form de Angular para trabajar con el ngModel en los formularios
import {FormsModule} from '@angular/forms';
import { FormsComponent } from './components/forms/forms.component';
import { MatModule } from './mat/mat.module';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {CustomerService} from './services/customer.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    UnoComponent,
    DosComponent,
    FormComponent,
    FormsComponent,
    ListCustomersComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    MatModule,
    BrowserAnimationsModule
  ],
  providers: [
    appRoutingProviders,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
