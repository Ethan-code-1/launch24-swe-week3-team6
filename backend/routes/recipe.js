import express from "express";
import dotenv from "dotenv";

import {db} from "./../firebase.js";
import { collection, getDocs, updateDoc, doc, addDoc, getDoc, deleteDoc, query, where } from "firebase/firestore";

const router = express.Router();
dotenv.config();

// get diff categories
router.get("/:id", async (req, res) => {
    try {
        const rid = req.params.id
        const recDoc = await getDoc(doc(db, 'recipes', rid));
        const rec = recDoc.data();
        res.status(200).json(rec);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})


export default router;