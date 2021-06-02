import { ItemKeyWithData } from "../itemKeyWithData.model";
import { CategoryType } from "./categoryType.model";

export class CategoryItem {
    constructor(
        public name: string,
        public parent: string | null = null,
        public icon: string | null = 'category',
        public type: CategoryType = CategoryType.Expense,
        public isVisible: boolean = true,
    ) { }
}

export class CategoryItemView extends CategoryItem {
    children: ItemKeyWithData<CategoryItem>[];
}