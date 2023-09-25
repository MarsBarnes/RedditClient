import { useDispatch, useSelector } from "react-redux";
import {
  search,
  fetchData,
  fetchComments,
  selectVideoChecked,
  selectArticleChecked,
  selectImageChecked,
  selectNsfwChecked,
  selectTextChecked,
  selectFilter,
} from "./slice";
import React from "react";

export const SearchAndFilter = () => {
  const videoChecked = useSelector(selectVideoChecked);
  const articleChecked = useSelector(selectArticleChecked);
  const imageChecked = useSelector(selectImageChecked);
  const nsfwChecked = useSelector(selectNsfwChecked);
  const textChecked = useSelector(selectTextChecked);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [textInput, setTextInput] = React.useState("");
  const [filterOn, setFilterOn] = React.useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch(search(textInput));
      dispatch(fetchData());
      dispatch(fetchComments());
    }
  };

  return (
    <div
      className={`searchAndFilterFlex ${filterOn ? "" : "searchAndFilterOff"}`}
    >
      <h1 className="searchAndFilter searchAndFilterHeader">Reddit Basic</h1>
      <input
        className="searchBar"
        type="text"
        id="textInput"
        name="textInput"
        placeholder="Search"
        onChange={(e) => setTextInput(e.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        value={textInput}
      ></input>
      <button
        type="button"
        onClick={() => {
          dispatch(search(textInput));
          dispatch(fetchData());
          dispatch(fetchComments());
        }}
      >
        <span className="material-symbols-outlined searchAndFilter search searchAndFilterIcons">
          search
        </span>
      </button>
      <button
        type="button"
        onClick={() => {
          filterOn ? setFilterOn(false) : setFilterOn(true);
        }}
      >
        <span className="material-symbols-outlined searchAndFilter filterIcon searchAndFilterIcons">
          filter_list
        </span>
      </button>
      {filterOn && (
        <section className="filter">
          <div>
            <input
              type="checkbox"
              id="video"
              name="video"
              value="video"
              onChange={() => {
                dispatch(videoChecked());
                dispatch(filter());
              }}
            ></input>
            <label htmlFor="video">Video</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="text"
              name="text"
              value="text"
              onChange={() => {
                dispatch(textChecked());
                dispatch(filter());
              }}
            ></input>
            <label htmlFor="text">Text</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="image"
              name="image"
              value="image"
              onChange={() => {
                dispatch(imageChecked());
                dispatch(filter());
              }}
            ></input>
            <label htmlFor="image">Image</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="article"
              name="article"
              value="article"
              onChange={() => {
                dispatch(articleChecked());
                dispatch(filter());
              }}
            ></input>
            <label htmlFor="article">Article</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="nsfw"
              name="nsfw"
              value="nsfw"
              onChange={() => {
                dispatch(nsfwChecked());
                dispatch(filter());
              }}
            ></input>
            <label htmlFor="nsfw">NSFW</label>
          </div>
        </section>
      )}
    </div>
  );
};
