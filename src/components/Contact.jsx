import React from "react";
import editImg from "../assets/icons/edit.png";
import binImg from "../assets/icons/bin.png";

const Contact = ({
	index,
	selectedContacts,
	toggleSelect,
	contact,
	deleteHandler,
	editHandler,
	isGroupSelect,
}) => {
	return (
		<div key={index} className="w-full h-16 bg-slate-100 flex items-center justify-between px-5 rounded-xl">
			{isGroupSelect && (
				<input
					type="checkbox"
					checked={selectedContacts.includes(index)}
					onChange={() => toggleSelect(index)}
                    className="mr-2"
				/>
			)}
			<div className="flex w-3/4 items-center justify-between">
				<p>{contact.name}</p>
				<p>{contact.email}</p>
				<p>{contact.job}</p>
			</div>
			<div className="w-1/4 flex justify-end gap-3">
            <button onClick={() => deleteHandler(index)} className="bg-red-100 w-9 h-9 flex items-center justify-center rounded-md">
				<img src={binImg} alt="icon" className="w-6 h-6"/>
			</button>
			<button onClick={() => editHandler(index)} className="bg-[#ddd] w-9 h-9 flex items-center justify-center rounded-md">
				<img src={editImg} alt="icon" className="w-6 h-6"/>
			</button>
            </div>
		</div>
	);
};

export default Contact;
