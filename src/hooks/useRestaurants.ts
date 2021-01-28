import { useQuery } from 'react-query'
import axios from 'axios'
import { Restaurant } from '../types'

const RESTAURANTS_API =
  'https://code-challenge.spectrumtoolbox.com/api/restaurants'

const CONFIG = {
  headers: {
    Authorization: 'Api-Key q3MNxtfep8Gt',
  },
}

const getRestaurants = async () => {
  const { data } = await axios.get<Restaurant[]>(RESTAURANTS_API, CONFIG)
  return data
}

const useRestaurants = () => useQuery(['restaurants'], () => getRestaurants())

export default useRestaurants
