const { test, expect } = require('@playwright/test');

test('rider UI loads, selects a destination and displays a fare estimate', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Loop Ride App');
  await expect(page.getByRole('heading', { name: 'Where would you like to go?' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Rider App/ })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /Gachibowli/ }).click();
  await expect(page.locator('#message')).toContainText('Destination selected: Gachibowli');
  await expect(page.locator('#summaryFare')).toHaveText('₹99');
  await expect(page.locator('#summaryDistance')).toHaveText('8.2 km');
});

test('rider can search destinations and see an empty state for unmatched text', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox', { name: 'Search destinations' }).fill('char');
  await expect(page.getByRole('button', { name: /Charminar/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Gachibowli/ })).toBeHidden();
  await page.getByRole('searchbox', { name: 'Search destinations' }).fill('not a place');
  await expect(page.getByText('No destinations match your search.')).toBeVisible();
});

test('user can switch between Rider and Driver views', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Driver App/ }).click();
  await expect(page.getByRole('heading', { name: 'Driver dashboard' })).toBeVisible();
  await expect(page.locator('#driver')).toBeVisible();
  await expect(page.locator('#rider')).toBeHidden();
  await page.getByRole('button', { name: /Rider App/ }).click();
  await expect(page.getByRole('heading', { name: 'Where would you like to go?' })).toBeVisible();
  await expect(page.locator('#driver')).toBeHidden();
});

test('driver online toggle changes visible status and busy zones are rendered', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Driver App/ }).click();
  const online = page.locator('#online');
  await expect(page.locator('#driverStatus')).toContainText('offline');
  await online.check();
  await expect(page.locator('#driverStatus')).toContainText('ONLINE');
  await online.uncheck();
  await expect(page.locator('#driverStatus')).toContainText('offline');
  await expect(page.getByRole('heading', { name: 'HITEC City' })).toBeVisible();
  await expect(page.getByText('Sample bonus ₹40')).toBeVisible();
});

test('request ride clearly states that this is a demo, then trip can be cleared', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Pickup location').fill('JNTU, Kukatpally');
  await page.getByRole('button', { name: /Gachibowli/ }).click();
  await page.getByRole('button', { name: 'Review demo ride' }).click();
  await expect(page.getByRole('status')).toContainText('No real driver has been contacted');
  await page.getByRole('button', { name: 'Clear trip' }).click();
  await expect(page.locator('#tripSummary')).toBeHidden();
  await expect(page.locator('#requestRide')).toBeDisabled();
});

test('responsive layout fits a mobile viewport without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  await expect(page.getByRole('heading', { name: 'Where would you like to go?' })).toBeVisible();
  await page.getByRole('button', { name: /Driver App/ }).click();
  await expect(page.getByRole('heading', { name: 'Driver dashboard' })).toBeVisible();
});

test('browser has no uncaught page errors during primary navigation', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: /Driver App/ }).click();
  await page.getByRole('button', { name: /Rider App/ }).click();
  await page.getByRole('button', { name: /Charminar/ }).click();
  await expect(page.locator('#message')).toContainText('Destination selected: Charminar');
  expect(pageErrors).toEqual([]);
});

test('rider can switch ride type and fare estimate updates', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Gachibowli/ }).click();
  await expect(page.locator('#summaryFare')).toHaveText('₹99');
  await page.getByRole('button', { name: /Comfort/ }).click();
  await expect(page.locator('#summaryRideType')).toHaveText('Loop Comfort');
  await expect(page.locator('#summaryFare')).toHaveText('₹134');
  await expect(page.getByRole('button', { name: /Comfort/ })).toHaveAttribute('aria-pressed', 'true');
});

test('saved pickup shortcuts, preferences and notes are included in a demo request review', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Home/ }).click();
  await expect(page.getByLabel('Pickup location')).toHaveValue('Home · Kukatpally');
  await page.getByRole('button', { name: /Charminar/ }).click();
  await page.getByLabel('Quiet ride').check();
  await page.getByLabel('Accessibility needs').check();
  await page.getByLabel('Trip safety reminder').check();
  await page.getByLabel('Note for your driver').fill('Call on arrival');
  await page.getByRole('button', { name: 'Review demo ride' }).click();
  await expect(page.locator('#message')).toContainText('quiet ride');
  await expect(page.locator('#message')).toContainText('accessibility assistance requested');
  await expect(page.locator('#message')).toContainText('Call on arrival');
  await expect(page.locator('#message')).toContainText('share trip details');
});

