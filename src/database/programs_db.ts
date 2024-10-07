export type Program = {
  start: string;
  end: string;
  days: string[];
  name: string;
  image: string;
  description: string;
};

import Compilacao from "../../assets/programs/compilacao-clipes.png"
import Desperta from "../../assets/programs/desperta-icl.jpeg"
import ICLNoticias1 from "../../assets/programs/icl-noticias-1.jpeg"
import EmDestalhes from "../../assets/programs/em-detalhes.jpeg"
import Mercados from "../../assets/programs/icl-mercados.jpeg"
import Role from "../../assets/programs/role-icl.jpeg"
import BemMelhor from "../../assets/programs/bem-melhor.jpg"
import Petlovers from "../../assets/programs/no-image.jpg"


export const Programs = [
  {
    start: "06:30",
    end: "07:00",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    name: "Compilação Clipes",
    image: Compilacao,
    description: "Texto",
  },
  {
    start: "07:00",
    end: "08:00",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    name: "Desperta ICL",
    image: Desperta,
    description:"Texto",
  },
  {
    start: "08:00",
    end: "10:00",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    name: "ICL Notícias 1",
    image: ICLNoticias1,
    description:"Texto",
  },
  {
    start: "10:00",
    end: "11:00",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    name: "Em Destalhes",
    image: EmDestalhes,
    description:"Texto",
  },
  {
    start: "11:00",
    end: "11:30",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    name: "ICL Mercados e Investimentos",
    image: Mercados,
    description:"Texto",
  },
  {
    start: "11:30",
    end: "12:30",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    name: "Rolê ICL",
    image: Role,
    description:"Texto",
  },
  {
    start: "12:30",
    end: "13:30",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", ],
    name: "Bem Melhor",
    image: BemMelhor,
    description:"Programa de variedades voltado ao Universo da gastronomia, viagens, turismo e bem estar! Apresentado por Flávio Júnior.",
  },
  {
    start: "13:00",
    end: "14:00",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", ],
    name: "Pet Lovers Cast",
    image: BemMelhor,
    description:"",
  },
  {
    start: "14:00",
    end: "16:00",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", ],
    name: "Matinê Pop TV",
    image: BemMelhor,
    description:"",
  },
  {
    start: "16:00",
    end: "17:45",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", ],
    name: "Sessão Retrô",
    image: BemMelhor,
    description:"",
  },

];