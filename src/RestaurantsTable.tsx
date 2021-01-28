import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import RestaurantsTableFooter from './RestaurantsTableFooter'
import useRestaurants from './hooks/useRestaurants'
import { PAGE_SIZE } from './constants'
import { Restaurant } from './types'

interface Props {
  selectedStateFilter: string
  selectedGenreFilter: string
  selectedAttireFilter: string
  selectedSearchFilter: string
}

type SelectedSortColumn = 'name' | 'city' | 'state' | 'attire'

type SelectedSortDirection = 'asc' | 'desc'

const ClickableTableHeading = styled.th`
  cursor: pointer;
`

const RestaurantsTable = ({
  selectedStateFilter,
  selectedGenreFilter,
  selectedAttireFilter,
  selectedSearchFilter,
}: Props) => {
  const [
    filteredAndSortedRestaurants,
    setFilteredAndSortedRestaurants,
  ] = useState<Restaurant[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [
    selectedSortColumn,
    setSelectedSortColumn,
  ] = useState<SelectedSortColumn>('name')
  const [
    selectedSortDirection,
    setSelectedSortDirection,
  ] = useState<SelectedSortDirection>('asc')
  const { data: restaurants, isFetching } = useRestaurants()
  useEffect(() => {
    if (restaurants) {
      let r = restaurants
      if (selectedStateFilter !== 'all') {
        r = r.filter(({ state }) => state === selectedStateFilter)
      }
      if (selectedAttireFilter !== 'all') {
        r = r.filter(({ attire }) => attire === selectedAttireFilter)
      }
      if (selectedGenreFilter !== 'all') {
        r = r.filter(({ genre }) =>
          genre.split(',').includes(selectedGenreFilter)
        )
      }
      if (selectedSearchFilter !== '') {
        r = r.filter(
          ({ name, city, genre }) =>
            name.toLowerCase().includes(selectedSearchFilter.toLowerCase()) ||
            city.toLowerCase().includes(selectedSearchFilter.toLowerCase()) ||
            genre
              .split(',')
              .some((g) =>
                g.toLowerCase().includes(selectedSearchFilter.toLowerCase())
              )
        )
      }
      r = r.sort((a, b) => {
        if (
          a[selectedSortColumn].toLowerCase() <
          b[selectedSortColumn].toLowerCase()
        ) {
          return selectedSortDirection === 'asc' ? -1 : 1
        } else if (
          a[selectedSortColumn].toLowerCase() >
          b[selectedSortColumn].toLowerCase()
        ) {
          return selectedSortDirection === 'asc' ? 1 : -1
        }
        return 0
      })
      setCurrentPage(0)
      setFilteredAndSortedRestaurants(r)
    }
  }, [
    restaurants,
    selectedStateFilter,
    selectedGenreFilter,
    selectedAttireFilter,
    selectedSearchFilter,
    selectedSortColumn,
    selectedSortDirection,
  ])

  const onPreviousPageClick = () => {
    setCurrentPage(currentPage - 1)
  }

  const onNextPageClick = () => {
    setCurrentPage(currentPage + 1)
  }

  const handleTableHeadClick = (column: SelectedSortColumn) => {
    if (column === selectedSortColumn) {
      setSelectedSortDirection(selectedSortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSelectedSortColumn(column)
      setSelectedSortDirection('asc')
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <ClickableTableHeading onClick={() => handleTableHeadClick('name')}>
              Name{' '}
              {selectedSortColumn === 'name' ? (
                selectedSortDirection === 'asc' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )
              ) : null}
            </ClickableTableHeading>
            <ClickableTableHeading onClick={() => handleTableHeadClick('city')}>
              City{' '}
              {selectedSortColumn === 'city' ? (
                selectedSortDirection === 'asc' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )
              ) : null}
            </ClickableTableHeading>
            <ClickableTableHeading
              onClick={() => handleTableHeadClick('state')}
            >
              State{' '}
              {selectedSortColumn === 'state' ? (
                selectedSortDirection === 'asc' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )
              ) : null}
            </ClickableTableHeading>
            <th>Phone Number</th>
            <ClickableTableHeading
              onClick={() => handleTableHeadClick('attire')}
            >
              Attire{' '}
              {selectedSortColumn === 'attire' ? (
                selectedSortDirection === 'asc' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )
              ) : null}
            </ClickableTableHeading>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : filteredAndSortedRestaurants &&
            filteredAndSortedRestaurants.length ? (
            filteredAndSortedRestaurants
              .slice(
                currentPage * PAGE_SIZE,
                currentPage * PAGE_SIZE + PAGE_SIZE
              )
              .map(({ id, name, city, state, telephone, attire, genre }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{city}</td>
                  <td>{state}</td>
                  <td>{telephone}</td>
                  <td>{attire}</td>
                  <td>{genre.replace(/,/g, ', ')}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={6}>No results found...</td>
            </tr>
          )}
        </tbody>
      </table>
      <RestaurantsTableFooter
        currentPage={currentPage}
        totalResults={filteredAndSortedRestaurants.length}
        onNextPageClick={onNextPageClick}
        onPreviousPageClick={onPreviousPageClick}
      />
    </>
  )
}

export default RestaurantsTable
