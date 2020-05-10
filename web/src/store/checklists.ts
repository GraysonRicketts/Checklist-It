import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBaseChecklists } from '../api';
import { BaseChecklistDTO } from '../api/dto/BaseChecklist.dto';
import { AppThunk } from '.';

export interface ChecklistsState {
  isLoading: boolean;
  currentChecklists: BaseChecklistDTO[];
  error: string;
}

const initialState: ChecklistsState = {
  isLoading: false,
  currentChecklists: [],
  error: '',
};

const checklistsSlice = createSlice({
  name: 'checklists',
  initialState,
  reducers: {
    _setStartLoadingBaseChecklists: (state: ChecklistsState) => {
      state.isLoading = true;
    },
    _setBaseChecklistsSuccess: (
      state: ChecklistsState,
      { payload }: PayloadAction<BaseChecklistDTO[]>,
    ) => {
      state.currentChecklists = payload;
      state.isLoading = false;
      state.error = '';
    },
    _setError(state: ChecklistsState, { payload }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const {
  _setStartLoadingBaseChecklists,
  _setError,
  _setBaseChecklistsSuccess,
} = checklistsSlice.actions;

export function fetchBaseChecklists(): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(_setStartLoadingBaseChecklists());
      const baseChecklists = await getBaseChecklists();
      dispatch(_setBaseChecklistsSuccess(baseChecklists));
    } catch (err) {
      dispatch(_setError(err.toString()));
    }
  };
}

export default checklistsSlice.reducer;
