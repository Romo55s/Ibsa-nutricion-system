import logoWhite from "./brand/ibsa-logo-white.svg";
import aboutPortrait from "./people/mariana-about.webp";
import communityPortrait from "./people/mariana-community.webp";
import consultation from "./people/mariana-consultation.webp";
import consultationMobile from "./people/mariana-consultation-mobile.webp";
import formalHero from "./people/mariana-hero-formal-cutout.png";
import profile from "./people/mariana-profile.webp";
import portrait from "./people/mariana-portrait.webp";
import carrera01 from "./events/carrera-01.webp";
import carrera02 from "./events/carrera-02.webp";
import carrera03 from "./events/carrera-03.webp";
import carrera04 from "./events/carrera-04.webp";
import carreraCover from "./events/carrera-cover.webp";
import carreraCoverFeature from "./events/carrera-cover-feature.webp";
import wiremasters03 from "./events/wiremasters-03.webp";
import wiremasters04 from "./events/wiremasters-04.webp";
import wiremasters05 from "./events/wiremasters-05.webp";
import wiremasters06 from "./events/wiremasters-06.webp";
import wiremasters07 from "./events/wiremasters-07.webp";
import wiremasters08 from "./events/wiremasters-08.webp";
import wiremasters09 from "./events/wiremasters-09.webp";
import wiremasters10 from "./events/wiremasters-10.webp";
import phynRoom01 from "./clinic/phyn-room-01.webp";
import phynRoom02 from "./clinic/phyn-room-02.webp";
import certificateWomenAthlete from "./credentials/certificate-women-athlete.jpg";
import certificateBodyRecomposition from "./credentials/certificate-body-recomposition.jpg";
import { publicAssets } from "./publicAssets";

/** Import raster and vector assets from this catalog instead of individual files. */
export const assets = {
  brand: {
    logoWhite,
    publicLogoWhite: publicAssets.brand.whiteLogo,
  },
  people: {
    aboutPortrait,
    communityPortrait,
    consultation,
    consultationMobile,
    formalHero,
    profile,
    portrait,
  },
  events: {
    carrera: {
      cover: carreraCover,
      featuredCover: carreraCoverFeature,
      photos: [carrera01, carrera02, carrera03, carrera04],
    },
    wiremasters: [
      wiremasters03,
      wiremasters04,
      wiremasters05,
      wiremasters06,
      wiremasters07,
      wiremasters08,
      wiremasters09,
      wiremasters10,
    ],
  },
  clinic: {
    phynRoom01,
    phynRoom02,
  },
  credentials: {
    womenAthlete: certificateWomenAthlete,
    bodyRecomposition: certificateBodyRecomposition,
  },
  public: publicAssets,
} as const;

export { publicAssets };
