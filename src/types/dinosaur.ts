// src/types/dinosaur.ts

export interface DinosaurAttributes {
  comprimento: number;
  peso: number;
  velocidade: number;
  inteligencia: number;
  forca_mordida: number;
  defesa: number;          // Novo
  anos: number;            // Novo (em milhões, ex: 68 significa 68 milhões de anos atrás)
}

export interface Dinosaur extends DinosaurAttributes {
  id: number;
  nome: string;
  imagem: string;
}