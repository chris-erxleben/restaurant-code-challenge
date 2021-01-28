import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import {RestaurantsTable} from "./RestaurantsTable";

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RestaurantsTable />
  </QueryClientProvider>
)

export default App
