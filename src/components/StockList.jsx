import { useEffect, useState, useContext } from 'react';
import { fetchData } from '../api/finnHub';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { useWatchListContext } from '../context/watchListContext';
// import {useNavigate} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
const StockList = () => {
	// const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AAPL']);
	const [stock, setStock] = useState([]);
	const { watchList, deleteStock } = useWatchListContext();

	const navigate = useNavigate()

	const selectRow = (symbol) => {
		navigate(`/detail/${symbol}?a=111`)
	}

	useEffect(() => {
		let isMounted = true;
		const getData = async () => {
			console.log('isMounted',isMounted);
			const apis = watchList.map((item) => {
				return fetchData(item);
			});
			const response = await Promise.all(apis).catch(e=>{
				console.log('e',e);
			});
			console.log('response', response);
			response&&setStock(response);
		};
		if (isMounted) {
			getData();
		}

		return () => {
			isMounted = false;
		};
	}, [watchList]);
	return (
		<main>
			<table className='table hover mt-5'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Last</th>
						<th>Chg</th>
						<th>Chg%</th>
						<th>High</th>
						<th>Low</th>
						<th>Open</th>
						<th>Pclose</th>
					</tr>
				</thead>
				<tbody>
					{stock.map((item, index) => {
						const { c, d, dp, h, l, o, pc } = item.data;
						return (
							<tr key={index} className='table-row' onClick={()=>selectRow(item.config.params.symbol)}>
								<th>{item.config.params.symbol}</th>
								<td className={`text-${c > 0 ? 'success' : 'danger'}`}>
									{c}
									{c > 0 ? <BsCaretUpFill /> : <BsCaretDownFill />}
								</td>
								<td className={`text-${d > 0 ? 'success' : 'danger'}`}>
									{d}
									{d > 0 ? <BsCaretUpFill /> : <BsCaretDownFill />}
								</td>
								<td>{dp}</td>
								<td>{h}</td>
								<td>{l}</td>
								<td>{o}</td>
								<td>
									{pc}
									<button
										type='button'
										class='btn btn-danger delete-btn'
										onClick={(e) => {
											e.stopPropagation()
											deleteStock(item.config.params.symbol);
										}}
									>
										Danger
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</main>
	);
};
export default StockList;
