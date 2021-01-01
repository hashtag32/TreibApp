
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    marginBottom: 100,
    paddingBottom: theme.spacing(1),
  },
  media: {
    height: 140,
  },
  dialogtitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

class QRCodeComp extends React.Component {
  constructor(props) {
    super(props);

    // Integrate script
    this.state = {
      link: "test",
    };
  }

  render() {
    return (
      <QRCode
        value={this.props.link}
        size={200}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={true}
        renderAs={"svg"}
        imageSettings={{
          src:
            "https://spexdoc.net/wp-content/uploads/2020/07/SpexDoc_logo_png.png",
          x: null,
          y: null,
          height: 20,
          width: 20,
          excavate: true,
        }}
      />
    );
  }
}

QRCodeComp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QRCodeComp);
