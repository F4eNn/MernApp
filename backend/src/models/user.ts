import mongoose, { Schema, model, HydratedDocumentFromSchema } from 'mongoose';

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	todos: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Todo',
	},
});

export const User = model('User', userSchema);

export type UserModelType = Pick<
	HydratedDocumentFromSchema<typeof userSchema>,
	'email' | 'password' | 'todos' | 'save'
>;
