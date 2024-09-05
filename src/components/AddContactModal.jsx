import userImg from "../assets/icons/user.webp";
import emailImg from "../assets/icons/email.webp";
import jobImg from "../assets/icons/job.webp";
import { useState } from "react";

const AddContactModal = ({ isOpen, onClose, contacts }) => {
	const [error, setError] = useState({name: "",email: "",job: ""});
	const [contact, setContact] = useState({name: "",email: "",job: "",});

	const changeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		if (name === "name") {setContact({ ...contact, name: value })}
		if (name === "email") {setContact({ ...contact, email: value })}
		if (name === "job") {setContact({ ...contact, job: value })}
	};
    const isValidEmail = email => {
		const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		return regex.test(email.toLowerCase())
	
	}

	const addHandler = () => {
		if (contact.name === "") {setError(prev => ({...prev,name:"name is required"}));return;}
		if (contact.email === "") {
			setError(prev => ({...prev ,email: "email is required"}))
			return;
		}else if(!isValidEmail(contact.email)) {
			setError(prev => ({...prev , email: "Please enter a valid email address"}))
			return;
		}
		if (contact.job === "") {
			setError(prev => ({...prev,job: "job is required"}));
			return;
		}
		contacts.push(contact);
		localStorage.setItem("contacts", JSON.stringify(contacts));

		setContact({name: "",email: "",job: ""});
		setError({name: "",email: "",job: ""});
		onClose();
	};
	return (
		<div
			dir="ltr"
			onClick={() => {onClose(), setError({name: "",email: "",job: ""}); setContact({name: "",email: "",job: ""});}}
			className={`fixed inset-0 flex items-center justify-center ${
				isOpen ? "visible bg-black/25 backdrop-blur-sm" : "invisible"
			} `}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="sm:w-[400px] w-[300px] h-fit rounded-2xl shadow bg-white flex flex-col gap-6 p-6"
			>
				<h1 className="text-2xl font-bold text-center text-blue-500">Add Contact</h1>
				<div>
					<div className="flex w-full h-10 border-2 border-gray-200 py-1 px-2 gap-2 rounded-lg hover:border-blue-500 transition-colors">
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
					<p className="text-red-500  text-sm mt-1">{error.name}</p>
				</div>
				<div>
					<div className="flex w-full h-10 border-2 border-gray-200 py-1 px-2 gap-2 rounded-lg hover:border-blue-500 transition-colors">
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
					<p className="text-red-500  text-sm mt-1">{error.email}</p>
				</div>
				<div>
					<div className="flex w-full h-10 border-2 border-gray-200 py-1 px-2 gap-2 rounded-lg hover:border-blue-500 transition-colors">
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
					<p className="text-red-500  text-sm mt-1">{error.job}</p>
				</div>
				<div className="w-full flex gap-4">
					<button
						onClick={onClose}
						className="w-full sm:h-12 h-10 rounded-lg  text-xl text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors"
					>
						Close
					</button>
					<button
						onClick={addHandler}
						className="w-full sm:h-12 h-10 rounded-lg  text-xl bg-blue-500 text-white hover:bg-blue-700 transition-colors "
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddContactModal;
