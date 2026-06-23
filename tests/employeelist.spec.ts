import { test, expect } from '@playwright/test';

test.describe('PIM - Employee List', () => {

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Navigate to Employee List
    await page.getByRole('link', { name: 'PIM' }).click();
    await expect(page).toHaveURL(/viewEmployeeList/);
  });

  // AC-1
  test('[AC-1] should display Employee List page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });

  // AC-2
  test('[AC-2] should search employee by name', async ({ page }) => {
    await page.getByPlaceholder('Type for hints...').first().fill('Linda');

    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('.oxd-table-body')).toContainText('Linda');
  });

  // AC-3
  test('[AC-3] should search employee by Employee ID', async ({ page }) => {
    await page.locator('input').nth(2).fill('0001');

    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('.oxd-table-body')).toBeVisible();
  });

  // AC-4
  test('[AC-4] should display no records for invalid employee name', async ({ page }) => {
    await page.getByPlaceholder('Type for hints...').first().fill('InvalidEmployee');

    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('No Records Found')).toBeVisible();
  });

  // AC-5
  test('[AC-5] should reset all search fields', async ({ page }) => {
    await page.getByPlaceholder('Type for hints...').first().fill('Linda');

    await page.getByRole('button', { name: 'Reset' }).click();

    await expect(
      page.getByPlaceholder('Type for hints...').first()
    ).toHaveValue('');
  });

  // AC-6
  test('[AC-6] should search using multiple filters', async ({ page }) => {
    await page.getByPlaceholder('Type for hints...').first().fill('Linda');
    await page.locator('input').nth(2).fill('0001');

    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('.oxd-table-body')).toBeVisible();
  });

  // AC-7
  test('[AC-7] should select an employee checkbox', async ({ page }) => {
    const checkbox = page.locator('.oxd-checkbox-input').nth(1);

    await checkbox.click();

    await expect(checkbox).toBeChecked();
  });

  // AC-8
  test('[AC-8] should open employee details page', async ({ page }) => {
    const employeeLink = page.locator('.oxd-table-cell').nth(3);

    await employeeLink.click();

    await expect(page).toHaveURL(/viewPersonalDetails/);
  });

  // AC-9
  test('[AC-9] should refresh Employee List page successfully', async ({ page }) => {
    await page.reload();

    await expect(page).toHaveURL(/viewEmployeeList/);
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });

  // AC-10
  test('[AC-10] should display employee records table', async ({ page }) => {
    await expect(page.locator('.oxd-table')).toBeVisible();
  });

});