import Carousel from "./Carousel";

export const TileMedia = ({ i }) => {
  // VIDEO
  if (i.data.is_video) {
    return (
      <video
        controls
        className="tileImage"
        alt="Reddit does not have altText."
        width="300"
      >
        <source src={i.data.secure_media.reddit_video.fallback_url} />
        ...
      </video>
    );
  }
  // TEXT POST
  if (i.data.is_self) {
    return <p className="tileImage">{i.data.selftext_html}</p>;
  }
  // NSFW POST
  if (i.data.thumbnail === "nsfw") {
    return (
      <button className="tileNSFW">
        <a href={i.data.url} target="_blank">
          <span className="material-symbols-outlined">warning</span> NSFW
        </a>
      </button>
    );
  }

  // MULTI PICTURE POST FOR CAROSEL

  if (i.data.is_gallery) {
    const imageUrls = [];
    Object.values(i.data.media_metadata).forEach((item) => {
      // get medium resoultion image in Array, if not available get lower res
      if (item.p?.[3]?.u) {
        imageUrls.push(item.p[3].u);
      } else {
        imageUrls.push(item.p[0].u);
      }
    });
    // console.log(i.data.title + imageUrls);
    return (
      <div className="tileImage">
        <Carousel imageUrls={imageUrls}></Carousel>
      </div>
    );
  }

  // // single IMAGES BY RESOLUTION
  if (i.data.preview?.enabled) {
    if (i.data.preview.images[0].resolutions[3]?.url.replace(/&amp;/g, "&")) {
      return (
        <img
          className="tileImage"
          src={i.data.preview.images[0].resolutions[3]?.url.replace(
            /&amp;/g,
            "&"
          )}
          alt="Reddit does not have altText."
        />
      );
    }
    if (i.data.preview.images[0].resolutions[2]?.url.replace(/&amp;/g, "&")) {
      return (
        <img
          className="tileImage"
          src={i.data.preview.images[0].resolutions[2]?.url.replace(
            /&amp;/g,
            "&"
          )}
          alt="Reddit does not have altText."
        />
      );
    }
    if (i.data.preview.images[0].resolutions[1]?.url.replace(/&amp;/g, "&")) {
      return (
        <img
          className="tileImage"
          src={i.data.preview.images[0].resolutions[1]?.url.replace(
            /&amp;/g,
            "&"
          )}
          alt="Reddit does not have altText."
        />
      );
    }
    if (i.data.preview.images[0].resolutions[0].url.replace(/&amp;/g, "&")) {
      return (
        <img
          className="tileImage"
          src={i.data.preview.images[0].resolutions[0].url.replace(
            /&amp;/g,
            "&"
          )}
          alt="Reddit does not have altText."
        />
      );
    }
  }
  // ELSE RETURN THUMBNAIL
  else {
    return (
      <img
        className="tileImage"
        src={i.data.thumbnail}
        alt="Reddit does not have altText."
      />
    );
  }
};
