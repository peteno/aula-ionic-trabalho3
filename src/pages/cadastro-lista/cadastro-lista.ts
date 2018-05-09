import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ListaCompraProvider } from '../../providers/lista-compra/lista-compra';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the CadastroListaCompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-lista',
  templateUrl: 'cadastro-lista.html',
})
export class CadastroListaPage {

  listaForm: FormGroup;
  home = HomePage;
  private dataLocal : any;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder, 
              private listaCompraProvider:ListaCompraProvider,
              public authData: AuthProvider) {

      this.dataLocal = this.navParams.data;

      let data = {
        usuariocriador: authData.afAuth.auth.currentUser.uid,
        descricao: '',
        produtos: [],
        usuarios: []
      };
      if (this.dataLocal.payload) {
        //this.listaCompraProvider.retornaUm(this.dataLocal.payload.key).subscribe(resp => this.listaForm = resp);
      } 
      this.listaForm = formBuilder.group({
        usuariocriador: [data.usuariocriador, Validators.required],
        descricao: [data.descricao, Validators.required],
        produtos: this.formBuilder.array( this.createItemProdutos(data.produtos) ),
        usuarioscompartilhado: this.formBuilder.array( this.createItemUsuarios(data.usuarios) )
      });
  }

  private createItemProdutos(produtos): any[] {
    let ret = [];
    produtos.forEach(produto => {
      ret.push(this.formBuilder.group(produto));
    });
    return ret;
  }

  private createItemUsuarios(usuarios): any[] {
    /*if (usuarios.length === 0) {
      usuarios.push({
        id: this.authData.afAuth.auth.currentUser.uid
      });
    }*/
    let ret = [];
    usuarios.forEach(usuario => {
      ret.push(this.formBuilder.group(usuario));
    });
    return ret;
  }

  //caso o formulario seja valido salva o lista e volta pra pagina inicial
  salvarListaCompra(){
    if (!this.listaForm.valid) {
      alert('preencha todos os campos');
    } else {
      this.listaCompraProvider.insere(this.listaForm.value);
      alert('salvo');
      this.voltarPagina();
    }
  }

  comprarDescomprar(item) {
    
  }

  voltarPagina(){
    this.navCtrl.setRoot(HomePage);
  }
}
