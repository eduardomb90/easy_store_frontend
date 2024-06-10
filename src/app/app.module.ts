import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { DestaquesComponent } from './componentes/destaques/destaques.component';
import { CarrosselComponent } from './componentes/carrossel/carrossel.component';
import { DetalhesComponent } from './componentes/detalhes/detalhes.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { FinalizarpedidoComponent } from './componentes/finalizarpedido/finalizarpedido.component';
import { ReciboComponent } from './componentes/recibo/recibo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RodapeComponent,
    DestaquesComponent,
    CarrosselComponent,
    DetalhesComponent,
    CarrinhoComponent,
    FinalizarpedidoComponent,
    ReciboComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
