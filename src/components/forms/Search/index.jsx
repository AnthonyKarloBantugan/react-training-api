import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
const Search = ({ type, children, placeholder, variant, size }) => {
	return (
		<InputGroup>
			<InputLeftElement pointerEvents="none" children={children} />
			<Input
				type={type}
				placeholder={placeholder}
				size={size}
				variant={variant}
			/>
		</InputGroup>
	);
};

export default Search;
