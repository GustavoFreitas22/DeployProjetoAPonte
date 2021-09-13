import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: Usuario = new Usuario()
  idUser: number

  confirmSenha: string
  tipoUser: string

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/home'])
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmarSenha(event:any){
    this.confirmSenha = event.target.value
  }

  tipoUsuario(event:any){
    this.tipoUser= event.target.value
  }

  atualizar(){
    this.user.tipo = this.tipoUser

    if(this.user.senha != this.confirmSenha){
      alert('Senhas incorretas')
    }else{
      this.authService.cadastrar(this.user).subscribe((resp: Usuario)=>{
        this.user = resp
        alert('Usuario atualizado com sucesso! Faça o login novamente')
        environment.token = ''
        environment.foto =''
        environment.nome=''
        environment.id = 0
        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id:number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario)=>{
      this.user = resp
    })
  }
}
