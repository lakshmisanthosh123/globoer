"use client";

import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "20px 40px",
  borderBottom: "1px solid #eee",
});

export default function Header() {
  return (
    <HeaderWrapper>
      <Typography
        textAlign="center"
        align="center"
        variant="h6"
        fontWeight={700}
      >
        GloboGoer
      </Typography>
    </HeaderWrapper>
  );
}
