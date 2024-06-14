/** @format */

import { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { capital, numbers, samplee, small } from './data';

function App() {
	let [num, setNum] = useState(false);
	let [lower, setLower] = useState(false);
	let [upper, setUpper] = useState(false);
	let [sample, setSample] = useState(false);
	let [passLenght, setPassLenght] = useState(10);
	let [Password, setPassword] = useState('');

	let generate = () => {
		let charAt = '';
		let finalPass = '';
		if (num || lower || upper || sample) {
			if (num) charAt += numbers;
			if (lower) charAt += small;
			if (upper) charAt += capital;
			if (sample) charAt += samplee;

			for (let i = 0; i <= passLenght; i++) {
				finalPass += charAt.charAt(Math.floor(Math.random() * charAt.length));
			}
			setPassword(finalPass);
			toast.success('Passowrd generate success.');
		} else {
			toast.error('Please choose any of includes..');
		}
	};
	let copyPass = (e) => {
		if (Password !== '') {
			navigator.clipboard.writeText(Password);
			toast.success('Password Copyid');
		} else {
			let display = e.target.previousSibling;
			display.classList.add('per');
			display.value = '!..empty password';

			setTimeout(() => {
				e.target.previousSibling.classList.remove('per');
				display.value = '';
			}, 1000);

			toast.error('First generate password');
		}
	};

	return (
		<div className='container-fluid mt-5'>
			<ToastContainer />
			<div className='container mt-5 pt-5'>
				<div className='card p-2 bck'>
					<h4 className='fw-bold text-center py-4'>Generate Random Password</h4>
					<div className='d-flex'>
						<input value={Password} readOnly className='form-control' />
						<button
							id='display'
							className='btn btn-info fw-bold'
							onClick={(e) => copyPass(e)}>
							Copy
						</button>
					</div>
					<div className='between p-2'>
						<lavel className='fw-bold'>Password Lenght</lavel>
						<input
							type='number'
							max={20}
							min={10}
							onChange={(e) => setPassLenght(e.target.value)}
							value={passLenght}
						/>
					</div>
					<div className='between p-2'>
						<lavel className='fw-bold'>Include Numbers</lavel>
						<input value={num} onChange={(e) => setNum(!num)} type='checkbox' />
					</div>
					<div className='between p-2'>
						<lavel className='fw-bold'>Include lower letters</lavel>
						<input
							value={lower}
							onChange={(e) => setLower(!lower)}
							type='checkbox'
						/>
					</div>
					<div className='between p-2'>
						<lavel className='fw-bold'>Include upper letters</lavel>
						<input
							value={upper}
							onChange={(e) => setUpper(!upper)}
							type='checkbox'
						/>
					</div>
					<div className='between p-2'>
						<lavel className='fw-bold'>Include Symbols</lavel>
						<input
							value={sample}
							onChange={(e) => setSample(!sample)}
							type='checkbox'
						/>
					</div>
					<button onClick={generate} className='btn fw-bold btn-info my-4'>
						Generate Password
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
