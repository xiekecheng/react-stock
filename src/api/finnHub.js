import axios from './axios';

// 获取数据
export const fetchData = (symbol) => {
	return axios.get('/quote', {
		params: {
			symbol: symbol,
		},
	});
};

// 获取公司名缩写
export const fetchCorpsData = (query) => {
	return axios.get('/search', {
		params: {
			q: query,
		},
	});
};

// 获取图表数据
export const fetchCandleData = (params) => {
	return axios.get('/stock/candle', {
		params,
	});
};
