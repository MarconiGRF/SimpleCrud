import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnviewComponent } from './warnview.component';

describe('WarnviewComponent', () => {
  let component: WarnviewComponent;
  let fixture: ComponentFixture<WarnviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarnviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarnviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
