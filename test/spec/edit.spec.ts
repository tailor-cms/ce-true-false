import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Edit } from '../pom';

const ELEMENT_ID = 'test-true-false-edit';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID, { isGradable: true });
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Initial render', () => {
  test('Renders both True and False radios', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.trueRadio).toBeVisible();
    await expect(edit.falseRadio).toBeVisible();
  });
});

test.describe('Selecting correct answer', () => {
  test('Persists selected answer across reload', async ({ page }) => {
    const edit = new Edit(page);
    await edit.trueRadio.click();
    await expect(edit.trueRadio).toBeChecked();
    await edit.form.saveBtn.click();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(edit.trueRadio).toBeChecked();
  });
});

test.describe('Non-gradable mode', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      isGradable: false,
      embeds: {},
      question: [],
      hint: '',
      feedback: {},
    });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Shows "Options" label instead of "Select correct answer"', async ({
    page,
  }) => {
    const edit = new Edit(page);
    await expect(edit.form.el.getByText('Options')).toBeVisible();
    await expect(
      edit.form.el.getByText('Select correct answer'),
    ).not.toBeVisible();
  });
});

test.describe('Readonly mode', () => {
  test('Radios cannot be toggled', async ({ page }) => {
    const edit = new Edit(page);
    await edit.setReadonly();
    await edit.trueRadio.click();
    await expect(edit.trueRadio).not.toBeChecked();
  });
});
