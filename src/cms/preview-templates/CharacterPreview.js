import React from "react";
import PropTypes from "prop-types";
import { CharacterTemplate } from "../../templates/character";

const CharactePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    return (
      <CharacterTemplate
        preview
        // content={widgetFor('body')}
        title={data.title}
        type={data.type}
        thumbnail={data.thumbnail}
      />
    );
  }
  return <div>Loading...</div>;
};

CharactePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }).isRequired,
  widgetFor: PropTypes.func.isRequired
};

export default CharactePreview;
