import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, jssPreset, StylesProvider } from "@material-ui/styles";
import { create } from "jss";

import theme from "../../theme";

import { BlockTemplate } from "../../templates/block";

class BlockPreview extends React.Component {
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
                <BlockTemplate
                  title={data.title}
                  header={data.header}
                  centerHeader={data.centerHeader}
                  centerText={data.centerText}
                  content={widgetFor("body")}
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

BlockPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }).isRequired,
  widgetFor: PropTypes.func.isRequired
};

export default BlockPreview;
