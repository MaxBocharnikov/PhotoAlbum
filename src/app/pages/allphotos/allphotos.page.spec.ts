import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllphotosPage } from './allphotos.page';

describe('AllphotosPage', () => {
  let component: AllphotosPage;
  let fixture: ComponentFixture<AllphotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllphotosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllphotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
