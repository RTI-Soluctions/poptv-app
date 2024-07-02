export interface IContact {
    department: string;
    name: string;
    phone: string;
    email: string;
  }

export const contacts: IContact[] = [
    {
      department: 'Atendimento ao Espectador',
      name: 'Ana Ribeiro',
      phone: '(41) 5555-1234',
      email: 'atendimento@pop.tv.br',
    },
    // {
    //   department: 'Programação',
    //   name: 'Carlos Silva',
    //   phone: '(41) 5555-5678',
    //   email: 'programacao@pop.tv.br',
    // },
    // {
    //   department: 'Marketing e Publicidade',
    //   name: 'Mariana Oliveira',
    //   phone: '(41) 5555-8765',
    //   email: 'marketing@pop.tv.br',
    // },
    // {
    //   department: 'Jornalismo',
    //   name: 'João Santos',
    //   phone: '(41) 5555-4321',
    //   email: 'jornalismo@pop.tv.br',
    // },
    // {
    //   department: 'Relações Públicas',
    //   name: 'Beatriz Almeida',
    //   phone: '(41) 5555-0987',
    //   email: 'relacoespublicas@pop.tv.br',
    // },
  ];