import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroListaPage } from './cadastro-lista';

@NgModule({
  declarations: [
    CadastroListaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroListaPage),
  ],
})
export class CadastroListaPageModule {}
