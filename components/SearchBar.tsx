import { useState } from 'react';
import { Box, Container } from '@mui/system';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  return (
    // <Box className='flex justify-center mt-5 w-full'>
    <Box className='flex justify-center mt-5 fixed bottom-0 w-full'>
      <input
        type='text'
        value={searchText}
        className={
          'w-full h-[50px] md:h-[60px] rounded-full border-[1.5px] border-solid border-[#747475]'
        }
        placeholder='Type anything you want'
      />
    </Box>
  );
};

export default SearchBar;
