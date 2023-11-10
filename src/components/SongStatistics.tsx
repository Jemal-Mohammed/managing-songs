// SongStatistics.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Preloader from './Preloader';

interface Genre {
  _id: string;
  count: number;
}

interface Artist {
  _id: string;
  songs: string[];
  count: number;
}

interface Album {
  _id: string;
  songs: string[];
  count: number;
}

interface Statistics {
  totalSongs: number;
  songsByGenre: Genre[];
  songsByArtist: Artist[];
  songsByAlbum: Album[];
}

const StatisticsContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #333;
  font-family: 'Montserrat', sans-serif;
`;

const SectionHeader = styled.h2`
  color: #009688;
  border-bottom: 2px solid #009688;
  padding-bottom: 10px;
  margin-bottom: 15px;
`;

const StatisticItem = styled.div`
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;

  ul {
    margin-top: 10px;
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 5px;
    }
  }
`;

const LoadingMessage = styled.p`
  font-style: italic;
  color: #666;
  font-family: 'Montserrat', sans-serif;
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  font-family: 'Montserrat', sans-serif;
`;

const SongStatistics: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get<Statistics>('https://songs-api-xh5q.onrender.com/api/statistics');
        setStatistics(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <StatisticsContainer>
      <SectionHeader>Statistics</SectionHeader>

      {loading && <LoadingMessage><Preloader /></LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {statistics && (
        <>
          <SectionHeader>Total Songs: {statistics.totalSongs}</SectionHeader>

          <SectionHeader>Songs by Genre</SectionHeader>
          {statistics.songsByGenre.map((genre) => (
            <StatisticItem key={genre._id}>
              {genre._id}: {genre.count}
            </StatisticItem>
          ))}

          <SectionHeader>Songs by Artist</SectionHeader>
          {statistics.songsByArtist.map((artist) => (
            <StatisticItem key={artist._id}>
              {artist._id}: {artist.count}
              <ul>
                {artist.songs.map((song) => (
                  <li key={song}>{song}</li>
                ))}
              </ul>
            </StatisticItem>
          ))}

          <SectionHeader>Songs by Album</SectionHeader>
          {statistics.songsByAlbum.map((album) => (
            <StatisticItem key={album._id}>
              {album._id}: {album.count}
              <ul>
                {album.songs.map((song) => (
                  <li key={song}>{song}</li>
                ))}
              </ul>
            </StatisticItem>
          ))}
        </>
      )}
    </StatisticsContainer>
  );
};

export default SongStatistics;
