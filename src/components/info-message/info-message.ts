import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-button',
    imports: [MatIconModule],
    templateUrl: './info-message.html',
    styleUrl: './info-message.scss'
})
export class InfoMessage {
    @Input() text: string = "";
}
