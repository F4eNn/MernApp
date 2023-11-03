import { Schema, model, HydratedDocumentFromSchema } from 'mongoose';

const todoSchema = new Schema(
	{
		todo: {
			type: String,
			required: true,
		},
		isDone: {
			type: Boolean,
			require: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
	},
	{ timestamps: true },
);

export const Todo = model('Todo', todoSchema);

export type TodoType = Pick<HydratedDocumentFromSchema<typeof todoSchema>, 'save' | 'todo' | 'isDone'>;
