import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-image-component',
    imports: [MatIconModule],
    templateUrl: './image-component.html',
    styleUrl: './image-component.scss',
})
export class ImageComponent {
    @Input() src!: string;
    @Input() alt: string = "";
    @Input() width: string = "";
    @Input() height: string = "";
}
