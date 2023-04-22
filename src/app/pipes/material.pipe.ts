import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { MaterialsEnum, translatedMaterials } from '../models/enums/materials.enum';

@Pipe({
  name: 'material',
})
export class MaterialPipe implements PipeTransform {
  public transform(materials: MaterialsEnum | MaterialsEnum[]): string {
    if (Array.isArray(materials))
      return materials.map(material => this.materialToName(material)).join(', ');

    return this.materialToName(materials);
  }

  public materialToName(material: MaterialsEnum): string {
    return translatedMaterials[material];
  }
}

@NgModule({
  declarations: [
    MaterialPipe,
  ],
  exports: [
    MaterialPipe,
  ],
})
export class MaterialPipeModule {}
