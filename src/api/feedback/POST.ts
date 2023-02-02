import express from 'express';
import e, { Response, Request } from "express";
import { writePool } from "../../db";


const app = express();
export default app;

app.post('/feedback', async (req: Request, res: Response) => {
    console.log('/feedback (POST)')
    upsert(req, res)
})

export async function upsert(req: Request, res: Response) {
    const { user_id, product_id, rating, description } = req.body;

    if ([user_id, product_id, rating, description].includes(undefined)) {
        res.status(400);
        res.send();
        return;
    }

    writePool.query(
        `
            INSERT INTO feedback(user_id, product_id, rating, description) VALUES (?, ?, ?, ?)
        `,
        [user_id, product_id, rating, description],
        (err, result) => {
            if (err) {
                res.status(400);
            } else {
                res.status(200);
            }

            res.send()
        })
}