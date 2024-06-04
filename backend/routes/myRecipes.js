import express from "express";
import util from 'util';
import request from 'request';
import dotenv from "dotenv";
import OpenAI from "openai";

import {db} from "./../firebase.js";
import { collection, getDocs, updateDoc, doc, addDoc, getDoc, deleteDoc, query, where } from "firebase/firestore";

const requestGet = util.promisify(request.get);
const router = express.Router();
dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// get diff categories
router.post('/draft', async (req, res) => {
    try {
        const recipe = req.body;
        const msg = 'Create a recipe from this description: ' + recipe.name + recipe.desc;
        console.log(msg)
        const completion = await openai.chat.completions.create({
            messages: [{role: 'user', content: msg}],
            model: "gpt-3.5-turbo",
        });
        // console.log('completion', completion.choices[0]);
        const ans = completion.choices[0].message.content;
        console.log(ans);
        recipe["steps"] = ans;
        recipe['createdBy'] = recipe.uid;
        const docRef = await addDoc(collection(db, 'recipes'), recipe);

        let recipes = (await getDoc(doc(db, 'users', uid))).data()['myRecipes'];
        if (recipes) {
            recipes.push(docRef.id);
        } else {
            recipes = [docRef.id];
        }
        await updateDoc(doc(db, 'users', uid), {'myRecipes': recipes});

        res.status(200).send(docRef);
    } catch (e) {
        res.status(500).send({ error: 'Error fetching messages' });
    }
})

// get search results
router.get('home/?q=:search', (req, res) => {
    console.log("get search results");
})

export default router;