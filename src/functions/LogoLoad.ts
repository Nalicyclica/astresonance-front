export const logo_url = "./img/logo.png";

export const logoLoad = (): HTMLImageElement => {
  const img = new Image();
  img.src = logo_url;
  return img;
};