import React from "react";
import { useParams } from "react-router-dom";

const Checklist: React.FC = () => {
  const { checklistId } = useParams();
  return <p>{checklistId}</p>;
};

export default Checklist;
