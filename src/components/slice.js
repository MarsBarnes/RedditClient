import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "art",
  currentFilters: [],
  loading: true,
  filteredPostData: [],
  postData: [],
  commentData: {},
  loadingComments: true,
  slideWidth: 0,
  slidesContainerScrollLeft: 0,
  videoChecked: false,
  articleChecked: false,
  textChecked: false,
  imageChecked: false,
  nsfwChecked: false,
};

export const fetchData = createAsyncThunk(
  "slice/fetchBySearchQuery",
  async (anUnusedVariable, thunkAPI) => {
    const res = await fetch(
      `https://www.reddit.com/r/${thunkAPI.getState().searchText}.json`
    );
    console.log(thunkAPI.getState());
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.status);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "slice/fecthComments",
  async (i, thunkAPI) => {
    const article = thunkAPI.getState().postData[i];
    console.log(`fetch comments article: ${article.data.id}`);
    const res = await fetch(
      `https://www.reddit.com${article.data.permalink.replace(/\/$/, "")}.json`
    );
    console.log(thunkAPI.getState());
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.status);
    }
  }
);

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchText = action.payload;
    },
    setSlideWidth: (state, action) => {
      state.slideWidth = action.payload;
    },
    nextSlide: (state) => {
      state.slidesContainerScrollLeft += state.slideWidth;
    },
    prevSlide: (state) => {
      state.slidesContainerScrollLeft -= state.slideWidth;
    },
    setVideoChecked: (state) => {
      state.videoChecked = state.videoChecked ? false : true;
      console.log(state.videoChecked);
    },
    setTextChecked: (state) => {
      state.textChecked = state.textChecked ? false : true;
      console.log(state.textChecked);
    },
    setArticleChecked: (state) => {
      state.articleChecked = state.articleChecked ? false : true;
      console.log(state.articleChecked);
    },
    setImageChecked: (state) => {
      state.imageChecked = state.imageChecked ? false : true;
      console.log(state.imageChecked);
    },
    setNsfwChecked: (state) => {
      state.nsfwChecked = state.nsfwChecked ? false : true;
      console.log(state.nsfwChecked);
    },
    filter: (state) => {
      state.filteredPostData = state.postData.filter((i, index) => {
        if (
          state.videoChecked === false &&
          state.articleChecked === false &&
          state.nsfwChecked === false &&
          state.imageChecked === false &&
          state.textChecked === false
        ) {
          return true;
        }
        if (state.videoChecked === true && i.data.is_video === true) {
          return true;
        }
        if (state.articleChecked === true && i.data.post_hint === "link") {
          return true;
        }
        if (state.nsfwChecked === true && i.data.thumbnail === "nsfw") {
          return true;
        }
        if (state.imageChecked === true && (i.data.is_gallery === true || i.data.post_hint === "image")) {
          return true;
        }
        if (state.textChecked === true && i.data.is_self === true) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.postData = action.payload.data.children;
        state.filteredPostData = action.payload.data.children;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.postData = [];
      })
      .addCase(fetchComments.pending, (state) => {
        state.loadingComments = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loadingComments = false;
        let commentsObject = action.payload[1].data.children;
        console.log("commentsObject:", commentsObject);

        // Create an array of objects with index and comment data
        let commentsArray = commentsObject.map((item, index) => ({
          parentID: item.data.parent_id,
          data: item.data.body,
        }));
        const articleId = action.payload[0].data.children[0].data.id;
        console.log("article Id for comments", articleId);
        state.commentData[articleId] = commentsArray;
        console.log("commentData:", state.commentData);
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loadingComments = false;
        state.commentData = {};
      });
  },
});

export default slice;

export const selectLoading = (state) => state.loading;
export const selectSearchText = (state) => state.searchText;
export const selectPostData = (state) => state.postData;
export const selectCommentData = (state) => state.commentData;
export const { setSlideWidth, nextSlide, prevSlide } = slice.actions;
export const selectVideoChecked = (state) => slice.actions.setVideoChecked;
export const selectArticleChecked = (state) => slice.actions.setArticleChecked;
export const selectTextChecked = (state) => slice.actions.setTextChecked;
export const selectNsfwChecked = (state) => slice.actions.setNsfwChecked;
export const selectImageChecked = (state) => slice.actions.setImageChecked;
export const selectFilter = (state) => slice.actions.filter;
export const selectFilteredPostData = (state) => state.filteredPostData;
export const { search } = slice.actions;
