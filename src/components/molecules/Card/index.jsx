import {
	Box,
	Button,
	Image,
	Link,
	Text,
	useDisclosure,
	Modal,
	ModalBody,
	FormControl,
	FormLabel,
	Input,
	ModalFooter,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
} from "@chakra-ui/react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../http/firebase";
import { AiOutlineMail, AiOutlineLink, AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";

const Card = ({ id, first_name, last_name, email, website }) => {
	const [user, setUser] = useState({});
	const { isOpen, onOpen, onClose } = useDisclosure();

	const removeDocument = async (id) => {
		try {
			await deleteDoc(doc(db, "users", `${id}`));
			alert("data deleted");
		} catch (error) {
			console.log(error.message);
		}
	};

	const updateDocument = async (id) => {
		try {
			const userRef = doc(db, "users", `${id}`);
			await updateDoc(userRef, user);
			onClose();
		} catch (error) {
			console.log(error);
		}
	};

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({
			[name]: value,
			...user,
		});
		console.log(user);
	};

	return (
		<Box bg="" maxW="100%" p="16px">
			<Box>
				<Image
					boxSize="100%"
					objectFit="cover"
					src=""
					fallbackSrc="https://via.placeholder.com/150"
				/>
			</Box>

			<Box>
				<Text fontSize="20px" fontWeight="semibold">
					{first_name} {last_name}
				</Text>
				<Text
					color="#718096"
					display="flex"
					justifyContent="start"
					alignItems="center"
				>
					<AiOutlineMail /> {email}
				</Text>
				<Link
					color="#008080"
					display="flex"
					justifyContent="start"
					alignItems="center"
				>
					<AiOutlineLink />
					{website}
				</Link>
			</Box>
			<Box display="flex" justifyContent="space-around">
				<Button onClick={() => onOpen()} marginRight="20px">
					<AiOutlineEdit /> Edit
				</Button>
				<Button onClick={() => removeDocument(id)} colorScheme="red">
					<BsTrash /> Remove
				</Button>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your account</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>First name</FormLabel>
							<Input
								placeholder={`${first_name}`}
								name="first_name"
								isRequired
								onChange={(e) => handleInput(e)}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Last name</FormLabel>
							<Input
								type="text"
								placeholder={`${last_name}`}
								name="last_name"
								isRequired
								onChange={(e) => handleInput(e)}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Email</FormLabel>
							<Input
								type="email"
								placeholder={`${email}`}
								name="email"
								isRequired
								onChange={(e) => handleInput(e)}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Website Url</FormLabel>
							<Input
								placeholder={`${website}`}
								name="website"
								onChange={(e) => handleInput(e)}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => updateDocument(id)}
						>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Card;
