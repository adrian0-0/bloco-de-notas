export interface IAnnotation {
  id: number;
  name: string;
  group: IGroup;
}

export enum IGroup {
  GENERAL = "general",
  DOMESTIC = "domestic",
  ROUTINE = "routine",
  HEALTHY = "healthy",
  FINANCE = "finance",
}

export enum IGroupValue {
  "general" = "Geral",
  "domestic" = "Domestico",
  "routine" = "Rotina",
  "healthy" = "Saúde",
  "finance" = "Finanças",
}
