import userImg from "../assets/icons/user.png";
import emailImg from "../assets/icons/email.png";
import jobImg from "../assets/icons/job.png";
import { useState } from "react";

const AddContactModal = ({ isOpen, onClose, contacts, setContacts }) => {

    const [contact, setContact] = useState({
		name: "",
		email: "",
		job: "",
	});
	const changeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		if (name === "name") {
			setContact({ ...contact, name: value });
		}
		if (name === "email") {
			setContact({ ...contact, email: value });
		}
		if (name === "job") {
			setContact({ ...contact, job: value });
		}
	};
	const addHandler = () => {
		contacts.push(contact);
		localStorage.setItem("contacts", JSON.stringify(contacts));
		setContact({
			name: "",
			email: "",
			job: "",
		});
		onClose();
	};
	return (
		<div
			dir="ltr"
			onClick={onClose}
			className={`fixed inset-0 flex items-center justify-center ${
				isOpen ? "visible bg-black/25" : "invisible"
			} `}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-[400px] h-fit rounded-2xl shadow bg-white flex flex-col gap-6 p-6"
			>
				<h1 className="text-2xl font-bold text-center">Add Contact</h1>
				<div className="flex w-full h-10 border-2 border-gray-200 py-1 px-2 gap-2 rounded-lg">
					<img src={userImg} alt="icon" className="w-7" />
					<input
						name="name"
						className="w-full outline-none border-none placeholder:text-gray-400"
						type="text"
						placeholder="Name"
						value={contact.name}
						onChange={changeHandler}
					/>
				</div>
				<div className="flex w-full h-10 border-2 border-gray-200 py-1 px-2 gap-2 rounded-lg">
					<img src={emailImg} alt="icon" className="w-7 " />
					<input
						name="email"
						className="w-full outline-none border-none placeholder:text-gray-400"
						type="text"
						placeholder="Email"
						value={contact.email}
						onChange={changeHandler}
					/>
				</div>
				<div className="flex w-full h-10 border-2 border-gray-200 py-1 px-2 gap-2 rounded-lg">
					<img src={jobImg} alt="icon" className="w-7" />
					<input
						name="job"
						className="w-full outline-none border-none placeholder:text-gray-400"
						type="text"
						placeholder="Job"
						value={contact.job}
						onChange={changeHandler}
					/>
				</div>
				<div className="w-full flex gap-4">
					<button
						onClick={onClose}
						className="w-full h-12 rounded-lg  text-xl text-red-600 border-2 border-red-600"
					>
						Close
					</button>
					<button
						onClick={addHandler}
						className="w-full h-12 rounded-lg  text-xl bg-green-600 text-white "
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddContactModal;
