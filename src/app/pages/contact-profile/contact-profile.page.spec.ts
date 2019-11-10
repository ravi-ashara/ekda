import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProfilePage } from './contact-profile.page';

describe('ContactProfilePage', () => {
  let component: ContactProfilePage;
  let fixture: ComponentFixture<ContactProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
