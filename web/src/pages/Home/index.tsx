import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBaseChecklists } from '../../store/checklists';
import { RootState } from '../../store';
import { stat } from 'fs';
import { Loader } from '../../components/Loader';

const Home: React.FC = () => {
  const { checklistId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBaseChecklists());
  }, [dispatch]);

  const checklists = useSelector(
    (state: RootState) => state.checklists.currentChecklists,
  );
  const isLoading = useSelector(
    (state: RootState) => state.checklists.isLoading,
  );

  return (
    <div>
      <h2>Checklists</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {checklists.map((list) => (
            <li key={list.id}>
              <Link to={`/checklist/${list.id}`}>{list.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
