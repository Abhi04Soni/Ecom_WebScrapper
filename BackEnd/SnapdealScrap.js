const puppeteer = require('puppeteer');

const snapQuotes = async (value) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`https://www.snapdeal.com/search?keyword=${value}&sort=rlvncy`, {
    waitUntil: "domcontentloaded",
  });

  const data = await page.evaluate(() => {
    const products = [];

    const prodDetails = document.querySelectorAll('[data-component-type="s-search-result"]');

    for (let prod of prodDetails) {
      const product = {
        date: Date.now(),
        url: "",
        name: "",
        imgURL: "",
        stars: "",
        price: ""
      };
      product.name = prod.querySelector('[class="a-size-medium a-color-base a-text-normal"]').textContent;
      product.price = prod.querySelector('[class="a-price-whole"]').textContent;
      let ele = prod.querySelector('[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]');
      product.url = 'https://www.amazon.in' + ele.getAttribute('href');
      product.stars = prod.querySelector('[class="a-icon-alt"]').textContent;
      product.imgURL = prod.querySelector('[class="s-image"]').getAttribute('src');

      products.push(product);
    }

    return products;
  });

  console.log(data);
  await browser.close();

  return data; // Return the scraped data
};

module.exports = snapQuotes;
