// spec: .ordino/stories/login.story.md
import { test } from '@config/page.config';
import { loginExpected as expected } from '@config/page-loader';

test.describe('login', () => {


  // scenario: Happy Path
  test('[AC-1] should log in with valid credentials and reach dashboard', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
    await dashboardPage.verify_dashboardLoaded();
  });

});

