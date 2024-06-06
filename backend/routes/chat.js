import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import OpenAI from "openai";

const router = express.Router();
dotenv.config();

router.use(express.json());
router.use(cors());


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("", async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({
            error: "Invalid input: 'messages' should be an array.",
        });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

      res.json(response.choices[0].message);
      // console.log(response.choices[0].message.content);
    } catch (error) {
        console.error("Error communicating with OpenAI API:", error);
        res.status(500).json({
            error: "An error occurred while processing your request.",
        });
    }
});


export default router;