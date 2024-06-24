import React, { useEffect } from "react";
import { BiSolidHourglassTop } from "react-icons/bi";
import { MdRadioButtonChecked } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_DOING,
    CALC_DONE,
    CALC_NOT_START,
    CALC_TO_DO,
    selectDoing,
    selectDone,
    selectNotStart,
    selectToDo,
} from "../../../redux/features/task/TaskSlice";

// Icons
const notstartIcon = <BiSolidHourglassTop size={40} />;
const todoIcon = <MdOutlineRadioButtonUnchecked size={40} />;
const doingIcon = <MdRadioButtonChecked size={40} />;
const doneIcon = <FaCheckCircle size={40} />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TaskSummary = ({ tasks }) => {
  const dispatch = useDispatch();
 
  const notStart = useSelector(selectNotStart)
  const toDo = useSelector(selectToDo)
  const doing = useSelector(selectDoing)
  const done = useSelector(selectDone)

  useEffect(() => {
    dispatch(CALC_NOT_START(tasks));
    dispatch(CALC_TO_DO(tasks));
    dispatch(CALC_DOING(tasks));
    dispatch(CALC_DONE(tasks))
    
  }, [dispatch, tasks]);

  return (
    <div className="task-summary">
      <h3 className="--mt">Task Stats</h3>
      <div className="info-summary d-flex flex-wrap">
        <InfoBox
          icon={notstartIcon}
          title={"Not Start"}
          count={notStart}
          
        />
        <InfoBox
          icon={todoIcon}
          title={"To Do"}
          count={toDo}
          
        />
        <InfoBox
          icon={doingIcon}
          title={"Doing"}
          count={doing}
          
        />
        <InfoBox
          icon={doneIcon}
          title={"Done"}
          count={done}
          
        />
        
        
      </div>
    </div>
  );
};

export default TaskSummary;