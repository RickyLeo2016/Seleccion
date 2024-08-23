import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/services/error-handler.service'; // Ajusta la ruta si es necesario
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class TipoCatalogoService {

    private apiUrl = `${environment.apiUrlGenerica}/TipoCatalogo/`;

    constructor(
      private http: HttpClient,
      private errorHandler: ErrorHandlerService
    ) {}

    registerTipoCatalogo(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}RegistrarTipoCatalogo`, data).pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error); // Usa el servicio de manejo de errores
          return throwError(error); // Re-lanza el error para que pueda ser manejado en otros lugares si es necesario
        })
      );
    }

    getListaTipoCatalogo(page: number, size: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}ListarTipoCatalogo?page=${page}&size=${size}`);
    }
    
}