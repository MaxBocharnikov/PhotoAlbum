import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotouploadPage } from './photoupload.page';

describe('PhotouploadPage', () => {
  let component: PhotouploadPage;
  let fixture: ComponentFixture<PhotouploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotouploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotouploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
