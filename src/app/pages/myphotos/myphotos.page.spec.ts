import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyphotosPage } from './myphotos.page';

describe('MyphotosPage', () => {
  let component: MyphotosPage;
  let fixture: ComponentFixture<MyphotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyphotosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyphotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
