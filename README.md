# web-scarper
## Description:
This **web scraper** is a Node.js application designed to extract product information from **Amazon's Best Sellers page**. It utilizes modern web scraping techniques and a set of powerful libraries, including Axios for making HTTP requests, Cheerio for parsing HTML, and Express for creating a simple API.

## Technology Used:
* **Node.js**: The core runtime environment for running JavaScript on the server.
* **Axios**: A popular HTTP client for making network requests, used here to fetch Amazon's Best Sellers page.
* **Cheerio**: A lightweight and fast library for parsing HTML and navigating the DOM, enabling data extraction from web pages.
* **Express.js**: A web application framework for Node.js, used to create a minimal API server for serving scraped data.
* **User-Agent Header**: A User-Agent header is included in the HTTP request to mimic a browser request and avoid being blocked by Amazon's security measures.

## Functionality:
This web scraper is **designed to extract product data from Amazon's Best Sellers page**. It collects information on various **products**, including their titles, prices, product ratings, and the number of ratings. 
After gathering this data, the scraper **filters** out products that do not have discounts and formats the remaining information into a clean and structured JSON array. The resulting JSON array provides a concise summary of the most popular discounted products on Amazon's Best Sellers page.

## Demo :
```sh
[
{
        "title": "Foot Peel Mask - 4 Pack of Regular Size Skin Exfoliating Foot Masks for Dry, Cracked Feet, Callus, Dead Skin Remover for baby soft feet, Original Scent Foot Peel Mask - 4 Pack of Regular Size Skin Exfoliating Foot Masks for Dry, Cracked Feet, Callus, Dead Skin Remover for baby soft feet, Original Scent",
        "priceBeforeDiscount": "$38.99",
        "priceAfterDiscount": "$17.49",
        "rating": "4.4 out of 5 stars",
        "numRatings": "67,715"
    },
    {
        "title": "Women's Cotton Bikini Brief Underwear (Available in Plus Size), Multipacks Women's Cotton Bikini Brief Underwear (Available in Plus Size), Multipacks",
        "priceBeforeDiscount": "$28.50",
        "priceAfterDiscount": "$13.52",
        "rating": "4.4 out of 5 stars",
        "numRatings": "148,700"
}
]
```
## Exemple in PostMan :
![image](https://github.com/Devai-coding/web-scarper/assets/113947156/6181b13d-5ef9-42ca-9c08-87433c941c2f)

## Contributions and Feedback Welcome :
Feel free to clone this repository and explore the code, report any issues or bugs you encounter, and share your ideas for new features or improvements.
