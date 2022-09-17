import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import {fetchCandleData} from '../api/finnHub.js'
const StockDetailPage = () => {
	const {symbol} = useParams();
	let [searchParams, setSearchParams] = useSearchParams();
	console.log('searchParams', searchParams.toString());
	// console.log('param', param);
	useEffect(() => {
		console.log('searchParams', searchParams);
		const fetchData = async ()=>{
			const date = new Date()
			const currentTime = Math.floor(date.getTime()/1000)
			const threeDaysAgo = currentTime-3*60*60*24
			const params = {
				symbol,
				resolution:30,
				from:threeDaysAgo,
				to:currentTime
			}
			const response = await fetchCandleData(params)
			console.log('response',response);
		}
		fetchData()
		return () => {};
	}, []);

	return (
		<main>
			<h1>StockDetailPage</h1>
		</main>
	);
};
export default StockDetailPage;
