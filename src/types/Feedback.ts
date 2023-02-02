export type Feedback = {
    feedback_id: number;
    created_at_date: Date;
    user_id: number;
    product_id: number;
    rating: number;
    description: string;
}