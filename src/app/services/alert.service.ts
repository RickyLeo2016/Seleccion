import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question', confirmButtonText: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: confirmButtonText
    });
  }


  showAlertConfirm(): Promise<boolean> {
    return Swal.fire({
      title: '¿Está seguro de continuar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Swal.fire('¡Guardado!', '', 'success');
        return true;
      } else if (result.isDenied) {
        //Swal.fire('Los cambios no se guardaron', '', 'info');
        return false;
      } else {
        return false; // Opcional: para el caso de que se cancele la alerta
      }
    });
  }



}
