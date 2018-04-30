import { Component } from '@angular/core';

import { CuentaPropiaPage } from '../cuentaPropia/cuentaPropia';
import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';
import { ConfirRegistroPage } from '../confir-registro/confir-registro';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CuentaPropiaPage;
  tab3Root = RegistroPage;
  tab4Root = ConfirRegistroPage;

  constructor() {

  }
}
