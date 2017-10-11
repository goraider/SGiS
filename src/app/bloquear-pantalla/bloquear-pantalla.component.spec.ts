/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BloquearPantallaComponent } from './bloquear-pantalla.component';

describe('BloquearPantallaComponent', () => {
  let component: BloquearPantallaComponent;
  let fixture: ComponentFixture<BloquearPantallaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloquearPantallaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloquearPantallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
