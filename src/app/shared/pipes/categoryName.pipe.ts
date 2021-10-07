import { Pipe, PipeTransform } from '@angular/core';
import { CategoryItem } from '@core/models/categories/categoryItem.model';

@Pipe({ name: 'categoryName' })
export class CategoryNamePipe implements PipeTransform {

    transform(categoryId: number, categories: CategoryItem[]): string {
        let result = '';
        let foundItem = categories.find(item => item.id === categoryId);
        if (!foundItem) {
            categories.forEach(item => {
                let foundChild = item.children.find(child => child.id === categoryId);
                if (foundChild) {
                    const parent = categories.find(it => it.id === foundChild?.parentId)
                    result = `${parent?.name} - ${foundChild.name}`;
                    return;
                }
            })

        } else
            result = foundItem.name;

        return result ?? "Brak kategorii";
    }
}