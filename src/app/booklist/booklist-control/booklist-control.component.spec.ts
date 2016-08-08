/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { BooklistControlComponent } from './booklist-control.component';

describe('Component: BooklistControl', () => {
  it('should create an instance', () => {
    let component = new BooklistControlComponent();
    expect(component).toBeTruthy();
  });
});
