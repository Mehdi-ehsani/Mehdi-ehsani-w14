import { useState, useEffect } from "react";
import searchImg from "./assets/icons/search.png";
import binImg from "./assets/icons/bin.png";
import readImg from "./assets/icons/read.png";
import addImg from "./assets/icons/add.png";
import emptyImg from "./assets/icons/empty.png";

import AddContactModal from "./components/AddContactModal";
import EditContactModal from "./components/EditContactModal";
import Contact from "./components/Contact";

function App() {
	const [searchText, setSearchText] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [contacts, setContacts] = useState([]);
	const [filteredContacts, setFilteredContacts] = useState([]);
	const [editContact, setEditContact] = useState(null);
	const [index, setIndex] = useState(0);
	const [isGroupSelect, setIsGroupSelect] = useState(false);
	const [selectedContacts, setSelectedContacts] = useState([]);

	useEffect(() => {
		const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
		setContacts(storedContacts);
		setFilteredContacts(storedContacts);
	}, []);

	const deleteHandler = (index) => {
		const filteredContacts = contacts.filter(
			(item, itemIndex) => itemIndex !== index
		);
		setContacts(filteredContacts);
		setFilteredContacts(filteredContacts);
		localStorage.setItem("contacts", JSON.stringify(filteredContacts));
	};

	const deleteSelectedHandler = () => {
		const filteredContacts = contacts.filter(
			(contact, index) => !selectedContacts.includes(index)
		);
		setContacts(filteredContacts);
		setFilteredContacts(filteredContacts);
		localStorage.setItem("contacts", JSON.stringify(filteredContacts));
		setSelectedContacts([]);
	};

	const editHandler = (index) => {
		setIsEdit(true);
		setIndex(index);
		const filteredContacts = contacts.filter((item, itemIndex) => {
			if (itemIndex === index) {
				return item;
			}
		});
		setEditContact(filteredContacts[0]);
	};

	const searchHandler = (event) => {
		const query = event.target.value.toLowerCase();
		setSearchText(query);

		const newFilteredContacts = contacts.filter((contact) => {
			return (
				contact.name.toLowerCase().includes(query) ||
				contact.email.toLowerCase().includes(query)
			);
		});
		setFilteredContacts(newFilteredContacts);
	};

	const toggleSelect = (index) => {
		if (selectedContacts.includes(index)) {
			setSelectedContacts(selectedContacts.filter((i) => i !== index));
		} else {
			setSelectedContacts([...selectedContacts, index]);
		}
	};

	return (
		<>
			<nav className="flex items-center justify-between w-full sm:h-[80px] h-fit border-b-2 border-slate-200 2xl:p-0 gap-5 sm:flex-row p-5 flex-col">
				<h1 className="text-2xl font-bold text-[#222] "><span className="px-1 bg-blue-500 text-white rounded-lg">Contacts</span> App</h1>
				<div className="flex items-center h-10 sm:w-96 w-full py-2 pr-2 bg-slate-100 shadow-sm rounded-lg">
					<img src={searchImg} alt="icon" className="h-7 w-7 ml-2" />
					<input
						className="w-full h-full outline-none border-none bg-transparent"
						type="text"
						value={searchText}
						onChange={searchHandler}
					/>
				</div>
			</nav>

			<div className="flex items-center h-fit w-full justify-between py-4 px-5 2xl:px-0">
				<h1 className="text-2xl font-semibold text-[#222]">Contacts</h1>
				<div className="flex gap-3">
					{isGroupSelect && (
						<button
							onClick={deleteSelectedHandler}
							className="flex items-center justify-center h-10 w-10 text-white text-lg rounded-full shadow-md bg-red-100 hover:bg-red-300 transition-colors"
						>
							<img src={binImg} alt="icon"  className="w-6 h-6"/> 
						</button>
					)}
					<button
						className="flex items-center justify-center h-10 w-10 text-white text-lg rounded-full shadow-md bg-blue-100 hover:bg-blue-300 transition-colors"
						onClick={() => setIsGroupSelect(!isGroupSelect)}
					>
							<img src={readImg} alt="icon"  className="w-7 h-7"/> 
						
					</button>
					<button
						onClick={() => setIsOpen(true)}
						className="flex items-center justify-center h-10 w-10 text-white text-lg rounded-full shadow-md bg-green-100 hover:bg-green-300 transition-colors"
					>
							<img src={addImg} alt="icon"  className="w-8 h-8"/> 
						
					</button>
				</div>
			</div>
			<AddContactModal
				isOpen={isOpen}
				onClose={() => {
					setIsOpen(false);
					setIsEdit(false);
				}}
				contacts={contacts}
			/>
			<EditContactModal
				isEdit={isEdit}
				onClose={() => {
					setIsOpen(false);
					setIsEdit(false);
				}}
				contacts={contacts}
				editContact={editContact}
				setEditContact={setEditContact}
				index={index}
			/>
			<div className="flex items-center flex-col gap-5 2xl:p-0 px-5">
				{filteredContacts.length ? (
					filteredContacts.map((contact, index) => (
						<Contact
							key={index}
							contact={contact}
							index={index}
							deleteHandler={deleteHandler}
							editHandler={editHandler}
							selectedContacts={selectedContacts}
							toggleSelect={toggleSelect}
							isGroupSelect={isGroupSelect}
						/>
					))
				) : (
					<div className="w-full h-full flex flex-col items-center justify-center">
						<img src={emptyImg} alt="empty-icon" className="w-[300px] h-[300px] sm:w-[600px] sm:h-[600px]" />
						<h1 className="text-3xl font-bold text-blue-500">Contacts is empty</h1>
					</div>	
				)}
			</div>
		</>
	);
}

export default App;
