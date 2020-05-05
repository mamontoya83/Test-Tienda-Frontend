import { Component, OnInit }  from '@angular/core';
import { Articulo }            from './articulo';
import { ArticuloService }     from './articulo.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-articulo',
  templateUrl: './articulos.component.html'
})

export class ArticulosComponent implements OnInit {
  //ATRIBUTOS-------------------------------------------------------------------
  articulos : Articulo[];

  //CONSTRUCTOR-----------------------------------------------------------------
  constructor( private articuloService : ArticuloService) { }

  ngOnInit() {
    this.articuloService.getArticulos().subscribe(
      articulos => this.articulos = articulos
    );
  }

  //METODOS---------------------------------------------------------------------
  delete(articulo : Articulo) : void{
    swal.fire({
      title: 'Estas seguro?',
      text: "Se eliminara de manera permanente el registro",
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

     if (result.value) {
       this.articuloService.deleteArticulo(articulo.id).subscribe(
         response => {
           //Filtra de la lista al Articulo que se esta eliminando
           this.articulos = this.articulos.filter(art => art !== articulo)

           swal.fire(
             'Borrado!',
             `El registro ${articulo.nombre} ha sido borrado con éxito.`,
             'success'
           )
         })
      }
    })
  }

}
