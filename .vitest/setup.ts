import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

beforeEach(() => {
  let toastPortalRoot = document.getElementById('error-toast');
  if (!toastPortalRoot) {
    toastPortalRoot = document.createElement('div');
    toastPortalRoot.setAttribute('id', 'error-toast');
    document.body.appendChild(toastPortalRoot);
  }
});
