import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestaquesComponent } from './componentes/destaques/destaques.component';
import { DetalhesComponent } from './componentes/detalhes/detalhes.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { FinalizarpedidoComponent } from './componentes/finalizarpedido/finalizarpedido.component';
import { ReciboComponent } from './componentes/recibo/recibo.component';
import { BuscarcategoriaComponent } from './componentes/buscarcategoria/buscarcategoria.component';
import { BuscapalavrachaveComponent } from './componentes/buscapalavrachave/buscapalavrachave.component';

const routes: Routes = [
  { path: '', component: DestaquesComponent },
  { path: 'detalhe/:id', component: DetalhesComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'finalizarcompra', component: FinalizarpedidoComponent },
  { path: 'recibo/:num', component: ReciboComponent },
  { path: 'categorias/:id', component: BuscarcategoriaComponent },
  { path: 'busca', component: BuscapalavrachaveComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
