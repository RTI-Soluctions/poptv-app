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
import Petlovers from "../../assets/programs/pet-lovers-cast.png"
import ICLNoticiasNoite from "../../assets/programs/icl-noticias.jpg"
import ChicoEntrevista from "../../assets/programs/chico-entrevista.png"
import Matine from "../../assets/programs/matine-pop-tv.png"
import SessaoRetro from "../../assets/programs/sessao-retro.png"
import ManhaCrianca from "../../assets/programs/manha-crianca.png"
import PrimeiraSessao from "../../assets/programs/primeira-sessao.png"
import FestSeries from "../../assets/programs/fest-series.png"
import Espiritualidade from "../../assets/programs/espiritualidade.png"
import Provocacao from "../../assets/programs/provocacao.png"
import ScoobyDoo from "../../assets/programs/hora-do-scoobydoo.png"



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
    image: Petlovers,
    description:"",
  },
  {
    start: "14:00",
    end: "16:00",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab" ],
    name: "Matinê Pop TV",
    image: Matine,
    description:"Melhores Filmes que marcaram época, grandes clássicos do cinema, comédias, aventuras, musicais, romances e muito mais!",
  },
  {
    start: "16:00",
    end: "17:30",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", ],
    name: "Sessão Retrô",
    image: SessaoRetro,
    description:"A Sessão Retrô é uma faixa que apresenta séries atuais e clássicas que marcaram época na TV.",
  },
  {
    start: "18:00",
    end: "19:30",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    name: "ICL Notícias Noite",
    image: ICLNoticiasNoite,
    description:"Texto",
  },
  {
    start: "20:00",
    end: "21:00",
    days: ["Seg"],
    name: "Chico Pinheiro Entrevista",
    image: ChicoEntrevista,
    description:"Texto",
  },
  {
    start: "19:30",
    end: "20:00",
    days: ["Ter"],
    name: "Espiritualidade Na Ação",
    image: Espiritualidade,
    description:"Texto",
  },
  {
    start: "19:30",
    end: "20:30",
    days: ["Qua"],
    name: "Provocação Histórica",
    image: Provocacao,
    description:"Texto",
  },
  {
    start: "08:00",
    end: "10:30",
    days: ["Sab"],
    name: "Manhã Criança",
    image: ManhaCrianca,
    description:"Texto",
  },
  {
    start: "06:00",
    end: "06:30",
    days: ["Ter", "Sex"],
    name: "Hora do Scooby-Doo",
    image: ScoobyDoo,
    description:"Texto",
  },
  {
    start: "10:30",
    end: "12:00",
    days: ["Sab"],
    name: "Cinema - Primeira Sessão",
    image: PrimeiraSessao,
    description:"Texto",
  },
  {
    start: "18:00",
    end: "20:45",
    days: ["Sab", "Dom"],
    name: "Fest Series",
    image: FestSeries,
    description:"Texto",
  },

];