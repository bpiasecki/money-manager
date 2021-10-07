import { CategoryType } from "./categoryType.model";

export class CategoryItem {
    constructor(
        public id: number,
        public name: string,
        public parentId: number | null = null,
        public icon: string | null = 'category',
        public type: CategoryType = CategoryType.Expense,
        public isVisible: boolean = true,
        public children: CategoryItem[] = []
    ) { }
}
