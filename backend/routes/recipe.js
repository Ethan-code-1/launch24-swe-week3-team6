import express from "express";
import dotenv from "dotenv";

import {db} from "./../firebase.js";
import { collection, getDocs, updateDoc, doc, addDoc, getDoc, deleteDoc, query, where } from "firebase/firestore";

const router = express.Router();
dotenv.config();

// get diff categories
// get diff categories
// get diff categories
router.get("/:id", async (req, res) => {
    try {
        const rid = req.params.id;
        const recDoc = await getDoc(doc(db, 'recipes', rid));
        const rec = recDoc.data();

        let reviews = await getDocs(collection(db, 'recipes', rid, 'reviews'));

        let reviewTotal = 0;
        let count = 0;
        let totalComments = 0; // Initialize total comments counter

        if (reviews) {
            reviews = await Promise.all(reviews.docs.map(async (review) => {
                let revData = review.data();
                reviewTotal += revData.rating;
                count += 1; // Count the review itself
                totalComments += 1; // Add to total comments

                const userDoc = await getDoc(doc(db, 'users', revData.uid));
                const userData = userDoc.data();
                revData['user'] = userData;
                revData['id'] = review.id;

                revData['replies'] = await Promise.all(revData.replies.map(async (rep) => {
                    totalComments += 1; // Count each reply
                    const uDoc = await getDoc(doc(db, 'users', rep.uid));
                    rep['user'] = uDoc.data();
                    return rep;
                }));
                return revData;
            }));
        } else {
            reviews = [];
        }

        // Calculate average rating
        let averageRating = count === 0 ? 0 : reviewTotal / count;
        console.log(totalComments)

        res.json({
            rec,
            reviews,
            averageRating,
            count,
            totalComments // Include total comments in the response
        });
    } catch (e) {
        console.error("Error fetching data", e);
        res.status(500).send("Internal Server Error");
    }
});



router.get("/reviews/:id", async (req, res) => {
    try {
        const rid = req.params.id
        const recDoc = await getDoc(doc(db, 'recipes', rid));
        const rec = recDoc.data();

        let reviews = await getDocs(collection(db, 'recipes', rid, 'reviews'));
        // console.log(reviews);
        if (reviews) {
            reviews = await Promise.all(reviews.docs.map(async (review) => {
                let revData = review.data();
                const userDoc = await getDoc(doc(db, 'users', revData.uid));
                const userData = userDoc.data();
                revData['user'] = userData;
                revData['id'] = review.id;
                revData['replies'] = await Promise.all(revData.replies.map(async (rep) => {
                    const uDoc = await getDoc(doc(db, 'users', rep.uid));
                    rep['user'] = uDoc.data();
                    return rep;
                }))
                return revData;
            }));
            // console.log
        } else {
            reviews = [];
        }

        res.status(200).json({'rec': rec, 'revs': reviews});
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.put("/review/:id", async (req, res) => {
    try {
        const rid = req.params.id;
        console.log(req.body);
        await addDoc(collection(db, 'recipes', rid, 'reviews'), req.body)
        res.status(200).send("Added Successfully!");
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.put("/comment/:id", async (req, res) => {
    try {
        const rid = req.params.id;
        const data = req.body;
        console.log(data);
        const revDocRef = doc(db, 'recipes', rid, 'reviews', data.revId);
        const revDoc = await getDoc(revDocRef)
        const replies = revDoc.data()['replies'];
        replies.push({uid: data.uid, content: data.reply, time: data.timestamp});
        await updateDoc(revDocRef, {replies: replies});
        res.status(200).send("Added Successfully!");
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})


export default router;