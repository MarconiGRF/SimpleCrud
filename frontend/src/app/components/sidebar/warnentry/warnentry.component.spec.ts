import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnentryComponent } from './warnentry.component';

describe('WarnentryComponent', () => {
  let component: WarnentryComponent;
  let fixture: ComponentFixture<WarnentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarnentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarnentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
