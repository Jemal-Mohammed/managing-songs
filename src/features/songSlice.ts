import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Song from '../components/interfaces/Song';
interface SongsState {
  data: Song[];
  loading: boolean;
  error: string | null;
  message: String | null
}

const initialState: SongsState = {
  data: [],
  loading: false,
  error: null,
  message: null,

};

// ... (previous imports and interface)

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart(state, action: PayloadAction<{ keyword: string; currentPage: number }>) {
      const { keyword, currentPage } = action.payload;
      state.loading = true;
      state.error = null;
      console.log('Fetching songs with keyword:', keyword, 'and currentPage:', currentPage);
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongStart(state, action: PayloadAction<Song>) {
      console.log(action.payload);
      
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    addSongSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;
      state.data = [...state.data, action.payload];
      state.message="Song Added Successfully";
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state, action: PayloadAction<string>) {
      console.log(action.payload);
      
      return {
        ...state,
        loading: true,
        error: null,
        // Additional handling if needed
      };
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      return{
      ...state,
        loading : false,
        message:action.payload
      };
    },    
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editSongStart(state, action: PayloadAction<{ id: string; updatedSong: Song }>) {
   console.log(action.payload);
   
      return {
        ...state,
        loading: true,
        error: null,
        // Additional handling if needed
      };
      // You can access the id and updatedSong in action.payload.id and action.payload.updatedSong
      // Add your logic to handle the edit operation
    },
    editSongSuccess(state, action: PayloadAction<{ index: String; song: Song }>) {
      console.log(action.payload);
      
      state.loading = false;
      // state.message=action.payload;
      state.message="Song updated Successfully";
    },
    editSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message="Someting went Wrong";
    },
  },
});
export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  editSongStart,
  editSongSuccess,
  editSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;

