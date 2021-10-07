import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from '@core/db/db.service';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { first, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'mm-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit {

  public visibleCategories: CategoryItem[];
  public selectedParent: Partial<CategoryItem> | undefined;
  private groupedCategories: CategoryItem[];
  private allCategories: CategoryItem[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public itemKey: number | null,
    public dialogRef: MatDialogRef<CategoryPickerComponent>,
    private dbService: DbService
  ) { }

  ngOnInit(): void {
    this.dbService.$categories.pipe(
      first(),
      tap((result) => {
        if (!result.find(item => item.id == this.itemKey))
          this.selectedParent = result.find(item => item.children.some(child => child.id == this.itemKey));
      }),
      shareReplay()
    ).subscribe((result) => this.visibleCategories = this.groupedCategories = result);

    this.dbService.$categories.pipe(first()).subscribe((result) => this.allCategories = result);
  }

  public onParentCategorySelect(category: Partial<CategoryItem>): void {
    if (category.children && category.children.length > 0)
      this.selectedParent = category;
    else
      this.dialogRef.close(category.id)
  }

  public filterCategories(event: any) {
    if (event.keyCode === 13 && this.visibleCategories.length === 1)
      this.dialogRef.close(this.visibleCategories[0].id) 

    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue)
      this.visibleCategories = this.allCategories.filter(category =>
        category.parentId != null && category.name.toLowerCase().includes(filterValue.toLowerCase()))
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
