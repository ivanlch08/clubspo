import { NgModule } from '@angular/core';
import { FrecDeporteComponent } from './frec-deporte/frec-deporte';
import { SeleccionDeporteComponent } from './seleccion-deporte/seleccion-deporte';
import { InteresDeporteComponent } from './interes-deporte/interes-deporte';
import { TarjetaNoticiaComponent } from './tarjeta-noticia/tarjeta-noticia';
@NgModule({
	declarations: [FrecDeporteComponent,
    SeleccionDeporteComponent,
    InteresDeporteComponent,
    TarjetaNoticiaComponent],
	imports: [],
	exports: [FrecDeporteComponent,
    SeleccionDeporteComponent,
    InteresDeporteComponent,
    TarjetaNoticiaComponent]
})
export class ComponentsModule {}
