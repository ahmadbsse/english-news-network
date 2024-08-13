import type { AppDispatch } from '../store'
import { RootState } from '../rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Action, AnyAction } from '@reduxjs/toolkit';

export interface VoidDispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): void;
  }

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()