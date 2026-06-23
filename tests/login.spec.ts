import { test } from '@config/page.config';
import { loginExpected as expected } from '@config/page-loader';
import { users } from '@fixtures/users.fixture';

test.describe('Login', () => {

  // Happy Path
  test('[AC-1] should log in with valid credentials and reach dashboard', async ({
    loginPage,
    dashboardPage,
  }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(
      process.env.ADMIN_USERNAME!,
      process.env.ADMIN_PASSWORD!
    );
    await dashboardPage.verify_dashboardLoaded();
  });

  // Invalid credentials
  test('[AC-2] should reject invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(
      expected.errors.invalidCredentials
    );
  });

  // Empty password
  test('[AC-3] should reject empty password', async ({
    loginPage,
  }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.emptyPassword);
    await loginPage.verify_passwordFieldError(
      expected.errors.requiredField
    );
  });

  // Empty username
  test('[AC-4] should reject empty username', async ({
    loginPage,
  }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.emptyUsername);
    await loginPage.verify_usernameFieldError(
      expected.errors.requiredField
    );
  });

});
