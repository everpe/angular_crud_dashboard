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
import { FormEditComponent } from './components/form-edit/form-edit.component';
// Importaciones Dashboard
import { MainNavComponent } from './main-nav/main-nav.component';

// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    UnoComponent,
    DosComponent,
    FormComponent,
    FormsComponent,
    ListCustomersComponent,
    FormEditComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    MatModule,
    BrowserAnimationsModule,
  ],
  providers: [
    appRoutingProviders,
    CustomerService
  ],
  bootstrap: [AppComponent],
  ///Controlar donde se muestra ese componente.
  entryComponents:[FormEditComponent]
})
export class AppModule { }
