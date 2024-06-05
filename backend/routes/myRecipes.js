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
        recipe["steps"] = ans;
        recipe['createdBy'] = recipe.uid;
        delete recipe['uid'];
        const docRef = await addDoc(collection(db, 'recipes'), recipe);
        // console.log('addedDoc', docRef);
        let recipes = (await getDoc(doc(db, 'users', recipe.createdBy))).data()['myRecipes'];
        console.log('hello', recipes)
        if (recipes) {
            console.log('pushing', recipes)
            recipes.push(docRef.id);
        } else {
            recipes = [docRef.id];
        }
        console.log(recipes);
        await updateDoc(doc(db, 'users', recipe.createdBy), {'myRecipes': recipes});

        res.status(200).send(docRef);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.get("/created/:id", async (req, res) => {
    try {
        const uid = req.params.id
        const authorDoc = await getDoc(doc(db, 'users', uid));
        const author = authorDoc.data()['name'];
        let recipes = (await getDoc(doc(db, 'users', uid))).data()['myRecipes'];
        recipes = await Promise.all(recipes.map(async (recId) => {
            const recDoc = await getDoc(doc(db, 'recipes', recId));
            let rec = recDoc.data();
            rec['id'] = recDoc.id;
            rec['author'] = author;
            return rec;
        }))
        // console.log(recipes)
        res.status(200).json(recipes);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.put("/edit/:rid", async (req, res) => {
    try {
        const rid = req.params.rid;
        const newRec = req.body;
        console.log(newRec);
        const recDoc = await updateDoc(doc(db, 'recipes', rid), newRec);
        res.status(200).send("Successfully Updated Recipe!");
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

export default router;