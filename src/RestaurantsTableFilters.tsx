import useRestaurants from './hooks/useRestaurants'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  selectedStateFilter: string
  selectedGenreFilter: string
  selectedAttireFilter: string
  setSelectedStateFilter: (state: string) => void
  setSelectedGenreFilter: (genre: string) => void
  setSelectedAttireFilter: (attire: string) => void
  setSelectedSearchFilter: (search: string) => void
}

const FiltersWrapper = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
`

const Select = styled.select`
  min-width: 150px;
  margin-left: 5px;
  margin-right: 15px;
`

const Text = styled.input`
  min-width: 200px;
  margin-left: 5px;
  margin-right: 2px;
`

const RestaurantsTableFilters = ({
  selectedStateFilter,
  selectedGenreFilter,
  selectedAttireFilter,
  setSelectedStateFilter,
  setSelectedGenreFilter,
  setSelectedSearchFilter,
  setSelectedAttireFilter,
}: Props) => {
  const [states, setStates] = useState<string[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [attires, setAttires] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const { data: restaurants } = useRestaurants()
  useEffect(() => {
    if (restaurants) {
      const distinctStates = new Set<string>()
      const distinctGenres = new Set<string>()
      const distinctAttires = new Set<string>()

      restaurants.forEach(({ state, genre, attire }) => {
        distinctStates.add(state)
        distinctAttires.add(attire)
        genre.split(',').forEach((g) => {
          distinctGenres.add(g)
        })
      })

      setStates(Array.from(distinctStates))
      setGenres(Array.from(distinctGenres))
      setAttires(Array.from(distinctAttires))
    }
  }, [restaurants])

  const handleStateFilterChange = ({ target: { value } }) => {
    setSelectedStateFilter(value)
  }

  const handleGenreFilterChange = ({ target: { value } }) => {
    setSelectedGenreFilter(value)
  }

  const handleAttireFilterChange = ({ target: { value } }) => {
    setSelectedAttireFilter(value)
  }

  const handleSearchKeyPress = ({ key }) => {
    if (key === 'Enter') {
      setSelectedSearchFilter(searchValue)
    }
  }

  const handleSearchClick = () => {
    setSelectedSearchFilter(searchValue)
  }

  const handleSearchChange = ({ target: { value } }) => {
    setSearchValue(value)
  }

  return (
    <FiltersWrapper>
      <label htmlFor="state-filter">State:</label>
      <Select
        name="states"
        id="state-filter"
        value={selectedStateFilter}
        onChange={handleStateFilterChange}
      >
        <option value="all">All</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </Select>
      <label htmlFor="genre-filter">Genre:</label>
      <Select
        name="genres"
        id="genre-filter"
        value={selectedGenreFilter}
        onChange={handleGenreFilterChange}
      >
        <option value="all">All</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </Select>
      <label htmlFor="attire-filter">Attire:</label>
      <Select
          name="attires"
          id="attire-filter"
          value={selectedAttireFilter}
          onChange={handleAttireFilterChange}
      >
        <option value="all">All</option>
        {attires.map((attire, index) => (
            <option key={index} value={attire}>
              {attire}
            </option>
        ))}
      </Select>
      <label htmlFor="search-filter">Search:</label>
      <Text
        type="text"
        onKeyPress={handleSearchKeyPress}
        value={searchValue}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>Search</button>
    </FiltersWrapper>
  )
}

export default RestaurantsTableFilters
