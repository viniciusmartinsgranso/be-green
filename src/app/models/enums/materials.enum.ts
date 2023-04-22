export enum MaterialsEnum {
  GLASS = 1,
  PLASTIC = 2,
  PAPER = 3,
  CARDBOARD = 4,
  METAL = 5,
  WOOD = 6,
  ORGANICS = 7,
}

export const translatedMaterials: Record<MaterialsEnum, string> = {
  [MaterialsEnum.GLASS]: 'Vidro',
  [MaterialsEnum.PLASTIC]: 'Plástico',
  [MaterialsEnum.PAPER]: 'Papel',
  [MaterialsEnum.CARDBOARD]: 'Papelão',
  [MaterialsEnum.METAL]: 'Metal',
  [MaterialsEnum.WOOD]: 'Madeira',
  [MaterialsEnum.ORGANICS]: 'Organicos',
}
