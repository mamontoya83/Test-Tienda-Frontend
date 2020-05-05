import { Component, OnInit } from '@angular/core';
import { Articulo } from './articulo'
import { ArticuloService } from './articulo.service'
//
import { Router, ActivatedRoute } from '@angular/router'

//Libreria que permite hacer alert profesionales. Para instalar es:
//npm install sweetalert2 --save
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

  articulo : Articulo = new Articulo()
  titulo : string = "Crear Articulo"
  errores : string[];

  constructor(
    //Inyeccion de dependencias:
    private articuloService : ArticuloService,
      //Componente router para << hacer redirect >>
    private router : Router,
      //Componente activatedRoute para observar entrada de parametros por URL
    private activatedRoute : ActivatedRoute
  ){ }

  ngOnInit() {
    this.cargarArticulo()
  }

  public cargarArticulo() : void{
    //Metodo que verifica si una url contirne un parametro en especifico
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.articuloService.getArticulo(id).subscribe(
            json => {
              Object.keys(json).forEach( key => {
                  this.articulo = json[key];
                }
            )}
        )};
    })
  }

  public create() : void{
    this.articuloService.createArticulo(this.articulo).subscribe(
      articulo => {
        this.router.navigate(['/articulos'])
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `El usuario se coreo satisfactoriamente: ${articulo.nombre}`,
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => {
        this.errores = err.error.errors as string[]
        console.error("Codigo de error desde el backend = " + err.status);
        console.error(err.error.errors);
      }
    );
    }

  public update() : void{
    this.articuloService.updateArticulo(this.articulo).subscribe(
      articulo => {
        this.router.navigate(['/articulos'])
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `El articulo ${articulo.nombre} se ha actualizado satisfactoriamente`,
          showConfirmButton: false,
          timer: 1500
        })
      })
  }
}
