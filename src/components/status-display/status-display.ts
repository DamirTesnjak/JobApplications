import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IStatusDisplayProps } from './type';

@Component({
    selector: 'app-status-display',
    imports: [MatIconModule],
    templateUrl: './status-display.html',
    styleUrl: './status-display.scss'
})
export class StatusDisplay {
    @Input() label: IStatusDisplayProps["label"] | null = null;
    @Input() className: IStatusDisplayProps["className"] = "standard";
    @Input() flow: IStatusDisplayProps["flow"] = "flowRow";
    @Input() icon!: any;

    CLASS_NAME = {
        standard: 'standard',
        flowColumn: this.flow,
        flowRow: this.flow,
        label: 'label',
    }
}
