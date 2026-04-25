import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Edit extends pom.EditPanel {
  readonly form: pom.EditQuestionForm;
  readonly trueRadio: Locator;
  readonly falseRadio: Locator;

  constructor(page: Page) {
    super(page);
    this.form = new pom.EditQuestionForm(this.el);
    this.trueRadio = this.form.el.getByRole('radio', { name: 'True' });
    this.falseRadio = this.form.el.getByRole('radio', { name: 'False' });
  }
}
