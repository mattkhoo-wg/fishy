import { styled } from '@stitches/react';

export const LandingPageBox = styled('div', {
    width: "100%",
    height: "100%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column"
})

export const LogoContainer = styled('div', {
    diplay: "flex",
    alignContent: "center",
    justifyContent: "center"
})

export const SearchbarContainer = styled('div', {
    display: "flex",
    paddingTop: "20px",
    width: "400px",
    justifyContent: "center"
})
export const SecondSearchbarContainer = styled('div', {
    display: "flex",

    paddingTop: "20px",
    width: "400px",
    gap: "20px",
    justifyContent: "flex-end"
})
export const SubmitContainer = styled('div', {
    display: "flex",

    paddingTop: "20px",
    width: "400px",
    gap: "20px",
    justifyContent: "flex-start"
})

export const NavBar = styled('div', {
    display: "flex",
    alignContent: "right",
    justifyContent: "right",
    alignSelf: "flex-end",
    padding: "20px"
})

export const ResultBox = styled('div', {
    display: "flex",
    width: "400px",
    height: "400px",
    backgroundColor:"blue",
    justifyContent: "flex-start"
})