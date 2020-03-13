import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, jssPreset, StylesProvider } from "@material-ui/styles";
import { create } from "jss";

import theme from "../../theme";

import { CharacterCollectionTemplate } from "../../templates/character-collection";

class CharacterCollectionPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }

  handleRef = ref => {
    const ownerDocument = ref ? ref.ownerDocument : null;
    this.setState({
      ready: true,
      jss: create({
        ...jssPreset(),
        insertionPoint: ownerDocument
          ? ownerDocument.querySelector("#demo-frame-jss")
          : null
      }),
      sheetsManager: new Map()
    });
  };

  render() {
    const { entry, widgetFor } = this.props;
    const { ready, jss, sheetsManager } = this.state;
    const data = entry.getIn(["data"]).toJS();

    if (data) {
      return (
        <>
          <div id="demo-frame-jss" ref={this.handleRef} />
          {ready ? (
            <StylesProvider jss={jss} sheetsManager={sheetsManager}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <CharacterCollectionTemplate
                  content={widgetFor("body")}
                  title={entry.getIn(["data", "title"])}
                  subtitle={entry.getIn(["data", "subtitle"])}
                  bannerImage={entry.getIn(["data", "bannerImage"])}
                  displayCharacters={entry.getIn(["data", "displayCharacters"])}
                />
              </ThemeProvider>
            </StylesProvider>
          ) : null}
        </>
      );
    }
    return <div>Loading...</div>;
  }
}

CharacterCollectionPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }).isRequired,
  widgetFor: PropTypes.func.isRequired
};

export default CharacterCollectionPreview;
