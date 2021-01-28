import styled from 'styled-components'
import { PAGE_SIZE } from './constants'

interface Props {
  currentPage: number
  totalResults: number
  onPreviousPageClick: () => void
  onNextPageClick: () => void
}

const PaginationWrapper = styled.div`
  margin-top: 10px;
`

const PreviousButton = styled.button`
  margin-right: 5px;
`

const RestaurantsTableFooter = ({
  currentPage,
  totalResults,
  onPreviousPageClick,
  onNextPageClick,
}: Props) => (
  <PaginationWrapper>
    {currentPage > 0 ? (
      <PreviousButton onClick={onPreviousPageClick}>
        Previous Page
      </PreviousButton>
    ) : null}
    {currentPage * PAGE_SIZE + PAGE_SIZE < totalResults ? (
      <button onClick={onNextPageClick}>Next Page</button>
    ) : null}
  </PaginationWrapper>
)

export default RestaurantsTableFooter
