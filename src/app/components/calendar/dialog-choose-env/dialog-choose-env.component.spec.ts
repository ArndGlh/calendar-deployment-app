import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChooseEnvComponent } from './dialog-choose-env.component';

describe('DialogChooseEnvComponent', () => {
  let component: DialogChooseEnvComponent;
  let fixture: ComponentFixture<DialogChooseEnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChooseEnvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChooseEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
