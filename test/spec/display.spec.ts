import { elementClient, pom } from '@tailor-cms/cek-e2e';
import { expect, test } from '@playwright/test';

import { Display } from '../pom';

const ELEMENT_ID = 'test-true-false-display';

const SEED = {
  isGradable: true,
  correct: true,
  embeds: {
    prompt: {
      id: 'prompt',
      type: 'TIPTAP_HTML',
      position: 1,
      embedded: true,
      data: { content: 'Is the sky blue?' },
    },
  },
  question: ['prompt'],
  hint: '',
  feedback: {},
};

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await elementClient.resetState(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Empty state', () => {
  test('Renders placeholder when no correct answer is set', async ({
    page,
  }) => {
    const display = new Display(page);
    await expect(display.placeholder).toBeVisible();
  });
});

test.describe('With correct answer set', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, SEED);
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Renders True and False cards', async ({ page }) => {
    const display = new Display(page);
    await expect(display.trueCard).toBeVisible();
    await expect(display.falseCard).toBeVisible();
  });

  test('Selecting an answer and submitting locks the selection', async ({
    page,
  }) => {
    const display = new Display(page);
    const form = new pom.DisplayQuestionForm(display.el);
    await expect(display.trueCard).not.toHaveClass(/readonly/);
    await display.trueCard.click();
    await expect(display.trueCard).toHaveClass(/selected/);
    await form.submit();
    await expect(display.trueCard).toHaveClass(/readonly/);
  });

  test('Submitting correct answer marks feedback as success', async ({
    page,
  }) => {
    const display = new Display(page);
    const form = new pom.DisplayQuestionForm(display.el);
    await display.trueCard.click();
    await form.submit();
    await expect(form.feedback).toHaveClass(/success/);
  });

  test('Submitting wrong answer marks feedback as error', async ({ page }) => {
    const display = new Display(page);
    const form = new pom.DisplayQuestionForm(display.el);
    await display.falseCard.click();
    await form.submit();
    await expect(form.feedback).toHaveClass(/error/);
  });
});

test.describe('Non-gradable mode', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      ...SEED,
      isGradable: false,
      correct: undefined,
    });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Feedback is not flagged as success or error', async ({ page }) => {
    const display = new Display(page);
    const form = new pom.DisplayQuestionForm(display.el);
    await display.trueCard.click();
    await form.submit();
    await expect(form.feedback).not.toHaveClass(/success/);
    await expect(form.feedback).not.toHaveClass(/error/);
  });
});
