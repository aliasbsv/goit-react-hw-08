import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const filterValue = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    const value = event.target.value;
    dispatch(changeFilter(value));
  };

  return (
    <div>
      <label>
        <span className={css.searchBox}>Find contacts by name:</span>
        <br />
        <input type="text" value={filterValue} onChange={handleFilter} />
      </label>
    </div>
  );
};

export default SearchBox;