test('recent trip can be reused and cleared', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Pickup location').fill('JNTU, Kukatpally');
  await page.getByRole('button', { name: /Secunderabad/ }).click();
  await page.getByRole('button', { name: 'Review demo ride' }).click();
  await expect(page.locator('#recentTrips')).toContainText('Loop Mini · ₹169');
  await page.reload();
  await page.getByRole('button', { name: 'Reuse trip to Secunderabad' }).click();
  await expect(page.locator('#summaryDestination')).toHaveText('Secunderabad');
  await expect(page.locator('#pickup')).toHaveValue('JNTU, Kukatpally');
  await page.getByRole('button', { name: 'Clear history' }).click();
  await expect(page.getByText('No recent trips yet.')).toBeVisible();
});

test('reset clears ride preferences and restores Mini ride selection', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Gachibowli/ }).click();
  await page.getByRole('button', { name: /XL/ }).click();
  await page.getByLabel('Quiet ride').check();
  await page.getByRole('button', { name: 'Clear trip' }).click();
  await expect(page.locator('#tripSummary')).toBeHidden();
  await expect(page.getByRole('button', { name: /Mini/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByLabel('Quiet ride')).not.toBeChecked();
});


test('malformed and oversized recent-trip storage is ignored safely', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('loopRideRecentTripsV1', JSON.stringify([
      null,
      [],
      { destination: 'Unknown City', pickup: '<img src=x onerror=alert(1)>', distance: 2, fare: 5, rideType: 'Loop Mini' },
      { destination: 'Charminar', pickup: 'Valid pickup', distance: -1, fare: 5, rideType: 'Loop Mini' },
      { destination: 'Gachibowli', pickup: 'Valid pickup', distance: 8.2, fare: 99, rideType: 'Loop Mini' }
    ]));
  });
  await page.goto('/');
  await expect(page.locator('#recentTrips')).toContainText('Gachibowli');
  await expect(page.locator('#recentTrips')).not.toContainText('Unknown City');
  await expect(page.locator('#recentTrips')).not.toContainText('<img');
  await expect(page.locator('#recentTrips')).not.toContainText('Charminar');
});

test('destination selection enables request; clearing restores disabled state', async ({ page }) => {
  await page.goto('/');
  const request = page.getByRole('button', { name: 'Review demo ride' });
  await expect(request).toBeDisabled();
  await page.getByRole('button', { name: /Banjara Hills/ }).click();
  await expect(request).toBeEnabled();
  await expect(page.locator('#summaryFare')).toHaveText('₹95');
  await page.getByRole('button', { name: 'Clear trip' }).click();
  await expect(request).toBeDisabled();
  await expect(page.locator('#tripSummary')).toBeHidden();
});

test('fare stays a non-negative integer across all destinations and ride tiers', async ({ page }) => {
  await page.goto('/');
  const destinations = [
    { name: /Gachibowli/, fare: '₹99' },
    { name: /Banjara Hills/, fare: '₹95' },
    { name: /Secunderabad/, fare: '₹169' },
    { name: /Charminar/, fare: '₹139' }
  ];
  const rideTypes = [
    { name: /Mini/, fareMultiplier: 1 },
    { name: /Comfort/, fareMultiplier: 1.35 },
    { name: /XL/, fareMultiplier: 1.7 }
  ];
  const bases = [99, 95, 169, 139];
  for (let i = 0; i < destinations.length; i++) {
    await page.getByRole('button', { name: destinations[i].name }).click();
    for (let j = 0; j < rideTypes.length; j++) {
      await page.getByRole('button', { name: rideTypes[j].name }).click();
      const amount = await page.locator('#summaryFare').innerText();
      expect(amount).toBe('₹' + Math.round(bases[i] * rideTypes[j].fareMultiplier));
    }
  }
});

test('local storage being unavailable does not crash the rider UI', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() { throw new Error('storage blocked'); }
    });
  });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: /Charminar/ }).click();
  await page.getByRole('button', { name: 'Review demo ride' }).click();
  await expect(page.getByRole('status')).toContainText('No real driver has been contacted');
  await expect.poll(() => pageErrors).toEqual([]);
});
