import React, { useState, Fragment, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Fade,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Zoom,
} from "@mui/material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(4),
  right: theme.spacing(4),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  minWidth: theme.spacing(18),
}));

const ReloadFab = styled(Fab)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(4),
  left: theme.spacing(4),
}));

const Transition = forwardRef((props, ref) => <Zoom in ref={ref} {...props} />);

const Menu = ({ refresh }) => {
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.menu.showMenu);
  const navigate = useNavigate();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDialog = () => setShowDialog(false);

  return (
    <Fragment>
      <Fade in={showMenu}>
        <StyledFab
          aria-label={"shape"}
          color="primary"
          onClick={() => setShowDialog(true)}
        >
          <ChangeHistoryIcon />
        </StyledFab>
      </Fade>

      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogTitle>Choose your geometric shape</DialogTitle>
        <DialogContent>
          <StyledSelect
            value={location.pathname}
            onChange={(event) => {
              navigate(event.target.value);
              setShowDialog(false);
              dispatch({
                type: "menu/setShowMenu",
                payload: false,
              });
            }}
          >
            <MenuItem value={"/"}>Home (△)</MenuItem>
            <MenuItem value={"/cube"}>Cube</MenuItem>
            <MenuItem value={"/seed-of-life"}>The Seed Of Life</MenuItem>
            <MenuItem value={"/flower-of-life"}>The Flower Of Life</MenuItem>
            <MenuItem value={"/merkaba"}>Merkaba</MenuItem>
          </StyledSelect>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Menu;
