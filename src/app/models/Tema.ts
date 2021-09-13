import { Postagem } from "./Postagem"

export class Tema{
    public id: number
    public saude: boolean
    public alimentacao: boolean
    public educacao: boolean
    public descricao: string
    public postagem: Postagem[]
}