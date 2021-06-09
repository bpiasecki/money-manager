import { Pipe, PipeTransform } from '@angular/core';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';

@Pipe({ name: 'categoryName' })
export class CategoryNamePipe implements PipeTransform {

    transform(categoryKey: string, categories: ItemKeyWithData<CategoryItem>[]): string {
        const category = categories.find(item => item.key === categoryKey)?.data;
        const categoryParent = categories.find(item => item.key === category?.parent)?.data;
        return `${categoryParent ? categoryParent.name + ' - ' : ''}${category?.name ?? "Brak kategorii"}`;
    }
}