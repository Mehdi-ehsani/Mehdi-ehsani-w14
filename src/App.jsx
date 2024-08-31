import { useState, useEffect } from "react";
import searchImg from "./assets/icons/search.png";
import AddContactModal from "./components/AddContactModal";
import EditContactModal from "./components/EditContactModal";

function App() {
	const [searchText, setSearchText] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [contacts, setContacts] = useState([]);
	const [editContact , setEditContact] = useState({})
	const [index , setIndex] = useState(0)
	useEffect(() => {
		setContacts(JSON.parse(localStorage.getItem("contacts")) || []);
	}, []);
   const deleteHandler = (index) => {
     const filteredContacts = contacts.filter((item , itemIndex) => itemIndex !== index);
	 setContacts(filteredContacts)
	 localStorage.setItem("contacts" , JSON.stringify(filteredContacts))
   }

   const editHandler = (index) => {
	setIsEdit(true)
	setIndex(index)
	const filteredContacts = contacts.filter((item , itemIndex) => {
		if(itemIndex === index ) {
			return item
		}
	});
	setEditContact(filteredContacts[0])
	console.log(filteredContacts[0])
   }
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

			<div className="flex items-center h-fit w-full justify-between py-4">
				<h1 className="text-2xl font-semibold text-green-600">مخاطب ها</h1>
				<div className="flex gap-3">
					<button className="h-10 w-28 text-white text-lg rounded-lg shadow-md bg-blue-600">
						انتخاب گروهی
					</button>
					<button
						onClick={() => setIsOpen(true)}
						className="h-10 w-28 text-white text-lg rounded-lg shadow-md bg-green-600"
					>
						اضافه کردن
					</button>
				</div>
			</div>
			<AddContactModal
				isOpen={isOpen}
				onClose={() => {setIsOpen(false); setIsEdit(false)}}
				contacts={contacts}
			/>
			<EditContactModal
			    isEdit={isEdit}
				onClose={() => {setIsOpen(false); setIsEdit(false)}}
				contacts={contacts}
				editContact={editContact}
				setEditContact={setEditContact}
				index={index}
			/>
			<div className="flex flex-col gap-5">
				{contacts.length ? (
					contacts.map((contact , index) => <div key={index}>
						<p>{contact.name}</p>
						<p>{contact.email}</p>
						<p>{contact.job}</p>
						<button onClick={() => deleteHandler(index)} className="bg-red-600">delete</button>
						<button onClick={() => editHandler(index)} className="bg-sky-600">edit</button>
					</div>)
				) : (
					<h1>no contatct</h1>
				)}
			</div>
		</>
	);
}

export default App;
