import { useState, useContext, createContext, useEffect } from 'react';
export const WatchListContext = createContext();
export const useWatchListContext = () => {
	return useContext(WatchListContext);
};
export const WatchListContenxtProvide = ({ children }) => {
	const [watchList, setWatchList] = useState(localStorage.getItem('watchList')?.split(',')??['GOOGL', 'MSFT', 'AAPL']);
	useEffect(() => {
		localStorage.setItem('watchList', watchList);
	}, [watchList]);
	// 增加 Stock
	const addStock = (stock) => {
		// 已存在则忽略
		if (watchList.includes(stock)) {
			return;
		}
		setWatchList([...watchList, stock]);
	};
	// 删除stock
	const deleteStock = (stock) => {
		setWatchList(watchList.filter((item) => item !== stock));
	};
	const contextValue = {
		watchList,
		setWatchList,
		addStock,
		deleteStock,
	};
	return (
		<WatchListContext.Provider value={contextValue}>
			{children}
		</WatchListContext.Provider>
	);
};
