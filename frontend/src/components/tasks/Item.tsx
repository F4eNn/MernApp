import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineCheck } from 'react-icons/ai';

import { TodoItem } from '../../types/types';
import { Form, Link } from 'react-router-dom';
import { cn } from '../../utils/utils';

export const Item = ({ todo, _id, isDone: status }: TodoItem) => {
	let isDone = status;
	return (
		<li className='flex justify-between'>
			<Form method='POST' className='flex items-center gap-6'>
				<input type='hidden' name='todoID' value={_id} />
				<input type='hidden' name='isDoneTodo' value={JSON.stringify(isDone)} />
				<button
					type='submit'
					name='intent'
					value='todo-is-done'
					className={cn(
						' colors-300  flex h-10 w-10 items-center justify-center rounded-full border-[1px] text-white',
						isDone && 'bg-primary hover:bg-primary/80',
						!isDone && 'border-secondary hover:bg-secondary/10 ',
					)}
				>
					{isDone && <AiOutlineCheck size='25px' />}
				</button>
				<span className={cn('text-xl ', isDone && 'italic line-through text-secondary')}>{todo}</span>
			</Form>
			<div className='items-centers flex '>
				{!isDone && (
					<Link
						aria-label='edit task'
						to={`/edit/${_id}`}
						state={{ todo }}
						className='colors-300 git hover:text-primary p-3'
					>
						<FiEdit size='25px' />
					</Link>
				)}
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
