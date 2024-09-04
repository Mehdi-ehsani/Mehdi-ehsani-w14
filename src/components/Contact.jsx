import React from "react";
import editImg from "../assets/icons/edit.webp";
import binImg from "../assets/icons/bin.webp";

const Contact = (props) => {
	const {index, selectedContacts, toggleSelect, contact, deleteHandler, editHandler, isGroupSelect,} = props;
	return (
		<div
			key={index}
			className="sm:w-full w-[300px] sm:h-16 sm:py-0 p-5  bg-slate-100 flex items-center justify-between rounded-xl flex-col sm:flex-row"
		>
			{isGroupSelect && (
				<input
					type="checkbox"
					checked={selectedContacts.includes(index)}
					onChange={() => toggleSelect(index)}
					className="mr-2"
				/>
			)}
			<div className="flex w-3/4 items-center justify-between text-lg flex-col sm:flex-row">
				<p>{contact.name}</p>
				<p>{contact.email}</p>
				<p className="text-blue-500">{contact.job}</p>
			</div>
			<div className="sm:w-1/4 w-full items-center mt-5 sm:mt-0 justify-center flex sm:justify-end gap-3 ">
				<button
					onClick={() => deleteHandler(index)}
					className="bg-red-100 w-9 h-9 flex items-center justify-center rounded-md"
				>
					<img src={binImg} alt="icon" className="w-6 h-6" />
				</button>
				<button
					onClick={() => editHandler(index)}
					className="bg-[#ddd] w-9 h-9 flex items-center justify-center rounded-md"
				>
					<img src={editImg} alt="icon" className="w-6 h-6" />
				</button>
			</div>
		</div>
	);
};

export default Contact;
