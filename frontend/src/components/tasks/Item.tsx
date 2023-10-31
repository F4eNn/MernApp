import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { Input } from '../ui/Input';
import { TodoItem } from '../../types/types';
import { Form } from 'react-router-dom';

export const Item = ({ todo, _id }: TodoItem) => {
	return (
		<li className='flex justify-between'>
			<div className='flex items-center gap-6'>
				<Input
					type='checkbox'
					className='form-checkbox hover:bg-gray checked:bg-primary focus:checked:bg-primary hover:checked:bg-primary/70 colors-300 h-10 w-10 cursor-pointer rounded-full'
				/>
				<span className='text-xl'>{todo}</span>
			</div>
			<div className='items-centers flex'>
				<Form method='PUT'>
					<input type='hidden' name='oldValue' value={todo} />
					<input type='hidden' name='todoID' value={_id} />
					<button aria-label='edit task' name='intent' value='edit-todo' className='colors-300 hover:text-primary p-3'>
						<FiEdit size='25px' />
					</button>
				</Form>
				<button aria-label='delete task' className='colors-300 hover:text-error p-3'>
					<MdDelete size='25px' />
				</button>
			</div>
		</li>
	);
};
