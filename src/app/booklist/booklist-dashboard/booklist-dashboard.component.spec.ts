/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { BooklistDashboardComponent } from './booklist-dashboard.component';

describe('Component: BooklistDashboard', () => {
  it('should create an instance', () => {
    let component = new BooklistDashboardComponent();
    expect(component).toBeTruthy();
  });
});
