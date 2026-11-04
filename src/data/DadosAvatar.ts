import avatar01 from "../assets/avatar_01.png";
import avatar02 from "../assets/avatar_02.png";
import avatar03 from "../assets/avatar_03.png";
import avatar04 from "../assets//avatar_04.png";
import avatar05 from "../assets/avatar_05.png";
import avatar06 from "../assets/avatar_06.png";
import avatar07 from "../assets/avatar_07.png";
import avatar08 from "../assets/avatar_08.png";
import avatar09 from "../assets/avatar_09.png";
import avatar10 from "../assets/avatar_10.png";
import avatar11 from "../assets/avatar_11.png";
import avatar12 from "../assets/avatar_12.png";
import type { TipoAvatar, TipoNivel } from "../types/TipoAvatar";
export const avatares: TipoAvatar[] = [
  {
    id: 1,
    nome: "Eco",
    imagem: avatar01,
    pontos: 0,
    descricao: "O visual original do Soul.",
  },
  {
    id: 2,
    nome: "Pink",
    imagem: avatar02,
    pontos: 100,
    descricao: "Um visual leve e divertido.",
  },
  {
    id: 3,
    nome: "Street",
    imagem: avatar03,
    pontos: 150,
    descricao: "Estilo urbano e moderno.",
  },
  {
    id: 4,
    nome: "Cyber",
    imagem: avatar04,
    pontos: 200,
    descricao: "Tecnologia em outro nível.",
  },
  {
    id: 5,
    nome: "Explorer",
    imagem: avatar05,
    pontos: 250,
    descricao: "Pronto para novas aventuras.",
  },
  {
    id: 6,
    nome: "Galaxy",
    imagem: avatar06,
    pontos: 300,
    descricao: "Um visual inspirado no espaço.",
  },
  {
    id: 7,
    nome: "Dark",
    imagem: avatar07,
    pontos: 350,
    descricao: "Para quem gosta de um estilo mais sombrio.",
  },
  {
    id: 8,
    nome: "Gamer",
    imagem: avatar08,
    pontos: 400,
    descricao: "Seu companheiro gamer.",
  },
  {
    id: 9,
    nome: "Astronaut",
    imagem: avatar09,
    pontos: 450,
    descricao: "Explorando além dos limites.",
  },
  {
    id: 10,
    nome: "Classic",
    imagem: avatar10,
    pontos: 500,
    descricao: "Clássico nunca sai de moda.",
  },
  {
    id: 11,
    nome: "Winter",
    imagem: avatar11,
    pontos: 600,
    descricao: "Um visual aconchegante.",
  },
  {
    id: 12,
    nome: "Legend",
    imagem: avatar12,
    pontos: 700,
    descricao: "Um visual para quem chegou longe.",
  },
];

export const niveis: TipoNivel[] = [
  { nome: "Iniciante", min: 0 },
  { nome: "Explorador", min: 200 },
  { nome: "Pro", min: 400 },
  { nome: "Mestre", min: 600 },
];