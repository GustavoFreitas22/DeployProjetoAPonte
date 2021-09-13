import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../models/Postagem';
import { Tema } from '../models/Tema';
import { Usuario } from '../models/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto

  listaPostagem: Postagem[]
  postagem: Postagem = new Postagem()

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()

  user: Usuario = new Usuario()
  idUser = environment.id

  constructor(private router: Router, private postagemService: PostagemService, private temaService: TemaService, private auth: AuthService,  private alertas: AlertasService ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/home'])
    }
    this.getAllPostagens()
    this.getAllTemas()
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTemas(){
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: Usuario)=>{
      this.user = resp
      console.log(this.user)
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }
  sair(){
    this.router.navigate(['/home'])
    environment.token =''
    environment.nome =''
    environment.id = 0
    environment.foto=''
  }
}
