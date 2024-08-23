import { Injectable } from '@angular/core';
import { AlertService } from './alert.service'; // Importa el servicio de alertas

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private alertService: AlertService) {}

  handleError(error: any) {
    if (error.status) {
      switch (error.status) {
        case 404:
          this.alertService.showAlert('Error', 'El recurso solicitado no se encontró.', 'error', 'Aceptar');
          break;
        case 500:
          this.alertService.showAlert('Error', 'Error interno del servidor.', 'error', 'Aceptar');
          break;
        case 503:
          this.alertService.showAlert('Error', 'El servicio no está disponible en este momento.', 'error', 'Aceptar');
          break;
        case 502:
          this.alertService.showAlert('Error', 'Recibida una respuesta inválida del servidor.', 'error', 'Aceptar');
          break;
        case 504:
          this.alertService.showAlert('Error', 'Tiempo de espera agotado para la respuesta del servidor.', 'error', 'Aceptar');
          break;
        default:
          this.alertService.showAlert('Error', `Código de error: ${error.status}. ${error.message}`, 'error', 'Aceptar');
          break;
      }
    } else {
      this.alertService.showAlert('Error', 'Ocurrió un error inesperado.', 'error', 'Aceptar');
    }
  }
}