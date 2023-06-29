import React from "react";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import Recorder from './Recorder';
import SelectSubtitleButton from "./SelectSubtitleButton"

const StyledContainer = styled.div`
    margin-top: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
`;


const ControllerArea = () => {

  return (
    <StyledContainer>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <SelectSubtitleButton />
        </Grid>
        <Grid item xs={9}>
          <Recorder />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ControllerArea;