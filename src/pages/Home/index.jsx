import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../http/firebase";
import { useEffect, useState } from "react";
import {
	Box,
	Container,
	Text,
	Grid,
	Button,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";
import Search from "../../components/forms/Search";
import Card from "../../components/molecules/Card";
import { FaSearch } from "react-icons/fa";

const Home = () => {
	const COLLECTION = "users";
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		website: "",
		img: "",
	});
	const [users, setUsers] = useState([]);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const getData = async () => {
		let allUsers = [];
		try {
			const querySnapshot = await getDocs(collection(db, "users"));
			querySnapshot.forEach((doc) =>
				allUsers.push({
					id: doc.id,
					...doc.data(),
				})
			);
			setUsers(allUsers);
		} catch (err) {
			console.log(err);
		}
	};

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setForm({
			...form,
			[name]: value,
		});
	};

	const addDocument = async (col, doc) => {
		const docRef = await addDoc(collection(db, col), doc);
		onClose();
		getData();
	};

	useEffect(() => {
		getData();
	}, [users]);

	return (
		<>
			<Box>
				<Container centerContent>
					<Text fontSize="3rem" fontWeight="bold">
						User Management
					</Text>
					<Search
						type="search"
						children={<FaSearch />}
						placeholder="Search Name"
						size="lg"
						variant="outline"
					/>
					<Box pt="20px">
						<Button onClick={onOpen} colorScheme="blue">
							Create User
						</Button>
						<Modal isOpen={isOpen} onClose={onClose}>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Create your account</ModalHeader>
								<ModalCloseButton />
								<ModalBody pb={6}>
									<FormControl>
										<FormLabel>Upload Image</FormLabel>
										<Input type="file" />
									</FormControl>
									<FormControl>
										<FormLabel>First name</FormLabel>
										<Input
											placeholder="First Name"
											name="first_name"
											isRequired
											onChange={(e) => handleInput(e)}
										/>
									</FormControl>

									<FormControl mt={4}>
										<FormLabel>Last name</FormLabel>
										<Input
											type="text"
											placeholder="Last Name"
											name="last_name"
											isRequired
											onChange={(e) => handleInput(e)}
										/>
									</FormControl>
									<FormControl mt={4}>
										<FormLabel>Email</FormLabel>
										<Input
											type="email"
											placeholder="email@mail.com"
											name="email"
											isRequired
											onChange={(e) => handleInput(e)}
										/>
									</FormControl>
									<FormControl mt={4}>
										<FormLabel>Website Url</FormLabel>
										<Input
											placeholder="Website Url"
											name="website"
											onChange={(e) => handleInput(e)}
										/>
									</FormControl>
								</ModalBody>

								<ModalFooter>
									<Button
										colorScheme="blue"
										mr={3}
										onClick={() => addDocument(COLLECTION, form)}
									>
										Save
									</Button>
									<Button onClick={onClose}>Cancel</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</Box>
				</Container>
			</Box>
			<Box>
				<Grid templateColumns="repeat(3, 1fr)" gap={6}>
					{users?.map((user) => (
						<Card key={user.id} {...user} />
					))}
				</Grid>
			</Box>
		</>
	);
};

export default Home;
