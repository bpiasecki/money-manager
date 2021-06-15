import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
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

  constructor(@Inject(MAT_DIALOG_DATA) public filterItem: TransactionFilterItem, public dialogRef: MatDialogRef<TransactionFilterComponent>) { }

  ngOnInit(): void {
    if (this.filterItem.listItems && this.filterItem.filterFn === undefined)
      this.setAll(true)

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

    if (this.filterItem.listItems) {
      this.categoriesParents = this.filterItem.listItems.filter(item => !item.data.parent)
      this.allCategories = [...this.filterItem.listItems.filter(item => item.data.parent)];
      this.visibleCategories = this.filterItem.listItems.filter(item => item.data.parent);
    }
  }

  public filterItems(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue)
      this.visibleCategories = this.allCategories.filter(category => {
        const parentName = this.categoriesParents.find(item => item.key == category.data.parent)?.data?.name;
        const nameToFilter = parentName + ' - ' + category.data.name;
        return nameToFilter.toLowerCase().includes(filterValue.toLowerCase());
      })
    else
      this.visibleCategories = this.allCategories;
  }

  public onCategoryChange(listItem: any) {
    const foundItem = this.filterItem.listItems?.find(item => item.key == listItem.key);
    if (foundItem)
      foundItem.checked = listItem.checked;
  }

  public updateAllChecked() {
    this.allChecked = this.filterItem.listItems != null && this.filterItem.listItems.every(t => t.checked);
  }

  public someComplete(): boolean {
    if (this.filterItem.listItems == null)
      return false;

    return this.filterItem.listItems.filter(t => t.checked).length > 0 && !this.allChecked;
  }

  public setAll(checked: boolean) {
    this.allChecked = checked;
    if (this.filterItem.listItems == null) {
      return;
    }
    this.filterItem.listItems.forEach(t => t.checked = checked);
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
    const checkedTypeItems = this.filterItem.listItems?.filter(s => s.checked);
    this.filterItem.value = checkedTypeItems;
    this.filterItem.visibleName = `${this.filterItem.name} = ${checkedTypeItems?.map(s => s.name)?.join(', ')}`;
    this.filterItem.filterFn = (item, items: TransactionTypeViewItem[] | undefined) => items ? items.map(s => s.type).includes(item.type) : true;
  }

  private setFilterForAccount() {
    const checkedAccounts: ItemKeyWithData<WalletItem>[] | undefined = this.filterItem.listItems?.filter(s => s.checked);
    this.filterItem.value = checkedAccounts;
    this.filterItem.visibleName = `${this.filterItem.name} = ${checkedAccounts?.map(s => s.data.name)?.join(', ')}`;
    this.filterItem.filterFn = (item, accounts: ItemKeyWithData<WalletItem>[] | undefined) => {
      if (accounts) {
        const accountsKeys = accounts.map(item => item.key);
        if (item.sourceAccount && item.targetAccount)
          return accountsKeys.includes(item.sourceAccount) || accountsKeys.includes(item.targetAccount)
        else if (item.sourceAccount)
          return accountsKeys.includes(item.sourceAccount)
        else if (item.targetAccount)
          return accountsKeys.includes(item.targetAccount)
        else return true;
      } else return true;
    }
  }

  private setFilterForDate() {
    const datePipe = new DatePipe('pl');
    this.filterItem.value = this.startDate;
    this.filterItem.addictionalValue = this.endDate;
    this.filterItem.visibleName = `${this.filterItem.name}${this.startDate ? ' od ' + datePipe.transform(this.startDate) : ''}${this.endDate ? ' do ' + datePipe.transform(this.endDate) : ''}`;
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
    this.filterItem.visibleName = `${this.filterItem.name}${this.startValue ? ' od ' + currencyPipe.transform(this.startValue) : ''}${this.endValue ? ' do ' + currencyPipe.transform(this.endValue) : ''}`;
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
    this.filterItem.visibleName = `${this.filterItem.name} ~ ${this.nameValue}`;
    this.filterItem.filterFn = (item, result: string | undefined) => result ? item.name.includes(result) : true;
  }

  private setFilterForCategory() {
    const checkedCategories: ItemKeyWithData<CategoryItem>[] | undefined = this.filterItem.listItems?.filter(s => s.checked) ?? [];
    this.filterItem.value = checkedCategories;
    this.filterItem.visibleName = `${this.filterItem.name} = ${checkedCategories.length < 4 ? checkedCategories.map(s => s.data.name)?.join(', ') : '[' + checkedCategories.length + ']'}`;
    this.filterItem.filterFn = (item, categories: ItemKeyWithData<CategoryItem>[] | undefined) => {
      if (categories)
        return categories.map(item => item.key).includes(item.category);
      else return true;
    }
  }

}
