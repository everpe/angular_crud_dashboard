//importando dependencias
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//Importando componentes
import {UnoComponent} from './components/uno/uno.component';
import {DosComponent} from './components/dos/dos.component';
import {FormComponent} from './components/form/form.component';
import {FormsComponent} from './components/forms/forms.component';


//Creando arreglo de rutas de url
const appRoutes:Routes  =[
    {path:'uno', component :UnoComponent},
    {path:'dos', component :DosComponent},
    {path:'form', component :FormComponent},
    {path:'forms', component :FormsComponent},
];

//Exportando configuración
export const appRoutingProviders:any []= [];
export const routing:ModuleWithProviders= RouterModule.forRoot(appRoutes);