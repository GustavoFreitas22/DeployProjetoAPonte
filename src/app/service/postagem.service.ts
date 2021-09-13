import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../models/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://projetoaponte.herokuapp.com/postagem', this.token)
  }
  
  getPostagemById(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://projetoaponte.herokuapp.com/postagem/${id}`, this.token)
  }
  
  getByTitle(titulo: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`https://projetoaponte.herokuapp.com/postagem/titulo/${titulo}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('https://projetoaponte.herokuapp.com/postagem', postagem ,this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('https://projetoaponte.herokuapp.com/postagem', postagem, this.token)
  }

  deletePostagem(id: number){
    return this.http.delete(`https://projetoaponte.herokuapp.com/postagem/${id}`, this.token)
  }
}
