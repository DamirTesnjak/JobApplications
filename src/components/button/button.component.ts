import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IButtonProps } from './type';

@Component({
  selector: 'app-button',
  imports: [MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class Button {
  @Input() id: IButtonProps["id"] = "";
  @Input() className: IButtonProps["className"] = "button";
  @Input() iconName: IButtonProps["iconName"] = "";
  @Input() type: IButtonProps["type"] = "button";
  @Input() text: IButtonProps["text"] = "";
  @Input() component: any = "";

  @Output() onClick = new EventEmitter();

  ngOnINit() {
    console.log("Button component loaded with props:", {
     id: this.id,
     className: this.className,
       iconName: this.iconName,
       type: this.type,
      text: this.text,
       component: this.component,
     });  
  }

  handleClick(): void {
    if (this.type !== 'submit') {
      this.onClick.emit();
    }
  }
}
