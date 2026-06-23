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


  
test.describe('OrangeHRM - authentication', () => {
  test('should reach the dashboard after valid login', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await dashboardPage.verify_pageTitle(expected.labels.pageTitle);


  });
  test('should reject invalid credentials and empty password', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
    await loginPage.step_navigate();
    await loginPage.step_login(users.emptyPassword);
    await loginPage.verify_passwordFieldError(expected.errors.requiredField); 

  

  
  });
  test('should reject invalid credentials and empty password2', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
    await loginPage.step_navigate();
    await loginPage.step_login(users.emptyPassword);
    await loginPage.verify_passwordFieldError(expected.errors.requiredField); 
  });

  test('should reject empty username', async ({ loginPage }) => {
     await loginPage.step_navigate();
      await loginPage.step_login(users.emptyUsername);
      await loginPage.verify_usernameFieldError(expected.errors.requiredField);
  });

  test('should reject empty username anjalee', async ({ loginPage }) => {
     await loginPage.step_navigate();
      await loginPage.step_login(users.emptyUsername);
      await loginPage.verify_usernameFieldError(expected.errors.requiredField);
  });

  test('should reject empty username anjalee 12345', async ({ loginPage }) => {
     await loginPage.step_navigate();
      await loginPage.step_login(users.emptyUsername);
      await loginPage.verify_usernameFieldError(expected.errors.requiredField);
  });
})


});

