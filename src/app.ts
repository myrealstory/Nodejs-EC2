import express, {Request, Response} from 'express';
import cors from 'cors';
import axios from 'axios';
import { v4 as uuids4 } from 'uuid';


const app = express();
const port = 82;

app.use(cors());

function generateSixDigitId(){
    return Math.floor(100000 + Math.random() * 900000);
}

app.get("/getProducts", async( req: Request, res: Response) =>{
    try {
        const apiUrl = "https://dummyjson.com/products?limit=100";
        const response = await axios.get(apiUrl);

        let posts = response.data.products;

        let modifiedPosts = [];

        for(let i=0 ; i < posts.length; i++){
            // add first four posts with productType "Single"
            for(let j = i; j < 4 && j < posts.length; j++){
                if(posts[j]){
                    modifiedPosts.push({
                        ...posts[j],
                        id:generateSixDigitId(),
                        productType: "Single"
                    });
                }
            }

            if(posts[i + 4]){
                const setPost = {
                    ...posts[i + 4],
                    id:generateSixDigitId(),
                    productType: "Set",
                    subItem:[]
                };

                for(let k = i + 5; k < i + 10 && k < posts.length; k++){
                    if(posts[k]){
                        setPost.subItem.push({
                            ...posts[k],
                            id:generateSixDigitId(),
                        });
                    }
                }
                modifiedPosts.push(setPost);
            }
        }

        res.json(modifiedPosts);
    } catch (error) {
        console.error("Failed to fetch or transform external API data:", error);
        res.status(500).send("Error fetching external data");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});