import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import { PaginaDevsComponent } from './pagina-devs/pagina-devs.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},

  {path:'home', component:HomeComponent},
  {path:'sobre', component:SobreNosComponent},
  {path:'entrar', component:EntrarComponent},
  {path:'cadastrar', component:CadastrarComponent},
  {path:'feed', component: FeedComponent},
  {path: 'tema', component: TemaComponent}, 
  {path: 'match', component: MatchComponent}, 
  {path: 'devs', component: PaginaDevsComponent},

  {path: 'tema-edit/:id', component: TemaEditComponent},
  {path: 'postagem-edit/:id', component: PostagemEditComponent}, 
  {path: 'user-edit/:id', component: UserEditComponent},

  {path: 'tema-delete/:id', component: TemaDeleteComponent}, 
  {path: 'postagem-delete/:id', component: PostagemDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
