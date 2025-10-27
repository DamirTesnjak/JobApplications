import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IButtonProps } from '../button/type';
import { Button } from '../button/button.component';

@Component({
    selector: 'link-button-component',
    templateUrl: 'link-button-component.html',
    imports: [MatIconModule, Button],
})
export class LinkButtonComponent {
    @Input() href!: string;
    @Input() target: string = "_blank";
    @Input() className: IButtonProps["className"] = "textButton";
    @Input() type!: IButtonProps["type"];
    @Input() iconName: string = "";
}
