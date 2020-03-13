import React from "react";
import PropTypes from "prop-types";

import { CharacterPageTemplate } from "../../templates/character-page";

const CharacterPagePreview = ({ entry, widgetFor, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();

  console.log(
    `TCL: CharacterPagePreview -> render -> entry.getIn(["data", "topImages"])`,
    entry.getIn(["data", "topImages"])
  );
  const topImages = [];
  if (
    entry.getIn(["data", "topImages"]) &&
    entry.getIn(["data", "topImages"]).size
  ) {
    for (let i = 0; i < entry.getIn(["data", "topImages"]).size; i++) {
      topImages.push({
        alt: entry.getIn(["data", "topImages", i, "alt"]),
        image: getAsset(entry.getIn(["data", "topImages", i, "image"]))
      });
    }
  }
  // entry.getIn(["data", "topImages"]).forEach(topImage => {
  //   topImages.push({
  //     alt: topImage.alt,
  //     image: getAsset(topImage.image)
  //   });
  // });

  const topLeftImages = [];
  if (
    entry.getIn(["data", "topLeftImages"]) &&
    entry.getIn(["data", "topLeftImages"]).size
  ) {
    for (let i = 0; i < entry.getIn(["data", "topLeftImages"]).size; i++) {
      topLeftImages.push({
        alt: entry.getIn(["data", "topLeftImages", i, "alt"]),
        image: getAsset(entry.getIn(["data", "topLeftImages", i, "image"]))
      });
    }
  }
  // const topLeftImages = data.topLeftImages
  //   ? []
  //   : data.topLeftImages.map(topLeftImage => ({
  //       alt: topLeftImage.alt,
  //       image: getAsset(topLeftImage.image)
  //     }));

  const bottomLeftImages = [];
  if (
    entry.getIn(["data", "bottomLeftImages"]) &&
    entry.getIn(["data", "bottomLeftImages"]).size
  ) {
    for (let i = 0; i < entry.getIn(["data", "bottomLeftImages"]).size; i++) {
      bottomLeftImages.push({
        alt: entry.getIn(["data", "bottomLeftImages", i, "alt"]),
        image: getAsset(entry.getIn(["data", "bottomLeftImages", i, "image"]))
      });
    }
  }
  // const bottomLeftImages = data.bottomLeftImages
  //   ? []
  //   : data.bottomLeftImages.map(bottomLeftImage => ({
  //       alt: bottomLeftImage.alt,
  //       image: getAsset(bottomLeftImage.image)
  //     }));

  const gallery = [];
  if (
    entry.getIn(["data", "gallery"]) &&
    entry.getIn(["data", "gallery"]).size
  ) {
    for (let i = 0; i < entry.getIn(["data", "gallery"]).size; i++) {
      gallery.push({
        youtubeId: entry.getIn(["data", "gallery", i, "youtubeId"]),
        image: getAsset(entry.getIn(["data", "gallery", i, "image"]))
      });
    }
  }
  // const gallery = data.gallery
  //   ? []
  //   : data.gallery.map(galleryItem => ({
  //       alt: galleryItem.alt,
  //       image: getAsset(galleryItem.image)
  //     }));
  return (
    <CharacterPageTemplate
      preview
      content={widgetFor("body")}
      title={data.title}
      youtubeId={data.youtubeId}
      topImages={topImages}
      topLeftImages={topLeftImages}
      bottomLeftImages={bottomLeftImages}
      gallery={gallery}
    />
  );
};

CharacterPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default CharacterPagePreview;
