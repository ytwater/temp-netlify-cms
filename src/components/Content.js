import React from "react";
import PropTypes from "prop-types";

export const HTMLContent = ({ content, className }) => (
  <div color="textPrimary" component="div">
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string
};

Content.defaultProps = {
  content: "",
  className: ""
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
