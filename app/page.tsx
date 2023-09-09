'use client';
import React from 'react';
import { Box, Container } from '@mui/system';
import MessageList from '@/components/MessageList';
import SearchBar from '@/components/SearchBar';
import { useMusicStore } from '@/stores/musicStore';

export default function Home() {
  const musicList = useMusicStore((state) => state.musicList);

  return (
    <Container maxWidth='md' className='pb-8'>
      <Box className='flex justify-center w-full'>
        <Box className='w-full relative'>
          <MessageList musicList={musicList} userName={'John'} />
          <SearchBar />
        </Box>
      </Box>
    </Container>
  );
}
