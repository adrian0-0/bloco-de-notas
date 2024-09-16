export interface IAnnotation {
  id: string;
  name: string;
  group: IGroup;
}

export enum IGroup {
  GENERAL = "general",
  DOMESTIC = "domestic",
  ROUTINE = "routine",
  HEALTHY = "healthy",
  FINANCE = "finance",
  ALL = "all",
}

export enum IGroupValue {
  "general" = "Geral",
  "domestic" = "Domestico",
  "routine" = "Rotina",
  "healthy" = "Saúde",
  "finance" = "Finanças",
  "all" = "Todos",
}
