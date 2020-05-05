import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Modulo que permite geberar las rutas hacia los componentes mediante la url
import { RouterModule, Routes } from '@angular/router';
//Modulo que permite la comunicacion con el BackEnd mediante eticiones REST
import { HttpClientModule } from '@angular/common/http';
//Modulo que permite trabajar con formularios
import { FormsModule } from '@angular/forms'

//Modulos que conforman el aplicativo Angular
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ArticuloService } from './articulos/articulo.service';
import { FormComponent } from './articulos/form.component';
// import { DirectivaComponent } from './directiva/directiva.component';

const routes : Routes = [
  { path: '', redirectTo:'articulos', pathMatch:'full' },
  { path: 'articulos', component:ArticulosComponent },
  { path: 'articulos/form', component:FormComponent },
  { path: 'articulos/form/:id', component:FormComponent }
  // { path: 'directivas', component:DirectivaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArticulosComponent,
    FormComponent
    // DirectivaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ArticuloService],
  bootstrap: [AppComponent]
})
export class AppModule { }
