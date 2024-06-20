import { Titlebar, TitlebarColor } from "custom-electron-titlebar";
import globalStyles from "./globalStyles";
import { injectCSS } from "./utils";
import { appConfig } from './config';

window.addEventListener("DOMContentLoaded", () => {
  console.log(appConfig.appName)
  new Titlebar({
    maximizable: true,
    closeable: true,
    minimizable: true,
    backgroundColor: TitlebarColor.fromHex("#00000000"),
    titleHorizontalAlignment: "center",
  });

  injectCSS(globalStyles);

  // Binding for forward and backward history navigation
  document.addEventListener("keydown", (event) => {
    if (event.altKey && event.key === "ArrowLeft") {
      window.history.back();
    }
    if (event.altKey && event.key === "ArrowRight") {
      window.history.forward();
    }
  });

  const titleBarTileElem = document.querySelector<HTMLDivElement>(".cet-title");
  if (titleBarTileElem) {
    titleBarTileElem.textContent = appConfig.appName;
  }

  const normalizeTitlebar = () => {
    setTimeout(() => {
      // Resent custom titlebar styles
      const titlebarElem = document.querySelector<HTMLDivElement>(".cet-titlebar");
      if (titlebarElem) {
        titlebarElem.style.backgroundColor = "transparent";
        titlebarElem.style.color = "inherit";
      }
    }, 20);
  };

  window.addEventListener("blur", () => {
    normalizeTitlebar();
  });
  window.addEventListener("focus", () => {
    normalizeTitlebar();
  });
});
