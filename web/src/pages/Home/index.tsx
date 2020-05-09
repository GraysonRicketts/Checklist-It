import React from 'react';
import { Link } from 'react-router-dom';
import data from '../../checklistData.json';

const Home: React.FC = () => {
  return (
    <div>
      <h2>Checklists</h2>

      <ul>
        {data.checklists.map((list) => (
          <li key={list.id}>
            <Link to={`/checklist/${list.id}`}>{list.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
