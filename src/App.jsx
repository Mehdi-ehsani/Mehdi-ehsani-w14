import { useState } from "react";
import searchImg from "./assets/icons/search.png";

function App() {
	const [searchText, setSearchText] = useState("");
	return (
		<>
			<nav className="flex items-center justify-between w-full h-[80px] border-b-2 border-slate-200">
				<h1 className="text-3xl font-bold">مخاطب ها</h1>
				<div className="flex items-center h-10 w-96 py-2 pr-2 bg-slate-100 shadow-sm rounded-lg">
					<input
						className="w-full h-full outline-none border-none bg-transparent"
						type="text"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<img src={searchImg} alt="icon" className="h-10" />
				</div>
			</nav>
			<h1 className="text-indigo-600">سلام</h1>
		</>
	);
}

export default App;
