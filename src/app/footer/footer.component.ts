import { Component } from '@angular/core'

@Component({
  selector    : 'app-footer',
  templateUrl : './footer.component.html',
  styleUrls   : ['./footer.component.css']
})

export class FooterComponent {
  public autor:  any = {nombre: 'M.C.C. Miguel Angel ', apellido:'Montoya Del Campo'}
}
