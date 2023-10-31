import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { Input } from '../ui/Input';
import { TodoItem } from '../../types/types';
import { Link } from 'react-router-dom';

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
				<Link aria-label='edit task' to={`/edit/${_id}`} state={{ todo }} className='colors-300 hover:text-primary p-3'>
					<FiEdit size='25px' />
				</Link>
				<button aria-label='delete task' className='colors-300 hover:text-error p-3'>
					<MdDelete size='25px' />
				</button>
			</div>
		</li>
	);
};
