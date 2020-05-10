import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBaseChecklists } from '../api/';
import { BaseChecklistDTO } from '../api/dto/BaseChecklist.dto';
import { AppThunk, RootState } from '.';

export interface ChecklistState {
  isLoading: boolean;
  checklistsById: Record<string, BaseChecklistDTO>[];
  error: string;
}

const initialChecklistState: ChecklistState = {
  isLoading: false,
  checklistsById: [],
  error: '',
};

const checklistslice = createSlice({
  name: 'checklist',
  initialState: initialChecklistState,
  reducers: {
    _setStartLoadingBaseChecklists: (state: ChecklistState) => {
      state.isLoading = true;
    },
    _setBaseChecklistsSuccess: (
      state: ChecklistState,
      { payload }: PayloadAction<BaseChecklistDTO[]>,
    ) => {
      state.checklistsById = payload.map((dto) => ({
        [dto.id]: dto,
      }));
    },
    _setError(state: ChecklistState, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
  },
});

const {
  _setStartLoadingBaseChecklists,
  _setError,
  _setBaseChecklistsSuccess,
} = checklistslice.actions;

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

export default checklistslice.reducer;
