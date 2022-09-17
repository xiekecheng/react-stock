import StockList from '../components/StockList';
import AutoComplete from '../components/AutoComplete';
import { WatchListContenxtProvide } from '../context/watchListContext';
const StockOverviewPage = () => {
	return (
		<main className='container'>
			<WatchListContenxtProvide>
				<AutoComplete />
				<StockList />
			</WatchListContenxtProvide>
		</main>
	);
};
export default StockOverviewPage;
