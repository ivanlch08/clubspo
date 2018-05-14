import { NgModule } from '@angular/core';
import { FrecDeporteComponent } from './frec-deporte/frec-deporte';
import { SeleccionDeporteComponent } from './seleccion-deporte/seleccion-deporte';
import { InteresDeporteComponent } from './interes-deporte/interes-deporte';
@NgModule({
	declarations: [FrecDeporteComponent,
    SeleccionDeporteComponent,
    InteresDeporteComponent],
	imports: [],
	exports: [FrecDeporteComponent,
    SeleccionDeporteComponent,
    InteresDeporteComponent]
})
export class ComponentsModule {}
