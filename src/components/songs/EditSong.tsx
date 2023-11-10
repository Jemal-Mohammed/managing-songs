import React, { useState, useEffect, FormEvent } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { editSongStart } from '../../features/songSlice';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1.2em;
  color: #333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 1em;
`;

const FormButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1.2em;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
`;

// interface Song {
//   title: string;
//   artist: string;
//   album: string;
//   genre: string;
// }

const EditSong: React.FC = () => {
  const [_id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');

  const [titleError, setTitleError] = useState('');
  const [artistError, setArtistError] = useState('');
  const [albumError, setAlbumError] = useState('');
  const [genreError, setGenreError] = useState('');

  // const loading = useSelector((state: RootState) => state.songs.loading);
  const message = useSelector((state: RootState) => state.songs.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const { id } = useParams();
//   const { id } = useParams<{ id: string }>();
  const { id } = useParams<{ id?: string }>();
  const safeId = id || '';
  useEffect(() => {
    // Fetch existing song data when component mounts
    // You should replace 'yourApiEndpoint' with the actual API endpoint to get a specific song by ID
    fetch(`https://songs-api-xh5q.onrender.com/api/songs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved data to the state
        setId(data._id),
        setTitle(data.title);
        setArtist(data.artist);
        setAlbum(data.album);
        setGenre(data.genre);
      })
      .catch((error) => console.error('Error fetching song data:', error));
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
// console.log(safeId);

    // Reset previous errors
    setTitleError('');
    setArtistError('');
    setAlbumError('');
    setGenreError('');

    // Validate input fields
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }

    if (!artist.trim()) {
      setArtistError('Artist is required');
      return;
    }

    if (!album.trim()) {
      setAlbumError('Album is required');
      return;
    }

    if (!genre.trim()) {
      setGenreError('Genre is required');
      return;
    }

    const updatedSong = {
      _id,
      title,
      artist,
      album,
      genre,
    };

    // Dispatch the editSongStart action with the updated song details
    // dispatch(editSongStart(id, updatedSong ));
    dispatch(editSongStart({ id: safeId, updatedSong }));
    //  console.log(id);
     
    if (message) {
        toast(message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/');
      }
    // Rest of your logic, e.g., showing a toast, navigating, etc.
  };


  return (
    <FormContainer>
      <h2>Edit a Song</h2>
      <form onSubmit={handleSubmit}>
        <FormLabel>Title</FormLabel>
        <FormInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        {titleError && <ErrorText>{titleError}</ErrorText>}

        <FormLabel>Artist</FormLabel>
        <FormInput type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
        {artistError && <ErrorText>{artistError}</ErrorText>}

        <FormLabel>Album</FormLabel>
        <FormInput type="text" value={album} onChange={(e) => setAlbum(e.target.value)} />
        {albumError && <ErrorText>{albumError}</ErrorText>}

        <FormLabel>Genre</FormLabel>
        <FormInput type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        {genreError && <ErrorText>{genreError}</ErrorText>}

        <FormButton type="submit">Update Song</FormButton>
      </form>
    </FormContainer>
  );
};

export default EditSong;
