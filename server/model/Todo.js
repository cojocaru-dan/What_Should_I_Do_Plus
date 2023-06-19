import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todoSchema = new Schema({
    title: String,
    comment: String,
    createdAt: Date
});

export const TodoModel = model("todo", todoSchema);

