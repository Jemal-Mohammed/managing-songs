import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';  // Correct import
import axios, { AxiosResponse } from 'axios';
import {
  fetchSongsStart,
  addSongStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  addSongFailure,
  editSongStart,
  editSongSuccess,
  editSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} from '../features/songSlice';
import Song from '../components/interfaces/Song';
function* fetchSongsSaga(action: PayloadAction<{ keyword: string; currentPage: number }>) {
  try {
    const { keyword, currentPage } = action.payload;

    // Use keyword and currentPage in your saga logic
    console.log('Keyword:', keyword);
    console.log('Current Page:', currentPage);

    // Your existing saga logic...
    const response: AxiosResponse = yield call(axios.get, `https://songs-api-xh5q.onrender.com/api/songs?keyword=${keyword}&page=${currentPage}`);
    yield put(fetchSongsSuccess(response.data));
  } catch (error: any) {
    console.error('fetchSongsSaga - Error:', error.message);
    yield put(fetchSongsFailure(error.message));
  }
}

function* postSongSaga(action: PayloadAction<Song>) {
  try {
    const response: AxiosResponse = yield call(axios.post, 'https://songs-api-xh5q.onrender.com/api/songs', action.payload);
    yield put(addSongSuccess(response.data));
  } catch (error: any) {
    console.error('postSongSaga - Error:', error.message);
    yield put(addSongFailure(error.message));
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    const songId = action.payload;
    yield call(axios.delete, `https://songs-api-xh5q.onrender.com/api/songs/${songId}`);
    
    // Assuming your API returns the updated list of songs after deletion
    const updatedSongs: Song[] = yield call(axios.get,"https://songs-api-xh5q.onrender.com/api/songs"); // Implement fetchSongs function to get the updated list

    // Dispatch the action with the correct payload
    yield put(deleteSongSuccess(updatedSongs));
  } catch (error: any) {
    yield put(deleteSongFailure(error.message));
  }
}


// Assuming the safeId is a string
function* editSongSaga(action: PayloadAction<{ id: string; updatedSong: Song }>) {
  try {
    const { id, updatedSong } = action.payload;

    // Make API call to the previous endpoint
    const response: AxiosResponse = yield call(
      axios.put,
      `https://songs-api-xh5q.onrender.com/api/songs/${id}`,
      updatedSong
    );

    // Dispatch success action with the updated song data
    yield put(editSongSuccess({ index: id, song: response.data }));

    // The rest of your saga logic
  } catch (error: any) {
    yield put(editSongFailure(error.message));
  }
}



function* songsSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
  yield takeLatest(addSongStart.type, postSongSaga);
  yield takeLatest(editSongStart.type, editSongSaga);
  yield takeLatest(deleteSongStart.type, deleteSongSaga);
}

export default songsSaga;
