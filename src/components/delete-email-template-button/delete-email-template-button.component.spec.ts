import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmailTemplateButtonComponent } from './delete-email-template-button.component';

describe('DeleteEmailTemplateButtonComponent', () => {
  let component: DeleteEmailTemplateButtonComponent;
  let fixture: ComponentFixture<DeleteEmailTemplateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEmailTemplateButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEmailTemplateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
