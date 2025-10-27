import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Button } from '../button/button.component';
import { ImageComponent } from '../image-component/image-component';
import { IconComponent } from '../icon-component/icon-component';
import { LinkButtonComponent } from '../link-button-component/link-button-component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-table',
    imports: [MatTableModule, CommonModule],
    templateUrl: './table.html',
})

export class TableComponent {
    @Input() tableColumnsDef!: any;
    @Input() dataSource!: any;
    @Input() columnDefinitions!: any;

    displayedColumns = Object.keys(this.columnDefinitions);

    getCellComponent(column: any, row: any) {
        if (column.cellButton) return Button;
        if (column.cellImage) return ImageComponent;
        if (column.cellIcon) return IconComponent;
        if (column.cellLinkButton) return LinkButtonComponent;

        return column.cell;
    }

    setCellComponentsInputs(column: any, row: any) {
        if (column.cellButton) return column.cellButton.inputs;
        if (column.cellImage) return column.cellImage.inputs;
        if (column.cellIcon) return column.cellIcon.inputs;
        if (column.cellLinkButton) return column.cellLinkButton.inputs;
    }
}