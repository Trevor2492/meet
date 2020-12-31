// This tests end-to-end for the show/hide event details feature of the meet app.
import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
	let browser;
	let page;
	jest.setTimeout(30000);
	
  beforeAll(async () => {		
    browser = await puppeteer.launch({
			headless: true, //'false' makes it so you can watch whats happening in the browser, as if there's an invisible user interacting with the app
			slowMo: 250, //slows down the interactions so you can see what's happening in the browser better
			ignoreDefaultArgs: ['--disable-extensions'] //ignores default setting that causes timeout errors
		});
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });
	
	test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
	});
	
})
