import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Display extends pom.DisplayPanel {
  readonly root: Locator;
  readonly trueCard: Locator;
  readonly falseCard: Locator;

  constructor(page: Page) {
    super(page);
    this.root = this.editor.locator('.tce-true-false');
    this.trueCard = this.root.locator('.v-card').filter({ hasText: 'True' });
    this.falseCard = this.root.locator('.v-card').filter({ hasText: 'False' });
  }
}
