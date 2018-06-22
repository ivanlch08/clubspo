export interface NoticiaDto {
    id: number;
    usuario: string;
    tipo: string;
    imagen: string;
    texto: string;
    likes: number;
    listaComentarios: string[];
}