const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { OpenAI } = require('openai'); 
const {API_KEY,API_URL} = require('../config/config');


router.post('/content', async (req, res) => {

    const { url } = req.body;
    // console.log(url);

    try {
        const content = await extractContentFromHTML(url);

        if (!content) {
            console.log("No content found to summarize!!");
            return res.status(400).json({ message: "No content found to summarize." });
        }

        const apiUrl = API_URL;
        const apiKey = API_KEY;

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        };
        
        const data = {
            model: "gpt-4o-mini",
            messages: [
            {
                role: "system",
                content: "You are an assistant and you have to summarize the text provided by the user and also highlight the key points ",
            },
            {
                role: "user",
                content: content,
            },
            ],
            temperature: 0.7,
        };

        fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
            // console.log(result.choices[0].message.content);
            res.send({result:result.choices[0].message.content});
            })
            .catch((error) => {
            console.error("Error:", error);
            });

    } catch (error) {
        console.log("Error: " + error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

async function extractContentFromHTML(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const head = $("h1, h2, h3, h4, h5, h6").text(); 
        const para = $("p").text();  
        const lists = $("ul, ol").text();


        const content = `${head}\n${para}\n${lists}`;
        return content.trim();

    } catch (error) {
        console.error("Error extracting content:", error.message);
        return null;
    }
}

module.exports = router;
