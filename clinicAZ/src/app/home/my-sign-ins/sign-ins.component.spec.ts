import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInsComponent } from './sign-ins.component';

describe('SignInsComponent', () => {
  let component: SignInsComponent;
  let fixture: ComponentFixture<SignInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
