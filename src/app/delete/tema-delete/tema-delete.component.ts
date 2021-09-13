import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/models/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number
  constructor(private temaService: TemaService, private route: ActivatedRoute, private router: Router, private alertas: AlertasService) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.idTema = this.route.snapshot.params['id']
    this.findById(this.idTema)
  }

  findById(id:number){
    this.temaService.getTemaById(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  delete(){
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      this.alertas.showAlertSuccess('Tema deletado com sucesso')
      this.router.navigate(['/tema'])
    })
  }

}
