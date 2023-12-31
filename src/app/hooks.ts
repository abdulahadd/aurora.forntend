import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './store'

export const useUserDispatch = () =>useDispatch<AppDispatch>();
export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector;