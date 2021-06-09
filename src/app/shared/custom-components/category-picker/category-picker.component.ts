import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from '@core/db/db.service';
import { CategoryItem, CategoryItemView } from '@core/models/categories/categoryItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { first, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'mm-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit {

  public visibleCategories: ItemKeyWithData<CategoryItemView | CategoryItem>[];
  public selectedParent: ItemKeyWithData<Partial<CategoryItemView>> | undefined;
  private groupedCategories: ItemKeyWithData<CategoryItemView>[];
  private allCategories: ItemKeyWithData<CategoryItem>[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public itemKey: string | null,
    public dialogRef: MatDialogRef<CategoryPickerComponent>,
    private dbService: DbService
  ) { }

  ngOnInit(): void {
    this.dbService.getGroupedCategories().pipe(
      first(),
      tap((result) => {
        if (!result.find(item => item.key == this.itemKey))
          this.selectedParent = result.find(item => item.data.children.some(child => child.key == this.itemKey));
      }),
      shareReplay()
    ).subscribe((result) => this.visibleCategories = this.groupedCategories = result);

    this.dbService.$categories.pipe(first()).subscribe((result) => this.allCategories = result);
  }

  public onParentCategorySelect(category: ItemKeyWithData<Partial<CategoryItemView>>): void {
    if (category.data.children && category.data.children.length > 0)
      this.selectedParent = category;
    else
      this.dialogRef.close(category.key)
  }

  public filterCategories(event: any) {
    if (event.keyCode === 13 && this.visibleCategories.length === 1)
      this.dialogRef.close(this.visibleCategories[0].key) 

    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue)
      this.visibleCategories = this.allCategories.filter(category =>
        category.data.parent != null && category.data.name.toLowerCase().includes(filterValue.toLowerCase()))
    else
      this.visibleCategories = this.groupedCategories;
  }

  public onClose() {
    if (this.selectedParent) {
      this.selectedParent = undefined;
    } else {
      this.dialogRef.close()
    }
  }

}
