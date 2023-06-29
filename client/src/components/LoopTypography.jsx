import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import styled from "@emotion/styled";
import { useStateContext } from "../contexts/ContextProvider";

const StyledContainer = styled.div`
  margin-top: 8px;
  width: 8vw;
`

function LoopTypography() {
  const { visible, loopBody, timeInterval, loopIndex, setLoopIndex } = useStateContext();

  useEffect(() => {
    const interval = setInterval(() => {
        setLoopIndex((prevIndex) => (prevIndex + 1) % loopBody.length); // Use a functional update to ensure correct value
    }, timeInterval);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [loopBody.length, timeInterval]);

  return visible && (
    <StyledContainer>
    <Typography variant="body1" style={{fontSize:"1.5rem"}}>
      {loopBody[loopIndex]}
    </Typography>
    </StyledContainer>
  );
}

export default LoopTypography;