// src/data/dinosaurs.ts

import type { Dinosaur } from '../types/dinosaur';

export const DINOSAURS_DATA: Dinosaur[] = [
  {
    "id": 1, "nome": "Tiranossauro Rex", "imagem": "/assets/images/t-rex.png",
    "comprimento": 13.5, "peso": 9.0, "velocidade": 27, "inteligencia": 7, "forca_mordida": 95, "periculosidade": 98
  },
  {
    "id": 2, "nome": "Velociraptor", "imagem": "/assets/images/velociraptor.png",
    "comprimento": 3, "peso": 0.15, "velocidade": 60, "inteligencia": 95, "forca_mordida": 30, "periculosidade": 85
  },
  {
    "id": 3, "nome": "Tricerátops", "imagem": "/assets/images/triceratops.png",
    "comprimento": 9, "peso": 10, "velocidade": 30, "inteligencia": 40, "forca_mordida": 70, "periculosidade": 75
  },
  {
    "id": 4, "nome": "Braquiossauro", "imagem": "/assets/images/brachiosaurus.png",
    "comprimento": 26, "peso": 50, "velocidade": 10, "inteligencia": 30, "forca_mordida": 60, "periculosidade": 40
  },
  // Adicione mais dinossauros aqui se desejar
];