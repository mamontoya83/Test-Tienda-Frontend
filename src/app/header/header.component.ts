import { Component } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
  buscar( dato : string):void{
    alert(dato);

  }
}
