import { Form } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Item } from '../components/tasks/Item';

const Index = () => {
	return (
		<>
			<Card id='progress'>
				<h1 className='text-2xl font-[500]'>Your Tasks</h1>
			</Card>
			<Card id='tasks' className='mt-10 py-8'>
				<Form className='flex gap-5'>
					<Input className='py-3' role='search' placeholder='Add your todo' />
					<Button type='submit' title='Add' className='w-[100px] rounded-md' />
				</Form>
				<Form className='mt-8'>
					<ul className='space-y-5'>
						<Item />
						<Item />
						<Item />
						<Item />
					</ul>
				</Form>
			</Card>
		</>
	);
};

export default Index;
