import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryItemView } from '@core/models/categories/categoryItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { CategoriesService } from '@shared/services/categories.service';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'mm-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit {

  public $categories: Observable<ItemKeyWithData<CategoryItemView>[]>;
  public selectedParent: ItemKeyWithData<CategoryItemView> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public itemKey: string | null,
    public dialogRef: MatDialogRef<CategoryPickerComponent>,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.$categories = this.categoriesService.getGroupedItems().pipe(
      tap((result) => {
        if (!result.find(item => item.key == this.itemKey))
          this.selectedParent = result.find(item => item.data.children.some(child => child.key == this.itemKey));
      }),
      shareReplay()
    );
  }

  public onParentCategorySelect(category: ItemKeyWithData<CategoryItemView>): void {
    if (category.data.children && category.data.children.length > 0)
      this.selectedParent = category;
    else
      this.dialogRef.close(category.key)
  }

}
