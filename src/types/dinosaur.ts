// src/types/dinosaur.ts

export interface DinosaurAttributes {
  comprimento: number;
  peso: number;
  velocidade: number;
  inteligencia: number;
  forca_mordida: number; // Novo
  periculosidade: number; // Novo
}

export interface Dinosaur {
  id: number;
  nome: string;
  imagem: string;
  comprimento: number;
  peso: number;
  velocidade: number;
  inteligencia: number;
  forca_mordida: number; // Novo
  periculosidade: number; // Novo
}