import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCandleData } from '../api/finnHub.js';
import Chart from 'react-apexcharts';
import StockInfo from '../components/StockInfo';

const StockDetailPage = () => {
	const { symbol } = useParams();
	const [series, setSeries] = useState([]);
	const [currentDate, setCurrentDate] = useState('24h');
	const options = {
		chart: {
			type: 'candlestick',
			height: 350,
		},
		title: {
			text: 'CandleStick Chart',
			align: 'left',
		},
		xaxis: {
			type: 'datetime',
			labels: {
				dateTimeUTC: false,
			},
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	};
	useEffect(() => {
		const fetchData = async () => {
			const date = new Date();
			const currentTime = Math.floor(date.getTime() / 1000);
			const threeDaysAgo = currentTime - 3 * 60 * 60 * 24;
			const oneDay = currentTime - 3 * 60 * 60 * 24;
			const oneWeek = currentTime - 7 * 60 * 60 * 24;
			const oneYear = currentTime - 365 * 60 * 60 * 24;
			let from;
			if (currentDate === '24h') {
				from = oneDay;
			} else if (currentDate === '7d') {
				from = oneWeek;
			} else {
				from = oneYear;
			}
			const params = {
				symbol,
				resolution: 30,
				from,
				to: currentTime,
			};

			const response = await fetchCandleData(params);
			const { c, h, l, o, t } = response.data;
			const data = t.map((time, index) => ({
				x: time,
				y: [c[index], h[index], l[index], o[index]],
			}));
			setSeries([{ name: 'chartData', data }]);
		};
		fetchData();
	}, [symbol, currentDate]);

	const dateFormat = (format) => {
		setCurrentDate(format);
	};

	const renderButtonSelect = (select) => {
		let classes = 'btn m-1 ';
		if (select === currentDate) {
			classes += 'btn-primary';
		} else {
			classes += 'btn-outline-primary';
		}
		return classes;
	};
	return (
		<main className='container'>
			<div>
				<div className='mt-10'>
					<Chart
						options={options}
						series={series}
						type='candlestick'
						height={350}
					/>
				</div>
				<button
					type='button'
					className={renderButtonSelect('24h')}
					onClick={() => dateFormat('24h')}
				>
					24h
				</button>
				<button
					type='button'
					className={renderButtonSelect('7d')}
					onClick={() => dateFormat('7d')}
				>
					7d
				</button>
				<button
					type='button'
					className={renderButtonSelect('1y')}
					onClick={() => dateFormat('1y')}
				>
					1y
				</button>
			</div>
			<StockInfo symbol={symbol}/>
		</main>
	);
};
export default StockDetailPage;
