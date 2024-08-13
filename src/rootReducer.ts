import requestReducer from './reducers/requestReducer'
import newsReducer from './features/newsFeed/newsSlice'
import preferencesReducer from './features/preferences/preferencesSlice'
import filtersReducer from './features/filters/filtersSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  request: requestReducer,
  news: newsReducer,
  preferences: preferencesReducer,
  filters: filtersReducer
})

export type RootState = ReturnType<typeof rootReducer>
