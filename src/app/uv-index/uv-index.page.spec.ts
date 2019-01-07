import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UVIndexPage } from './tab3.page';

describe('UVIndexPageModule', () => {
  let component: UVIndexPage;
  let fixture: ComponentFixture<UVIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UVIndexPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UVIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
