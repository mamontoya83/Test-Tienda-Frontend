import { Injectable }   from '@angular/core';
import { Articulo }      from './articulo';

//Objeto que permite trabajar con el responseEmtity que es enviado desde
//el backend como respuesta a las peticiones que se lanzan desde el frontend
//se usa mediante el metodo 'PIPE'
import { catchError }   from 'rxjs/operators';

//Libreria para Reactive Extesion (Programacion reactiva STREAM [Lambdas])
import { Observable, throwError }   from 'rxjs';

//Libreria que permite la comunicacion REST (HttpClient es un Container)
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Libreria que permite utilizar las alertas de sweetalert2
import swal from 'sweetalert2'

//Libreria que permite hacer redirect hacia otras pantallas, funciona mediante
//inyeccion de dependencias en el constructor
import { Router } from '@angular/router'


@Injectable()
export class ArticuloService {
  // ATRIBUTOS------------------------------------------------------
    //Se define el objeto header para poder realizar las peticiones mediante http
    private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
    //Direccion hacia donde apuntara la peticion REST
    private urlEndPoint : string = 'http://localhost:9898/api/articulos';

  // CONSTRUCTOR----------------------------------------------------
    //Se incluye el controlador HttpClient por inyeccion de dependencias a la
    //clase mediante su constructor (permite solicitudes POST,GET,PUT,DELETE)
    constructor( private http : HttpClient, private router : Router ) { }

  // METODOS--------------------------------------------------------
    //Metodo de tipo observable que retorna la peticion que se solicita
    //mediante el verbo (get,post,delete,update)
    getArticulos() : Observable<Articulo[]>{
      return this.http.get<Articulo[]>(this.urlEndPoint)
    }

    // Lanza la solicitud POST([url destino], [objeto a guardar], [headers])
    // como respuesta obtendra el onjeto guardado en formato Json
    createArticulo(articulo : any) : Observable<Articulo>{
      return this.http.post<any>(this.urlEndPoint, articulo,
        {headers : this.httpHeaders}).pipe(
        //En caso de ocurrir un error
        catchError(e => {
          if(e.status == 400){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          // Lanza alert personalizados notificando el error generado
          swal.fire("Error ",e.error.mensaje, e.error.error);
          // Retorna el objeto de tipo Observable que espera la cabecera
          return throwError(e);
        })
      );
    }

    //Realiza una peticion mediante el metodo Get con un parametro 'id',
    //retorna como resultado un usuario con el id  Solicitado
    getArticulo(id : any) : Observable<Articulo>{
      //En caso de exito retorna el objeto <Articulo>
      return  this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
        //En caso de ocurrir un error
        catchError(e => {
          //Redirecciona hacia la pantalla articulos en el frontend
          this.router.navigate(['/articulos']);
          //Imprime por consola el error
          console.error(e.error.mensaje);
          //Lanza alert personalizados notificando el error generado
          swal.fire("Error al editar",e.error.mensaje,'error');
          //Retorna el objeto de tipo Observable que espera la cabecera
          return throwError(e);
        })
      );
    }

    updateArticulo(articulo : Articulo) : Observable<Articulo>{
      return this.http.put<Articulo>(`${this.urlEndPoint}/${articulo.id}`,
        articulo, {headers : this.httpHeaders}).pipe(
        catchError(e => {
          if(e.status == 400){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          // Lanza alert personalizados notificando el error generado
          swal.fire("Error ",e.error.mensaje, e.error.error);
          // Retorna el objeto de tipo Observable que espera la cabecera
          return throwError(e);
        })
      );
    }

    deleteArticulo(id : number) : Observable<Articulo>{
      return this.http.delete<Articulo>(`${this.urlEndPoint}/${id}`,
        { headers : this.httpHeaders} )
    }
}
