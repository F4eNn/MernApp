import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { Input } from '../ui/Input';
import { TodoItem } from '../../types/types';
import { Form, Link } from 'react-router-dom';
import { cn } from '../../utils/utils';

export const Item = ({ todo, _id }: TodoItem) => {
	let isDone;
	return (
		<li className='flex justify-between'>
			<Form method='POST' className='flex items-center gap-6'>
				<input type='hidden' name='todoID' value={_id} />
				<button type='submit' name='intent' value={'todo-is-done'}>
					<Input
						checked={isDone === true}
						readOnly
						type='checkbox'
						className='form-checkbox hover:bg-gray checked:bg-primary focus:checked:bg-primary hover:checked:bg-primary/70 colors-300 h-10 w-10 cursor-pointer rounded-full'
					/>
				</button>
				<span className={cn('text-xl ', isDone && 'italic line-through')}>{todo}</span>
			</Form>
			<div className='items-centers flex'>
				<Link aria-label='edit task' to={`/edit/${_id}`} state={{ todo }} className='colors-300 git hover:text-primary p-3'>
					<FiEdit size='25px' />
				</Link>
				<Form method='DELETE'>
					<input type='hidden' name='todoID' value={_id} />
					<button
						aria-label='delete task'
						name='intent'
						value='delete-todo'
						type='submit'
						className='colors-300 hover:text-error p-3'
					>
						<MdDelete size='25px' />
					</button>
				</Form>
			</div>
		</li>
	);
};
