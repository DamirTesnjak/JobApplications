import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-table-cell',
    imports: [],
    templateUrl: './table-cell.html',
})
export class TableCell {
    @Input() text!: string;
}
