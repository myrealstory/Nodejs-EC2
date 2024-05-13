"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 80;
app.use((0, cors_1.default)());
function generateSixDigitId() {
    return Math.floor(100000 + Math.random() * 900000);
}
app.get("/getProducts", async (req, res) => {
    try {
        const apiUrl = "https://dummyjson.com/products?limit=100";
        const response = await axios_1.default.get(apiUrl);
        let posts = response.data.products;
        let modifiedPosts = [];
        for (let i = 0; i < posts.length; i++) {
            // add first four posts with productType "Single"
            for (let j = i; j < 4 && j < posts.length; j++) {
                if (posts[j]) {
                    modifiedPosts.push(Object.assign(Object.assign({}, posts[j]), { id: generateSixDigitId(), productType: "Single" }));
                }
            }
            if (posts[i + 4]) {
                const setPost = Object.assign(Object.assign({}, posts[i + 4]), { id: generateSixDigitId(), productType: "Set", subItem: [] });
                for (let k = i + 5; k < i + 10 && k < posts.length; k++) {
                    if (posts[k]) {
                        setPost.subItem.push(Object.assign(Object.assign({}, posts[k]), { id: generateSixDigitId() }));
                    }
                }
                modifiedPosts.push(setPost);
            }
        }
        res.json(modifiedPosts);
    }
    catch (error) {
        console.error("Failed to fetch or transform external API data:", error);
        res.status(500).send("Error fetching external data");
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
