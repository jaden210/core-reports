/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ErrorHandlingComponent } from './error-handling.component';

describe('Component: ErrorHandling', () => {
  it('should create an instance', () => {
    let component = new ErrorHandlingComponent();
    expect(component).toBeTruthy();
  });
});
