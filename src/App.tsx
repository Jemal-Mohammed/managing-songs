import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import  SongStatistics from './components/SongStatistics';
import AddSongs from './components/songs/AddSongs';
import { Master } from './components/layout/Master';
import Preloader from './components/Preloader';
import ListOfSongs from './components/songs/ListOfSongs';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify'; // Import the toast function
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import store from './app/store';
import EditSong from './components/songs/EditSong';
import SearchisResult from './components/songs/SearchidResult';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path="/" element={<Master />}>
              <Route index element={<ListOfSongs />} />
              <Route path="add-songs" element={<AddSongs />} />
              <Route path="edit-song/:id" element={<EditSong />} />
              <Route path="statistics" element={<SongStatistics />} />
              <Route path="/search-results/:keyword" element={<SearchisResult />} />
              <Route path="*" element={<Navigate to="/" />} />

            </Route>
          </Routes>
        )}
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
    </Provider>
  );
};

export default App;
