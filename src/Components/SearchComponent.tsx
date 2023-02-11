import { Box, FlexProps, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { FormEvent, useEffect, useState } from "react";
import { Spinner } from '@chakra-ui/react'

import { useDebounce } from 'usehooks-ts'


interface SearchProps extends FlexProps {
   
    onFilter: (input: string) => void;
  }
const Search = ({onFilter} : SearchProps) =>{
  const [value, setValue] = useState<string>('')
  const [loader, setLoader] = useState(false);

  const debouncedValue = useDebounce<string>(value, 1500)

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setLoader(true)
        setValue(e.currentTarget.value);
      }
    useEffect(() => {
        onFilter(value)
        console.log(value);
        setLoader(false);
    }, [debouncedValue])
    
    return (
        <Box>
          <InputGroup>
    
          <Input  onChangeCapture={handleChange} size={'md'} placeholder='Filter Cities' />
          {
            loader && (<InputRightElement children={<Spinner color='green.500' />} />)
          }
    
  </InputGroup>
          
          
        </Box>
    )
}
export default Search