// ListOfSongs.tsx

import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSongStart, fetchSongsStart } from '../../features/songSlice';
import { RootState } from '../../app/store';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Song from '../interfaces/Song';
import Preloader from '../Preloader';

const ListContainer = styled.div`
  margin: 40px;
  align-items: center;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SongItem = styled.div`
  padding-left: 50px;
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  margin: 10px;
  border-radius: 5px;
  animation: ${fadeInUp} 0.5s ease-in-out;

  h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8em;
    font-weight: bold;
    color: #3498db;
    margin-bottom: 10px;
  }
  h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const EditButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
`;

// ... (previous imports)

const SearchisResult: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.data);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  const { keyword } = params || '';
  const navigate = useNavigate();

  useEffect(() => {
    console.log('safKeyword', keyword);
    setCurrentPage(1);
    dispatch(fetchSongsStart({ keyword:keyword ||'', currentPage }));
  }, [dispatch, keyword]);

  const songsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (songsRef.current) {
      songsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [songs]);

  const handleEdit = (id: string) => {
    console.log(`Edit song at index ${id}`);
    navigate(`/edit-song/${id}`);
  };

  const handleDelete = (songId: string) => {
    // Use SweetAlert to confirm deletion
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this song!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the delete action with the songId
        dispatch(deleteSongStart(songId));
        dispatch(fetchSongsStart({ keyword: keyword ||'', currentPage }));
      }
    });
  };

  return (
    <ListContainer ref={songsRef}>
      {loading ? (
        <Preloader />
      ) : (
        <>
          {songs.length === 0 ? (
            <h2 style={{color:"red"}}>No songs found.</h2>
          ) : (
            songs.map((song, index) => (
              <SongItem key={index}>
                <h3>{song.title}</h3>
                <ButtonContainer>
                  <EditButton onClick={() => handleEdit(song._id.toString())}>
                    <BsPencilSquare /> Edit
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(song._id.toString())}>
                    <BsTrash /> Delete
                  </DeleteButton>
                </ButtonContainer>
                <div>
                  <h4>Artist: {song.artist}</h4>
                  <h4>Album: {song.album}</h4>
                  <h4>Genre: {song.genre}</h4>
                </div>
              </SongItem>
            ))
          )}
        </>
      )}
    </ListContainer>
  );
};

export default SearchisResult;


