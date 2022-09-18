import { useEffect, useState, useMemo } from 'react';
import { fetchCorpsData } from '../api/finnHub';
import debounce from 'lodash.debounce';
import { useWatchListContext } from '../context/watchListContext';
const AutoComplete = () => {
	const [search, setSearch] = useState('');
	const [result, setResult] = useState([]);
	const { addStock } = useWatchListContext();
	const eventHandler = (e) => {
		setSearch(e.target.value);
	};
	// 渲染Dropdown组件
	const renderDropDown = () => {
		const showClass = search.length ? 'show' : null;
		return (
			<ul
				style={{
					height: '300px',
					overflowY: 'scroll',
					overflowX: 'hidden',
					cursor: 'pointer',
				}}
				className={`dropdown-menu ${showClass}`}
			>
				{result.map((item) => (
					<li
						key={item.symbol}
						className='dropdown-item'
						onClick={() => {
							addStock(item.symbol);
							setSearch('')
						}}
					>
						{item.symbol}
					</li>
				))}
			</ul>
		);
	};

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			const response = await fetchCorpsData(search);
			setResult(response.data.result);
		};
		if (search.length) {
			isMounted && fetchData();
		} else {
			setResult([]);
		}

		return () => {
			isMounted = false;
		};
	}, [search]);
	return (
		<main className='w-50 mx-auto mt-30'>
			<div className='form-floating dropdown'>
				<input
					type='text'
					className='form-control'
					id='exampleFormControlInput1'
					placeholder='Search'
					value={search}
					onChange={eventHandler}
				/>
				<label htmlFor='exampleFormControlInput1'>Search</label>
				{renderDropDown()}
			</div>
		</main>
	);
};
export default AutoComplete;
