/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { BooklistDialog } from './booklist-dialog.directive';

describe('BooklistDialog Directive', () => {
  it('should create an instance', () => {
    let directive = new BooklistDialog();
    expect(directive).toBeTruthy();
  });
});
