import * as DOMPurify from "dompurify";
import Carousel from "./Carousel";

function decodeHTMLEntities(text) {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

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
    return (
      <p
        className="tileImage"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(decodeHTMLEntities(i.data.selftext_html)),
        }}
      />
    );
  }
  // NSFW POST
  if (i.data.thumbnail === "nsfw") {
    return (
      <button className="tileNSFW">
        <a href={i.data.url} target="_blank" rel="noreferrer">
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
    return (
      <div className="tileImage">
        <Carousel imageUrls={imageUrls}></Carousel>
      </div>
    );
  }

  // SINGLE IMAGES BY RESOLUTION
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
