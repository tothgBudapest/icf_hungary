import { Box, Button, ToggleButtonGroup, ToggleButton, Pagination, LinearProgress, Grid, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import ArtworkCard from '@/components/artworkCard';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/router';
import {
    searchArtworks,
    selectArtworkData,
    selectArtworkStatus,
    selectArtworkCurrentPage,
    selectArtworkTotalPages,
    selectArtworkPageSize,
    setPageSize,
    setCurrentPage
} from '@/redux/artworkSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const SearchArtworks = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const artworks = useSelector(selectArtworkData);
    const status = useSelector(selectArtworkStatus);
    const currentPage = useSelector(selectArtworkCurrentPage);
    const totalPages = useSelector(selectArtworkTotalPages);
    const pageSize = useSelector(selectArtworkPageSize);
    const [searchQuery, setSearchQuery] = useState('');

    // Debounce search query input
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        const thunkAction = searchArtworks({ searchQuery: debouncedSearchQuery, currentPage });
        // @ts-ignore
        dispatch(thunkAction)
            .then(unwrapResult)
            .then(() => console.log('Artworks fetched successfully!'))
            .catch((error: any) => console.log('Error fetching artworks:', error));
    }, [currentPage, pageSize, debouncedSearchQuery]);

    const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        dispatch(setCurrentPage(newPage));
    };

    const handlePageSizeChange = (event: React.MouseEvent<HTMLElement>, newPageSize: number) => {
        dispatch(setPageSize(newPageSize));
    };

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const openDetailsPage = (id: number) => {
        router.push({
            pathname: '/artwork/[id]',
            query: { id }
        });
    };

    return (
        <Grid container direction="column" justifyContent="center" spacing={2} alignItems="center">
            <Grid item container xs={4} direction="row" justifyContent="space-around" alignItems="center">
                <Box>
                    <Input
                        type="text"
                        placeholder="Search for artwork"
                        id="artwork_search_field"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                    />
                    <Button id="artwork_search_button" variant="text">
                        <SearchIcon />
                    </Button>
                    <Button variant={'text'} onClick={() => router.push({ pathname: '/favourites' })}>
                        Favourites
                    </Button>
                </Box>
                <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
                <ToggleButtonGroup
                    sx={{ height: '25px' }}
                    color="primary"
                    value={pageSize}
                    exclusive
                    onChange={handlePageSizeChange}
                    aria-label="Platform">
                    <ToggleButton size={'small'} value={25}>
                        25
                    </ToggleButton>
                    <ToggleButton size={'small'} value={50}>
                        50
                    </ToggleButton>
                    <ToggleButton size={'small'} value={100}>
                        100
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>

            {status === 'loading' && (
                <Box mt={2} sx={{ width: '90%' }}>
                    <LinearProgress />
                </Box>
            )}

            <Grid container mt={3} spacing={4} direction="row" justifyContent="center" alignItems="center">
                {status === 'failed' && <p>Something went wrong</p>}
                {status === 'succeeded' &&
                    artworks.map((artwork: any) => (
                        <Grid key={'artwork_' + artwork?.id} item>
                            <ArtworkCard callback={openDetailsPage} artwork={artwork} />
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    );
};

export default SearchArtworks;
