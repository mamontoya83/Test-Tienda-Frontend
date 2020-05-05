import { Component } from '@angular/core';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Tienda-App';

  curso:string = 'Angular con Java Spring Boot';
  profesor: string = 'Miguel Angel Motoya Del Campo';
}
