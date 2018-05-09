import { VisualizarFotosPage } from './../visualizar-fotos/visualizar-fotos';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListaCompraProvider } from '../../providers/lista-compra/lista-compra'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lista = [];
  listaCompartilhada = [];
  listapromisse = [];

  constructor(public navCtrl: NavController, private listaCompraProvider:ListaCompraProvider, public navParams:NavParams) {
    this.listaCompraProvider.getAll().subscribe(res=>
      {
         this.lista = res;
         res.forEach(r => {
           console.log(r.payload.val());
         })
      });
    this.listaCompraProvider.getAllSubscribed().subscribe(res=> this.listaCompartilhada = res);
  }
  // abre a pagina passando parametro para proxima
  abreDetalhes(obj){
    this.navParams.data = obj;
    this.navCtrl.push(VisualizarFotosPage, this.navParams);
  }


}
