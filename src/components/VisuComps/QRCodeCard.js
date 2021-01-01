import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import QRCodeComp from "components/VisuComps/QRCodeComp.js";
import React from "react";
import ReactToPrint from "react-to-print";
import ShareIcon from "@material-ui/icons/Share";
import { shareLink } from "components/Internal/Sharing";
import { withStyles } from "@material-ui/core/styles";

import {removehttpsFromLink} from "components/Internal/Checks"


const styles = (theme) => ({
});

class QRCodeCard extends React.Component {
  constructor(props) {
    super(props);
  }

  shareLink = () => {
    return shareLink(
      "Hallo, hier habe ich dir meine Daten freigegeben: \n",
      removehttpsFromLink(this.props.link)
    );
  };

  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Hier ausdrucken</a>}
          content={() => this.componentRef}
        />
        <div>
          <QRCodeComp ref={(el) => (this.componentRef = el)} {...this.props} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a href={this.props.link} onClick={this.shareLink}>
              {removehttpsFromLink(this.props.link)}
            </a>
            {/* Oder einfach nur auf den Link klicken */}
            <IconButton
              onClick={this.shareLink}
              style={{ marginLeft: "auto" }}
              aria-label="share"
            >
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

QRCodeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QRCodeCard);
