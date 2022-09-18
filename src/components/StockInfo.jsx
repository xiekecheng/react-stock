import { useEffect, useState } from 'react';
import { fetchStockInfo } from '../api/finnHub.js';
const StockInfo = ({ symbol }) => {
	const [data, setData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetchStockInfo(symbol);
			console.log('response', response);
			setData(response.data)
		};
		fetchData();
	}, [symbol]);
	return (
		<div>
			<h1>StockInfo</h1>
			<div className='row border bg-white rounded p-4 mt-5'>
				<div className='col'>
					<div>
						<span className='fw-bold me-3'>name:</span>{data.name}
					</div>
					<div>
						<span className='fw-bold me-3'>country:</span>{data.country}
					</div>
					<div>
						<span className='fw-bold me-3'>ticker:</span>{data.ticker}
					</div>
				</div>
				<div className='col'>
					<div>
						<span className='fw-bold me-3'>ipo:</span>{data.ipo}
					</div>
					<div>
						<span className='fw-bold me-3'>exchange:</span>{data.exchange}
					</div>
					<div>
						<span className='fw-bold me-3'>currency:</span>{data.currency}
					</div>
				</div>
				<div className='col'>
					<div>
						<span className='fw-bold me-3'>marketCapitalization:</span>{data.marketCapitalization}
					</div>
					<div>
						<span className='fw-bold me-3'>phone:</span>{data.phone}
					</div>
					<div>
						<span className='fw-bold me-3'>weburl:</span><a href={data.weburl} target='_blank'>data.weburl</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StockInfo;
