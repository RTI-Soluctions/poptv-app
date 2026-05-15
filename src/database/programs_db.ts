export type Program = {
  start: string;
  end: string;
  days: number[];
  name: string;
  image: string;
  description: string;
};

import Compilacao from "../../assets/programs/compilacao-clipes.png"
import Desperta from "../../assets/programs/desperta-icl.png"
import ICLNoticias1 from "../../assets/programs/icl-noticias-1.png"
import EmDetalhes from "../../assets/programs/em-detalhes.png"
import Mercados from "../../assets/programs/icl-mercados.png"
import SessaoRetro from "../../assets/programs/sessao-retro.png"
import ManhaCrianca from "../../assets/programs/manha-crianca.png"
import PrimeiraSessao from "../../assets/programs/primeira-sessao.png"
import FestSeries from "../../assets/programs/fest-series.png"
import ScoobyDoo from "../../assets/programs/hora-do-scoobydoo.png"
import DaOPlay from "../../assets/programs/da-o-play.png"
import RaioX from "../../assets/programs/raiox.png"
import RondaPopular from "../../assets/programs/ronda-popular.png"
import ElaEOElo from "../../assets/programs/ela-e-o-elo.png"
import LuauBandas from "../../assets/programs/luau-bandas.png"
import XequeMate from "../../assets/programs/xeque-mate.png"
import CineTche from "../../assets/programs/cinetche.png"
import RapInCena from "../../assets/programs/rapincena-.png"



export const Programs = [
  {
    start: "12:00",
    end: "13:00",
    days: [1, 2, 3, 4, 5],
    name: "Raio X",
    image: RaioX,
    description: "Texto",
  },
  {
    start: "20:00",
    end: "22:00",
    days: [1, 2, 3, 4, 5],
    name: "Ronda Popular",
    image: RondaPopular,
    description: "Texto",
  },
  {
    start: "22:00",
    end: "23:00",
    days: [1],
    name: "Ela é o Elo",
    image: ElaEOElo,
    description: "Texto",
  },
  {
    start: "22:00",
    end: "23:00",
    days: [2],
    name: "Xeque Mate",
    image: XequeMate,
    description: "Texto",
  },
  {
    start: "21:00",
    end: "22:00",
    days: [4],
    name: "Dá o Play",
    image: DaOPlay,
    description: "Texto",
  },
  {
    start: "21:00",
    end: "22:00",
    days: [7],
    name: "Luau Acústico ",
    image: LuauBandas,
    description: "Texto",
  },
  {
    start: "22:00",
    end: "23:30",
    days: [3],
    name: "Cine Tchê",
    image: CineTche,
    description: "Texto",
  },
  {
    start: "22:00",
    end: "23:00",
    days: [7],
    name: "Rap in Cena",
    image: RapInCena,
    description: "Texto",
  },
  {
    start: "07:00",
    end: "08:00",
    days: [1, 2, 3, 4, 5],
    name: "Desperta ICL",
    image: Desperta,
    description: "Texto",
  },
  {
    start: "08:00",
    end: "10:00",
    days: [1, 2, 3, 4, 5],
    name: "ICL Notícias 1",
    image: ICLNoticias1,
    description: "Texto",
  },
  {
    start: "10:00",
    end: "11:00",
    days: [1, 2, 3, 4, 5],
    name: "Em Detalhes",
    image: EmDetalhes,
    description: "Texto",
  },
  {
    start: "11:00",
    end: "11:30",
    days: [1, 2, 3, 4, 5],
    name: "ICL Mercados e Investimentos",
    image: Mercados,
    description: "Texto",
  },
  {
    start: "16:00",
    end: "17:30",
    days: [1, 2, 3, 4, 5, 6],
    name: "Sessão Retrô",
    image: SessaoRetro,
    description: "A Sessão Retrô é uma faixa que apresenta séries atuais e clássicas que marcaram época na TV.",
  },
  {
    start: "08:00",
    end: "10:30",
    days: [6],
    name: "Manhã Criança",
    image: ManhaCrianca,
    description: "Texto",
  },
  {
    start: "06:00",
    end: "06:30",
    days: [2, 5],
    name: "Hora do Scooby-Doo",
    image: ScoobyDoo,
    description: "Texto",
  },
  {
    start: "10:30",
    end: "12:00",
    days: [6],
    name: "Cinema - Primeira Sessão",
    image: PrimeiraSessao,
    description: "Texto",
  },
  {
    start: "18:00",
    end: "20:45",
    days: [6, 7],
    name: "Fest Series",
    image: FestSeries,
    description: "Texto",
  },
  {
    start: "06:30",
    end: "07:00",
    days: [1, 2, 3, 4, 5],
    name: "Compilação Clipes",
    image: Compilacao,
    description: "Texto",
  },
];