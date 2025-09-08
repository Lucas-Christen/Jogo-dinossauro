// src/data/dinosaurs.ts

import type { Dinosaur } from '../types/dinosaur';

// O baralho foi expandido para 32 dinossauros.
// Atributos "periculosidade" foi trocado por "defesa".
// Novo atributo "anos" foi adicionado (em milhões de anos atrás).
export const DINOSAURS_DATA: Dinosaur[] = [
  // Clássicos
  {
    "id": 1, "nome": "Tiranossauro Rex", "imagem": "/assets/images/t-rex.png",
    "comprimento": 13.5, "peso": 9.0, "velocidade": 27, "inteligencia": 85, "forca_mordida": 95, "defesa": 70, "anos": 68
  },
  {
    "id": 2, "nome": "Velociraptor", "imagem": "/assets/images/velociraptor.png",
    "comprimento": 3, "peso": 0.15, "velocidade": 60, "inteligencia": 95, "forca_mordida": 30, "defesa": 20, "anos": 75
  },
  {
    "id": 3, "nome": "Tricerátops", "imagem": "/assets/images/triceratops.png",
    "comprimento": 9, "peso": 10, "velocidade": 30, "inteligencia": 40, "forca_mordida": 70, "defesa": 90, "anos": 68
  },
  {
    "id": 4, "nome": "Braquiossauro", "imagem": "/assets/images/brachiosaurus.png",
    "comprimento": 26, "peso": 50, "velocidade": 10, "inteligencia": 30, "forca_mordida": 60, "defesa": 40, "anos": 154
  },
  {
    "id": 5, "nome": "Espinossauro", "imagem": "/assets/images/spinosaurus.png",
    "comprimento": 18, "peso": 8, "velocidade": 25, "inteligencia": 88, "forca_mordida": 90, "defesa": 65, "anos": 99
  },
  {
    "id": 6, "nome": "Pteranodonte", "imagem": "/assets/images/pteranodon.png",
    "comprimento": 6, "peso": 0.05, "velocidade": 80, "inteligencia": 60, "forca_mordida": 25, "defesa": 15, "anos": 85
  },
  {
    "id": 7, "nome": "Anquilossauro", "imagem": "/assets/images/ankylosaurus.png",
    "comprimento": 8, "peso": 7, "velocidade": 12, "inteligencia": 35, "forca_mordida": 65, "defesa": 100, "anos": 68
  },
  {
    "id": 8, "nome": "Stegosaurus", "imagem": "/assets/images/stegosaurus.png",
    "comprimento": 9, "peso": 5, "velocidade": 15, "inteligencia": 25, "forca_mordida": 50, "defesa": 85, "anos": 150
  },
  {
    "id": 9, "nome": "Dilofossauro", "imagem": "/assets/images/dilophosaurus.png",
    "comprimento": 7, "peso": 0.4, "velocidade": 45, "inteligencia": 70, "forca_mordida": 40, "defesa": 25, "anos": 193
  },
  {
    "id": 10, "nome": "Gallimimus", "imagem": "/assets/images/gallimimus.png",
    "comprimento": 6, "peso": 0.45, "velocidade": 70, "inteligencia": 50, "forca_mordida": 10, "defesa": 10, "anos": 70
  },
  {
    "id": 11, "nome": "Compsognato", "imagem": "/assets/images/compsognathus.png",
    "comprimento": 1, "peso": 0.003, "velocidade": 64, "inteligencia": 65, "forca_mordida": 5, "defesa": 5, "anos": 150
  },
  {
    "id": 12, "nome": "Parasaurolophus", "imagem": "/assets/images/parasaurolophus.png",
    "comprimento": 10, "peso": 4, "velocidade": 40, "inteligencia": 45, "forca_mordida": 35, "defesa": 30, "anos": 75
  },
  // Jurassic World
  {
    "id": 13, "nome": "Indominus Rex", "imagem": "/assets/images/indominus-rex.png",
    "comprimento": 15, "peso": 10, "velocidade": 50, "inteligencia": 98, "forca_mordida": 100, "defesa": 80, "anos": 1
  },
  {
    "id": 14, "nome": "Mosasaurus", "imagem": "/assets/images/mosasaurus.png",
    "comprimento": 17, "peso": 15, "velocidade": 40, "inteligencia": 75, "forca_mordida": 97, "defesa": 50, "anos": 70
  },
  {
    "id": 15, "nome": "Apatossauro", "imagem": "/assets/images/apatosaurus.png",
    "comprimento": 23, "peso": 20, "velocidade": 20, "inteligencia": 28, "forca_mordida": 45, "defesa": 45, "anos": 152
  },
  // Fallen Kingdom
  {
    "id": 16, "nome": "Indoraptor", "imagem": "/assets/images/indoraptor.png",
    "comprimento": 7, "peso": 1.1, "velocidade": 65, "inteligencia": 99, "forca_mordida": 88, "defesa": 60, "anos": 1
  },
  {
    "id": 17, "nome": "Carnotaurus", "imagem": "/assets/images/carnotaurus.png",
    "comprimento": 8.5, "peso": 2, "velocidade": 55, "inteligencia": 68, "forca_mordida": 78, "defesa": 55, "anos": 71
  },
  {
    "id": 18, "nome": "Allosaurus", "imagem": "/assets/images/allosaurus.png",
    "comprimento": 12, "peso": 4, "velocidade": 35, "inteligencia": 72, "forca_mordida": 85, "defesa": 60, "anos": 155
  },
  {
    "id": 19, "nome": "Baryonyx", "imagem": "/assets/images/baryonyx.png",
    "comprimento": 9, "peso": 1.8, "velocidade": 38, "inteligencia": 70, "forca_mordida": 75, "defesa": 40, "anos": 130
  },
  {
    "id": 20, "nome": "Stygimoloch", "imagem": "/assets/images/stygimoloch.png",
    "comprimento": 3, "peso": 0.08, "velocidade": 35, "inteligencia": 55, "forca_mordida": 30, "defesa": 75, "anos": 66
  },
  {
    "id": 21, "nome": "Sinoceratops", "imagem": "/assets/images/sinoceratops.png",
    "comprimento": 6, "peso": 2.5, "velocidade": 28, "inteligencia": 38, "forca_mordida": 68, "defesa": 88, "anos": 70
  },
  // Dominion
  {
    "id": 22, "nome": "Giganotosaurus", "imagem": "/assets/images/giganotosaurus.png",
    "comprimento": 14, "peso": 8.5, "velocidade": 40, "inteligencia": 80, "forca_mordida": 98, "defesa": 75, "anos": 98
  },
  {
    "id": 23, "nome": "Therizinosaurus", "imagem": "/assets/images/therizinosaurus.png",
    "comprimento": 10, "peso": 5, "velocidade": 25, "inteligencia": 65, "forca_mordida": 80, "defesa": 85, "anos": 70
  },
  {
    "id": 24, "nome": "Quetzalcoatlus", "imagem": "/assets/images/quetzalcoatlus.png",
    "comprimento": 11, "peso": 0.2, "velocidade": 90, "inteligencia": 78, "forca_mordida": 60, "defesa": 20, "anos": 68
  },
  {
    "id": 25, "nome": "Pyroraptor", "imagem": "/assets/images/pyroraptor.png",
    "comprimento": 2.5, "peso": 0.03, "velocidade": 58, "inteligencia": 90, "forca_mordida": 28, "defesa": 18, "anos": 70
  },
  {
    "id": 26, "nome": "Atrociraptor", "imagem": "/assets/images/atrociraptor.png",
    "comprimento": 2, "peso": 0.02, "velocidade": 62, "inteligencia": 92, "forca_mordida": 32, "defesa": 22, "anos": 70
  },
  {
    "id": 27, "nome": "Nasutoceratops", "imagem": "/assets/images/nasutoceratops.png",
    "comprimento": 5, "peso": 1.5, "velocidade": 26, "inteligencia": 36, "forca_mordida": 66, "defesa": 86, "anos": 76
  },
  {
    "id": 28, "nome": "Moros Intrepidus", "imagem": "/assets/images/moros-intrepidus.png",
    "comprimento": 1.2, "peso": 0.01, "velocidade": 68, "inteligencia": 82, "forca_mordida": 15, "defesa": 10, "anos": 96
  },
  {
    "id": 29, "nome": "Dimetrodon", "imagem": "/assets/images/dimetrodon.png",
    "comprimento": 3.5, "peso": 0.25, "velocidade": 22, "inteligencia": 33, "forca_mordida": 55, "defesa": 35, "anos": 280
  },
  {
    "id": 30, "nome": "Dreadnoughtus", "imagem": "/assets/images/dreadnoughtus.png",
    "comprimento": 26, "peso": 60, "velocidade": 8, "inteligencia": 29, "forca_mordida": 62, "defesa": 55, "anos": 77
  },
  {
    "id": 31, "nome": "Iguanodon", "imagem": "/assets/images/iguanodon.png",
    "comprimento": 10, "peso": 3.5, "velocidade": 30, "inteligencia": 42, "forca_mordida": 40, "defesa": 48, "anos": 125
  },
  {
    "id": 32, "nome": "Pachycephalosaurus", "imagem": "/assets/images/pachycephalosaurus.png",
    "comprimento": 4.5, "peso": 0.45, "velocidade": 24, "inteligencia": 52, "forca_mordida": 34, "defesa": 80, "anos": 70
  }
];