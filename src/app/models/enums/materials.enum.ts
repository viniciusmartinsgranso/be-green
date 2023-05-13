export enum MaterialsEnum {
  GLASS = 1,
  PLASTIC = 2,
  PAPER = 3,
  CARDBOARD = 4,
  ORGANICS = 5,
  ALUMINIUM = 6,
  COPPER = 7,
  IRON = 8,
  STEEL = 9,
  OIL = 10,
  OTHER_METALS = 11,
}

export const translatedMaterials: Record<MaterialsEnum, string> = {
  [MaterialsEnum.GLASS]: 'Vidro',
  [MaterialsEnum.PLASTIC]: 'Plástico',
  [MaterialsEnum.PAPER]: 'Papel',
  [MaterialsEnum.CARDBOARD]: 'Papelão',
  [MaterialsEnum.ORGANICS]: 'Organicos',
  [MaterialsEnum.ALUMINIUM]: 'Alumínio',
  [MaterialsEnum.COPPER]: 'Cobre',
  [MaterialsEnum.IRON]: 'Ferro',
  [MaterialsEnum.STEEL]: 'Aço',
  [MaterialsEnum.OIL]: 'Óleo',
  [MaterialsEnum.OTHER_METALS]: 'Outros Metais',
}
