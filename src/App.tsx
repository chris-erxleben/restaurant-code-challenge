import { QueryClient, QueryClientProvider } from 'react-query'
import RestaurantsTable from './RestaurantsTable'
import RestaurantsTableFilters from './RestaurantsTableFilters'
import { useState } from 'react'
import styled from 'styled-components'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const AppWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`

const App = () => {
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('all')
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('all')
  const [selectedAttireFilter, setSelectedAttireFilter] = useState<string>(
    'all'
  )
  const [selectedSearchFilter, setSelectedSearchFilter] = useState<string>('')

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <RestaurantsTableFilters
          selectedStateFilter={selectedStateFilter}
          selectedGenreFilter={selectedGenreFilter}
          selectedAttireFilter={selectedAttireFilter}
          setSelectedStateFilter={setSelectedStateFilter}
          setSelectedGenreFilter={setSelectedGenreFilter}
          setSelectedAttireFilter={setSelectedAttireFilter}
          setSelectedSearchFilter={setSelectedSearchFilter}
        />
        <RestaurantsTable
          selectedStateFilter={selectedStateFilter}
          selectedGenreFilter={selectedGenreFilter}
          selectedSearchFilter={selectedSearchFilter}
          selectedAttireFilter={selectedAttireFilter}
        />
      </AppWrapper>
    </QueryClientProvider>
  )
}

export default App
