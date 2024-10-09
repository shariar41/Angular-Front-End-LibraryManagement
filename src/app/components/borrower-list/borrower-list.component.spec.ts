import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerListComponent } from './borrower-list.component';

describe('BorrowerListComponent', () => {
  let component: BorrowerListComponent;
  let fixture: ComponentFixture<BorrowerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
