import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Button } from '../button/button.component';
import { ImageComponent } from '../image-component/image-component';
import { IconComponent } from '../icon-component/icon-component';
import { LinkButtonComponent } from '../link-button-component/link-button-component';
import { NgComponentOutlet } from '@angular/common';
import { RowButton } from '../rowButton/rowButton';
import { useTranslation } from '../../utils/translation/useTranslation';
import { DetectLocaleChangeService } from '../../utils/translation/detectLocaleChange.service';
import { TableCell } from '../table-cell/table-cell';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        MatTableModule,
        NgComponentOutlet,
        TableCell,
        Button,
        ImageComponent,
        IconComponent,
        LinkButtonComponent,
        RowButton,
    ],
    templateUrl: './table.html',
})

export class TableComponent {
    private localeService = inject(DetectLocaleChangeService);

    @Input() tableColumnsDef!: any;
    @Input() dataSource!: any;
    @Input() columnsToDisplay!: any;

    displayedColumns: string[] = [];

    translation = useTranslation("candidates", this.localeService.getLocale());

    ngOnChanges(changes: SimpleChanges) {
        if (changes['columnsToDisplay'] && this.columnsToDisplay) {
            this.displayedColumns = [...this.columnsToDisplay];
        }
    }

    getCellComponent(column: any) {
        if (column.cellButton) return Button;
        if (column.cellImage) return ImageComponent;
        if (column.cellIcon) return IconComponent;
        if (column.cellLinkButton) return LinkButtonComponent;
        if (column.cellRowButton) return RowButton;
        return TableCell;
    }

    setCellComponentsInputs(column: any) {
        return {
        ...column.cellButton,
        ...column.cellImage,
        ...column.cellIcon,
        ...column.cellLinkButton,
        ...column.cellRowButton,
        ...column.cell,
        };
    }
}