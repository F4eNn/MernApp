import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Input } from '../ui/Input';

export const Item = () => {
	return (
		<li className='flex justify-between'>
			<div className='flex items-center gap-6'>
				<Input
					type='checkbox'
					className='form-checkbox hover:bg-gray checked:bg-primary focus:checked:bg-primary hover:checked:bg-primary/70 colors-300 h-10 w-10 cursor-pointer rounded-full'
				/>
				<span className='text-xl'>10 minutes meditation</span>
			</div>
			<button aria-label='delete task' className='colors-300 p-3 hover:text-red-700'>
				<MdDelete size='25px' />
			</button>
		</li>
	);
};
