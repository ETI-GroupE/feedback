import express from 'express';
import { Response, Request } from "express";
import { writePool } from "../../db";


const app = express();
export default app;

app.get('/feedbacks', async (req: Request, res: Response) => {
    console.log('/feedbacks (GET)')
    const { product_id, user_id, limit, offset } = req.query;

    let productIdCondition = '';
    if (Array.isArray(product_id)) {
        productIdCondition = `product_id IN (${product_id.join(", ")})`
    } else {
        productIdCondition = `${product_id === undefined ? "" : `product_id = ${product_id}`}`
    }

    let userIdCondition = '';
    if (Array.isArray(user_id)) {
        userIdCondition = `user_id IN (${user_id.join(", ")})`
    } else {
        userIdCondition = `${user_id === undefined ? "" : `user_id = ${user_id}`}`
    }

    const conditionString = [productIdCondition, userIdCondition].filter(i => i !== '')

    writePool.query(
        `
        SELECT * FROM feedback
        ${conditionString.length ? 'WHERE' : ''} 
        ${conditionString.join(" AND ")}
        ORDER BY created_at_date DESC
        LIMIT ${limit ? limit : 10}
        OFFSET ${offset ? offset : 0};
        `,
        (err, result) => {
            const feedback = [];
            console.log(err, result)
            if (err) {
                res.status(400);
            } else {
                res.status(200);

                // @ts-ignore
                result.forEach(row => {
                    const date = new Date(row.created_at_date)
                    row.created_at_date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                });
                // @ts-ignore
                feedback.push(...result)
            }

            res.send(feedback)
        })

})

app.get('/feedbacks/stats', async (req: Request, res: Response) => {
    console.log('/feedbacks/stats (GET)')
    const { product_id } = req.query;

    if ([product_id].includes(undefined)) {
        res.status(400);
        res.send();
        return;
    }

    writePool.query(
        `
        SELECT * FROM feedback
        WHERE product_id = ?
        ORDER BY created_at_date DESC
        `,
        [product_id],
        (err, result) => {
            const feedback = {
                rating: 0,
                feedbacks: [],
            };
            if (err) {
                res.status(400);
            } else {
                res.status(200);

                let tempTotalRating = 0;
                let tempNumberRating = 0;

                // @ts-ignore
                result.forEach(row => {
                    const date = new Date(row.created_at_date)
                    feedback.feedbacks.push({
                        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                        description: row.description
                    })

                    tempTotalRating += row.rating;
                    tempNumberRating++
                });
                feedback.rating = Math.round(tempTotalRating / tempNumberRating)
            }

            res.send(feedback)
        })

})

app.get('/feedbacks/length', async (req: Request, res: Response) => {
    console.log('/feedbacks/length (GET)')
    const { product_id, user_id } = req.query;

    let productIdCondition = '';
    if (Array.isArray(product_id)) {
        productIdCondition = `product_id IN (${product_id.join(", ")})`
    } else {
        productIdCondition = `${product_id === undefined ? "" : `product_id = ${product_id}`}`
    }

    let userIdCondition = '';
    if (Array.isArray(user_id)) {
        userIdCondition = `user_id IN (${user_id.join(", ")})`
    } else {
        userIdCondition = `${user_id === undefined ? "" : `user_id = ${user_id}`}`
    }

    const conditionString = [productIdCondition, userIdCondition].filter(i => i !== '')

    writePool.query(
        `
        SELECT COUNT(*) as count FROM feedback
        ${conditionString.length ? 'WHERE' : ''}
        ${conditionString.join(" AND ")};
        `,
        (err, result) => {
            const feedback = {};
            if (err) {
                res.status(400);
            } else {
                res.status(200);

                // @ts-ignore
                feedback["count"] = result[0].count
            }

            res.send(feedback)
        })

})