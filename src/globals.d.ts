interface Window {
  // Define type for GoatCounter global object
  goatcounter?: {
    no_onload?: boolean;
    count: (options: object) => void;
  };
}
