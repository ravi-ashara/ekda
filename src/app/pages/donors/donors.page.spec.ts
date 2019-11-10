import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsPage } from './donors.page';

describe('DonorsPage', () => {
  let component: DonorsPage;
  let fixture: ComponentFixture<DonorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
