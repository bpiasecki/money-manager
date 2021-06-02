import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'categoryName'})
export class NamePipe implements PipeTransform {
    transform(value: any): any {
        
    }
}