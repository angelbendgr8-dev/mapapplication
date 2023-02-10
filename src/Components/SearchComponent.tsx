import { FlexProps, Input } from "@chakra-ui/react";
import React, { FormEvent } from "react";


interface SearchProps extends FlexProps {
   
    onFilter: (input: string) => void;
  }
const Search = ({onFilter} : SearchProps) =>{

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        onFilter(e.currentTarget.value);
      }
    return (
        <Input  onChange={handleChange} size={'md'} placeholder='Filter Cities' />
    )
}
export default Search