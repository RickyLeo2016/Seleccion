import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service'; // Importa el servicio
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { TipoCatalogoService } from 'src/app/services/tipo-catalogo.service'; 

@Component({
  selector: 'app-tipo-catalogo',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tipo-catalogo.component.html',
  styleUrl: './tipo-catalogo.component.scss'
})
export class TipoCatalogoComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  tipoCatalogoForm: FormGroup;
  tipoCatalogoList: any[] = []; // Inicializa como un array vacío
  pageNumber = 1;
  pageSize = 5;
  totalPages = 1;
  totalRecords = 0;
  globalFilter = '';
  pageSizes = [5, 10, 20, 50, 100]; // Opciones para el tamaño de la página
  totalItems: number = 0;
  filteredItems: any[] = []; // Datos filtrados que se mostrarán en la tabla
  headers = [
    { displayName: 'ID', dataKey: 'tipCatId' },
    { displayName: 'Descripción', dataKey: 'tipCatDescripcion' },
    { displayName: 'Estado', dataKey: 'tipCatEstado' },
    { displayName: 'Fecha Registro', dataKey: 'tipCatFechaRegistro' }
  
  ];
  catalogOptions: { value: string, label: string }[] = [
    { value: '', label: 'Seleccione una opción' },
    { value: 'A', label: 'Activo' }
  ];


  isCardVisible: boolean = false; // Controla la visibilidad del <app-card>


  constructor(private fb: FormBuilder, 
    
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private tipoCatalogoService: TipoCatalogoService,
    
  ) 
  {
    this.tipoCatalogoForm = this.fb.group({
      tipCatDescripcion: ['', Validators.required],
      tipCatEstado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTipoCatalogo();
    
  }

  toggleCard() {
    this.isCardVisible = !this.isCardVisible; // Alterna la visibilidad del <app-card>
    this.isCardVisible = this.isCardVisible; // Alterna la visibilidad del <app-card>
  }

  handleSave(): void {
    if (this.tipoCatalogoForm.valid) {
      this.alertService.showAlertConfirm().then((confirmed) => {
        if (confirmed) {
          this.onSubmit();
        } else {
          this.resetForm();
          this.alertService.showAlert('Alerta', 'Proceso cancelado', 'info', 'Aceptar');
        }
      }).catch((error) => {
        // Manejo de errores si ocurre algún problema al mostrar la alerta
        console.error('Error al mostrar la alerta:', error);
      });
    }else {
      this.alertService.showAlert('Formulario Inválido', 'Por favor, complete todos los campos requeridos.', 'warning', 'Aceptar');
    }
    
  }

 
  onSubmit() {
    if (this.tipoCatalogoForm.valid) {
      this.tipoCatalogoService.registerTipoCatalogo(this.tipoCatalogoForm.value).subscribe(
        response => {
          this.alertService.showAlert('Éxito', response.message, 'success', 'Aceptar');
          this.loadTipoCatalogo();
          this.resetForm();
        },
        (error: HttpErrorResponse) => {
          this.errorHandler.handleError(error); // Usa el servicio de manejo de errores
        }
      );
    } else {
      this.alertService.showAlert('Formulario Inválido', 'Por favor, complete todos los campos requeridos.', 'warning', 'Aceptar');
    }
  }

  resetForm() {
    this.tipoCatalogoForm.reset({
      tipCatDescripcion: '',
      tipCatEstado: ''
    });
  }

  loadTipoCatalogo(page: number = this.pageNumber, size: number = this.pageSize) {
    this.tipoCatalogoService.getListaTipoCatalogo(page, size).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.tipoCatalogoList = response.data;
          this.totalItems = response.totalCount;
        } else {
          this.tipoCatalogoList = [];
          this.totalItems = 0;
        }
      },
      error => {
        console.error('Error loading catalog types', error);
      }
    );
  }
  onPageChange(page: number) {
    this.pageNumber = page;
    this.loadTipoCatalogo();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.loadTipoCatalogo();
  }

  onFilterChange(filter: string) {
    this.globalFilter = filter; // Guarda el filtro global
    this.applyFilter(); // Aplica el filtro localmente
  }

  applyFilter() {
    if (this.globalFilter) {
      this.filteredItems = this.tipoCatalogoList.filter(item => 
        item.tipCatDescripcion.toLowerCase().includes(this.globalFilter.toLowerCase())
      );
    } else {
      this.filteredItems = [...this.tipoCatalogoList]; // Revertir a la lista completa si no hay filtro
    }
  }
  
}

