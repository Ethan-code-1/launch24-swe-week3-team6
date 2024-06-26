import express from "express";
import util from 'util';
import request from 'request';
import dotenv from "dotenv";
import OpenAI from "openai";

import { db } from "./../firebase.js";
import { collection, getDocs, updateDoc, doc, addDoc, getDoc, deleteDoc, query, where } from "firebase/firestore";

const requestGet = util.promisify(request.get);
const router = express.Router();
dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// get diff categories
router.post('/draft', async (req, res) => {
    try {
        const recipe = req.body;

        // generate steps
        const msg = 'Create a recipe from this description: ' + recipe.name + recipe.desc;
        const completion = await openai.chat.completions.create({
            messages: [{role: 'user', content: msg}],
            model: "gpt-3.5-turbo",
        });

        // create recipy and add recipe doc
        const ans = completion.choices[0].message.content;
        recipe["steps"] = ans;
        recipe['createdBy'] = recipe.uid;
        recipe['userMade'] = true;
        delete recipe['uid'];
        // delete recipe['img']
        const docRef = await addDoc(collection(db, 'pending_recipes'), recipe);
        
        // add recipe to user's created recipes
        let recipes = (await getDoc(doc(db, 'users', recipe.createdBy))).data()['pendingRecipes'];
        if (recipes) {
            // console.log('pushing', recipes)
            recipes.push(docRef.id);
        } else {
            recipes = [docRef.id];
        }
        // console.log(recipes);
        await updateDoc(doc(db, 'users', recipe.createdBy), {'pendingRecipes': recipes});

        // console.log('doc', docRef.id);
        res.status(200).send({ docRef, docId: docRef.id });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})


router.post('/nutrition', async (req, res) => {
    try {
        const recipe = req.body;
        const docId = recipe.docId;
        console.log("doc", docId);
        const msg = 'Create an array of nutrition facts from this description: ' + recipe.name + " " + recipe.desc + " in this format: " + `
        { value: "", label: "calories" },
        { value: "", label: "fat" },
        { value: "", label: "carbs" },
        { value: "", label: "protein" },
        `;
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: msg }],
            model: "gpt-3.5-turbo",
        });
        console.log('completion', completion.choices[0].message.content);
        const result = completion.choices[0].message.content;

        await updateDoc(doc(db, 'pending_recipes', docId), { nutritionFacts: result });
        console.log("Document updated with nutrition facts.");

        res.status(200).send({ success: true });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});



router.get("/created/:id", async (req, res) => {
    try {
        async function getRec(recipes, coll) {
            return await Promise.all(recipes.map(async (recId) => {
                const recDoc = await getDoc(doc(db, coll, recId));
                // console.log('id', recDoc.id, recDoc.data());
                let rec = recDoc.data();
                rec['id'] = recDoc.id;
                rec['author'] = author;
                return rec;
            }))
        }

        const uid = req.params.id
        const authorDoc = await getDoc(doc(db, 'users', uid));
        const author = authorDoc.data()['name'];
        const userData = (await getDoc(doc(db, 'users', uid))).data()

        const result = {'recipes': [], 'pending_recipes': []};
        if (userData['myRecipes']) {
            result['recipes'] = await getRec(userData['myRecipes'], 'recipes');
        }
        if (userData['pendingRecipes']) {
            result['pending_recipes'] = await getRec(userData['pendingRecipes'], 'pending_recipes');
        }
        // console.log('results', result);
        
        // console.log(recipes)
        res.status(200).json(result);
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

router.get("/favorites/:id", async (req, res) => {
    try {
        const uid = req.params.id;
        const userDoc = await getDoc(doc(db, 'users', uid));
        let favoritedRecipes = userDoc.data()['favoriteMeals'] || [];

        
        favoritedRecipes = await Promise.all(favoritedRecipes.map(async (recId) => {
            const recDoc = await getDoc(doc(db, 'recipes', recId));
            let rec = recDoc.data();
            rec['id'] = recDoc.id;
            return rec;
        }));
        
        res.status(200).json(favoritedRecipes);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});


router.post("/unfavorite", async (req, res) => {
    try {
        const { uid, recipeId } = req.body;
        const userRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userRef);
        let favoriteMeals = userDoc.data().favoriteMeals || [];
        
        favoriteMeals = favoriteMeals.filter(id => id !== recipeId);
        
        await updateDoc(userRef, { favoriteMeals });
        
        res.status(200).send({ message: "Recipe unfavorited successfully" });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});




export default router;


