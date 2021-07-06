import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'namePipe'
})
export class NamePipe implements PipeTransform {
    // tslint:disable-next-line:typedef
    transform(items, userFilter) {
        return items.filter(ele =>
            ele.productName.toLowerCase().includes(userFilter));
    }

}
