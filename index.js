const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

const extractProductInfo = (product) => {
  const [title] = product.title.split("$");
  const prices = product.price.match(/\$\d+\.\d+/g);

  if (!prices || prices.length === 0) {
    return null; // No price information, skip this product
  }

  const priceBeforeDiscount = prices.length > 1 ? prices[1] : null;
  const priceAfterDiscount = prices[0];
  const numRatings = product.numRatings.replace(/\s.*$/, ""); // Remove text after the numeric part

  return {
    title: title.trim(),
    priceBeforeDiscount,
    priceAfterDiscount,
    rating: product.rating,
    numRatings,
  };
};

const port = 3000;
const url =
  "https://www.amazon.com/s?k=amazon+best+sellers&adgrpid=134489108064&hvadid=585412407736&hvdev=c&hvlocphy=9073697&hvnetw=g&hvqmt=e&hvrand=927045761928341799&hvtargid=kwd-298311235814&hydadcr=22341_13333117&tag=hydglogoo-20&ref=pd_sl_2ma83un0to_e";

// Amazon may block requests without a User-Agent header.
// You can add a User-Agent header to your Axios request
// To mimic a browser request:
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";

app.get("/data", (req, res) => {
  axios
    .get(url, {
      headers: {
        "User-Agent": userAgent,
      },
    })
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const products = [];

      $(".s-result-item", html).each((index, element) => {
        const title = $(element).find(".a-text-normal").text().trim();
        const price = $(element).find(".a-offscreen").text().trim();
        const rating = $(element)
          .find(".a-icon-star-small .a-icon-alt")
          .text()
          .trim();
        const numRatings = $(element)
          .find(".a-size-small .a-link-normal")
          .text()
          .trim();

        const productData = {
          title,
          price,
          rating,
          numRatings,
        };

        products.push(productData);
      });

      // Filter out products with no price information or only one price
      const filteredProducts = products.filter((product) => {
        const prices = product.price.match(/\$\d+\.\d+/g);

        if (!prices || prices.length === 0) {
          return false; // No price information, skip this product
        }

        const priceBeforeDiscount = prices.length > 1 ? prices[1] : null;
        const priceAfterDiscount = prices[0];

        return priceBeforeDiscount !== null;
      });

      const processedData = filteredProducts.map(extractProductInfo);

      res.json(processedData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data" });
    });
});

app.listen(port, () => console.log(`The server is running at ${port}`));
