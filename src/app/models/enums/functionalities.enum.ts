export enum FunctionalitiesEnum {
  SUSTENTABILITY = 1,
  AMBIENT = 2,
}

export const translatedFunctionabilities: Record<FunctionalitiesEnum, string> = {
  [FunctionalitiesEnum.AMBIENT]: 'Meio Ambiente',
  [FunctionalitiesEnum.SUSTENTABILITY]: 'Sustentabilidade',
}
