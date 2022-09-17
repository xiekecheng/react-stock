import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import StockDetailPage from './pages/StockDetailPage';
import StockOverviewPage from './pages/StockOverviewPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<StockOverviewPage />} />
				<Route path='/detail/:symbol' element={<StockDetailPage />} />
			</Routes>
		</Router>
	);
}

export default App;
