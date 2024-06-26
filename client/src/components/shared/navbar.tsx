import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useCreatePost } from '@/hooks/use-create-post'
import CreatePost from '../create-post'

function Navbar() {
	const { onOpen } = useCreatePost()

	return (
		<>
			<div className='w-full h-24 bg-gray-900 fixed inset-0'>
				<div className='w-full h-full flex justify-between items-center container'>
					<Link className='flex items-center justify-center gap-2 ml-2' to={'/'}>
						<img src={'/vite.svg'} />
						<p className='font-bold text-4xl'>AUTH</p>
					</Link>

					<div className='flex gap-2'>
						<Button className='rounded-full font-bold' size={'lg'} variant={'outline'} onClick={onOpen}>
							Create Post
						</Button>
						<Link to={'/auth'}>
							<Button size={'lg'} className='rounded-full font-bold'>
								Login
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<CreatePost />
		</>
	)
}

export default Navbar