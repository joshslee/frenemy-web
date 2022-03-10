import amplitude from 'amplitude-js';

export async function sendAmpEvent(event) {
  if (!window) return;
  const ampEvent = typeof event === "number" 
    ? formatEventByScreen(event) 
    : formatEvent(event);
  if (!ampEvent) return;
  amplitude.getInstance().logEvent(ampEvent);
};

function formatEventByScreen(screen) {
  switch(screen) {
    case 0:
      return "SCREEN_TITLE";  
    case 1:
      return "SCREEN_CHARACTER_SELECT";
    case 2:
      return "SCREEN_BATTLE";
    case 3:
      return "SCREEN_CREDITS";
    case "poap":
      return "USER_CLICK_POAP";
    default: 
      return null;
  }
}

function formatEvent(event) {
  switch(event) {
    case "poap":
      return "USER_CLICK_POAP";
    default:
      return null;
  }
}