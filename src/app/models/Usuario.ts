import { Postagem } from "./Postagem"

export class Usuario{
    public id: number
    public nome: string
    public usuario: string
    public email: string
    public senha: string
    public tipo: string
    public registro: string
    public foto: string
    public postagem: Postagem[]
}