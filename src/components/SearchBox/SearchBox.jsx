import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import {
  changeFilterName,
  changeFilterNumber,
} from "../../redux/filters/slice";

import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors";
const SearchBox = () => {
  const nameValue = useSelector(selectNameFilter);
  const numberValue = useSelector(selectNumberFilter);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    dispatch(changeFilterName(e.target.value));
  };

  const handleNumberChange = (e) => {
    dispatch(changeFilterNumber(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <label>
        Find contacts by name
        <input type="text" value={nameValue} onChange={handleNameChange} />
      </label>
      <label>
        Find contacts by number
        <input type="text" value={numberValue} onChange={handleNumberChange} />
      </label>
    </div>
  );
};

export default SearchBox;
