export interface User {
  name: string;
  email: string;
  company: string;
  id: string;
}

export interface Project {
  idea: string;
  client: string;
  effort: "baixo" | "medio" | "alto";
  benefitRating: "baixo" | "medio" | "alto";
  alignment: number;
  bennefitType:
    | "Eficiência operacional"
    | "Melhoria em comunicação"
    | "Aperfeiçoamento de produtos"
    | "Melhora na Logística"
    | "Aumento de valor agregado (preço)"
    | "Aumento de vendas"
    | "Melhora no serviço ao cliente";
  needInvestment: boolean | null;
  original: boolean;
  newIdea: boolean;
  willBeDeveloped: boolean;
  id: string;
  user: User;
}
