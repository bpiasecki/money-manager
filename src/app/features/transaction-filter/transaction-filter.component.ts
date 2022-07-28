import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { FilterType, TransactionFilterItem } from '@core/models/transactions/transactionFilterItem.model';
import { TransactionTypeViewItem } from '@core/models/transactions/transactionType.model';

@Component({
  selector: 'mm-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent implements OnInit {

  public FilterTypes = FilterType;

  public nameValue: string;

  public startDate: Date;
  public endDate: Date;

  public startValue: number;
  public endValue: number;

  public allCategories: any[];
  public visibleCategories: any[];
  public categoriesParents: any[];

  public allChecked: boolean;
  private filterValue: string;

  constructor(@Inject(MAT_DIALOG_DATA) public filterItem: TransactionFilterItem, public dialogRef: MatDialogRef<TransactionFilterComponent>) { }

  ngOnInit(): void {

    if (this.filterItem.filterFn !== undefined) {
      switch (this.filterItem.type) {
        case FilterType.Date:
          this.startDate = this.filterItem.value;
          this.endDate = this.filterItem.addictionalValue;
          break;
        case FilterType.TransactionValue:
          this.startValue = this.filterItem.value;
          this.endValue = this.filterItem.addictionalValue;
          break
        case FilterType.Name:
          this.nameValue = this.filterItem.value;
          break
        default:
          break;
      }
    }

    if (this.filterItem.listItems && this.filterItem.type == FilterType.Category) {
      this.categoriesParents = this.filterItem.listItems.filter(item => !item?.parentId)
      this.visibleCategories = [].concat(...this.filterItem.listItems.map(item => item.children));
      this.allCategories = [...this.visibleCategories];
      this.updateAllChecked();
    }

    if (this.filterItem.listItems && this.filterItem.filterFn === undefined)
      this.setAll(true)
  }

  public filterItems(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    if (filterValue)
      this.visibleCategories = [...this.allCategories.filter(category => {
        const parentName = this.categoriesParents.find(item => item.id == category.parentId)?.name;
        const nameToFilter = parentName + ' - ' + category.name;
        return nameToFilter.toLowerCase().includes(filterValue.toLowerCase());
      })]
    else
      this.visibleCategories = [...this.allCategories];
  }

  public onCategoryChange(listItem: any) {
    const foundItem = this.filterItem.listItems?.find(item => item.id == listItem.id);
    if (foundItem)
      foundItem.checked = listItem.checked;
  }

  public updateAllChecked() {
    this.allChecked = this.filterItem.listItems != null && 
      (this.filterItem.listItems.every(t => t.checked) || (this.visibleCategories && this.visibleCategories.every(t => t.checked)));
  }

  public someComplete(): boolean {
    if (this.filterItem.listItems == null)
      return false;

    return this.filterItem.listItems.filter(t => t.checked).length > 0 && !this.allChecked;
  }

  public setAll(checked: boolean) {
    this.allChecked = checked;
    if (this.visibleCategories)
      this.visibleCategories.forEach(t => t.checked = checked);
    else
      this.filterItem.listItems?.forEach(t => t.checked = checked)
    
    this.updateAllChecked()
  }

  public applyFilter() {
    switch (this.filterItem.type) {
      case FilterType.TransactionType:
        this.setFilterForTransactionType();

        break;
      case FilterType.Account:
        this.setFilterForAccount();
        break;

      case FilterType.Date:
        this.setFilterForDate();
        break;

      case FilterType.TransactionValue:
        this.setFilterForTransactionValue();
        break;
      case FilterType.Name:
        this.setFilterForName();
        break;
      case FilterType.Category:
        this.setFilterForCategory();
        break;
      default:
        break;
    }

    this.dialogRef.close(this.filterItem)
  }

  private setFilterForTransactionType() {
    const checkedTypeItems = this.filterItem.listItems?.filter(s => s.checked) ?? [];
    this.filterItem.value = checkedTypeItems;
    this.filterItem.visibleName = `${this.filterItem.name} = ${checkedTypeItems.length === 0 ? 'brak' : checkedTypeItems?.map(s => s.name)?.join(', ')}`;
    this.filterItem.filterFn = (item, items: TransactionTypeViewItem[] | undefined) => items ? items.map(s => s.type).includes(item.type) : true;
  }

  private setFilterForAccount() {
    const checkedAccounts: WalletItem[] = this.filterItem.listItems?.filter(s => s.checked) ?? [];
    this.filterItem.value = checkedAccounts;
    this.filterItem.visibleName = `${this.filterItem.name} = ${checkedAccounts.length === 0 ? 'brak' : checkedAccounts?.map(s => s.name)?.join(', ')}`;
    this.filterItem.filterFn = (item, accounts: WalletItem[] | undefined) => {
      if (accounts) {
        const accountsKeys = accounts.map(item => item.id);
        if (item.sourceAccountId && item.targetAccountId)
          return accountsKeys.includes(item.sourceAccountId) || accountsKeys.includes(item.targetAccountId)
        else if (item.sourceAccountId)
          return accountsKeys.includes(item.sourceAccountId)
        else if (item.targetAccountId)
          return accountsKeys.includes(item.targetAccountId)
        else return true;
      } else return true;
    }
  }

  private setFilterForDate() {
    const datePipe = new DatePipe('pl');
    this.filterItem.value = this.startDate;
    this.filterItem.addictionalValue = this.endDate;
    this.filterItem.visibleName = `${this.filterItem.name}${!this.startDate && !this.endDate ? ' brak' : this.startDate ? ' od ' + datePipe.transform(this.startDate) : ''}${this.endDate ? ' do ' + datePipe.transform(this.endDate) : ''}`;
    this.filterItem.filterFn = (item, startDate: Date | undefined, endDate: Date | undefined) => {
      const transactionDateTime = new Date(item.transactionDate).getTime();
      if (startDate && endDate)
        return transactionDateTime >= startDate.getTime() && transactionDateTime <= endDate.getTime();
      else if (startDate)
        return transactionDateTime >= startDate.getTime()
      else if (endDate)
        return transactionDateTime <= endDate.getTime();
      else return true;
    }
  }

  private setFilterForTransactionValue() {
    const currencyPipe = new CurrencyPipe('pl', 'PLN');
    this.filterItem.value = this.startValue;
    this.filterItem.addictionalValue = this.endValue;
    this.filterItem.visibleName = `${this.filterItem.name}${this.startValue == null && this.endValue == null ? ' brak' : this.startValue != null ? ' od ' + currencyPipe.transform(this.startValue) : ''}${this.endValue != null ? ' do ' + currencyPipe.transform(this.endValue) : ''}`;
    this.filterItem.filterFn = (item, startValue: number | undefined, endValue: number | undefined) => {
      if (startValue !== undefined && endValue !== undefined)
        return item.value >= startValue && item.value <= endValue;
      else if (startValue)
        return item.value >= startValue;
      else if (endValue)
        return item.value <= endValue;
      else return true;
    }
  }

  private setFilterForName() {
    this.filterItem.value = this.nameValue;
    this.filterItem.visibleName = `${this.filterItem.name} ~ ${this.nameValue ?? 'brak'}`;
    this.filterItem.filterFn = (item, result: string | undefined) => result ? item.name.includes(result) : true;
  }

  private setFilterForCategory() {
    let checkedCategories: CategoryItem[];
    if (this.filterValue) {
      checkedCategories = this.visibleCategories.filter(s => s.checked) ?? [];
      const checkedKeys = checkedCategories.map(s => s.id);
      this.filterItem.listItems?.forEach(item => item.checked = checkedKeys.includes(item.key))
    }
    else
      checkedCategories = [].concat(...(this.filterItem.listItems ?? []).map((item: any) => item.children)).filter((s: any) => s.checked) ?? [];

    this.filterItem.value = checkedCategories;
    this.filterItem.visibleName = `${this.filterItem.name} = ${checkedCategories.length === 0 ? 'brak' : checkedCategories.length < 4 ? checkedCategories.map(s => s.name)?.join(', ') : '[' + checkedCategories.length + ']'}`;
    this.filterItem.filterFn = (item, categories: CategoryItem[] | undefined) => {
      if (categories)
        return categories.map((item: any) => item.id).includes(item.categoryId);
      else return true;
    }
  }

}
