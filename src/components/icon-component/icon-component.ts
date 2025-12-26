import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'icon-component',
    templateUrl: 'icon-component.html',
    imports: [MatIconModule, NgStyle],
})
export class IconComponent {
    @Input() ariaHidden: boolean = false;
    @Input() ariaLabel: string = "";
    @Input() fontIcon!: string;
    @Input() color!: string;
}
