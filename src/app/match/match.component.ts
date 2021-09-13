import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../models/Postagem';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {


  listaPostagens: Postagem[]
  listaPostagensIguais: Postagem[]

  UserId = environment.id
  user: Usuario = new Usuario()

  temaId: number[]

  constructor(private router: Router,private postagemService: PostagemService, private auth: AuthService) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/home'])
    }
    this.getAllPostagens()
    this.getUserById()
    this.matchPost()
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }
  getUserById(){
    this.auth.getByIdUser(this.UserId).subscribe((resp: Usuario)=>{
      this.user = resp
      
    })
  }
  getIdTemaByUserPostagem(){
    this.temaId = this.user.postagem.map((post: Postagem)=>{
      return post.tema.id
    })
  }
  matchPost(){
    this.listaPostagensIguais = this.listaPostagens.filter((post: Postagem)=>{
      return this.temaId.includes(post.tema.id) && post.usuario.id != this.UserId      
    })
    console.log(this.listaPostagensIguais)
  }
}
