import { makeStyles } from "@material-ui/core";

export const useGlobalStyles = makeStyles(() => ({
  "@global": {
    "[data-sticky-td]": {
      position: "sticky"
    },
    "[data-sticky-last-left-td]": {
      boxShadow: "2px 0px 1px #ccc"
    },
    "[data-sticky-first-right-td]": {
      boxShadow: "-2px 0px 1px #ccc"
    }
  }
}));

export const useStyles = makeStyles(() => ({
  table: {
    border: "1px solid #ddd",
    maxWidth: "100%",
    width: 800,
    height: 400,
    overflow: "scroll"
  },
  tdh: {
    padding: 5,
    borderBottom: "1px solid #ddd",
    borderRight: "1px solid #ddd",
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  sticky: {
    position: "sticky",
    zIndex: 1,
    width: "fit-content"
  },
  header: {
    zIndex: 4,
    top: 0,
    boxShadow: "0px 3px 3px #ccc"
  },
  body: {
    position: "relative"
  }
}));
