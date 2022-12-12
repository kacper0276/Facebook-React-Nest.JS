export const reducer = (state, action) => {
  switch (action.type) {
    case "change-theme":
      return { ...state };

    default:
      throw new Error(`Nie ma takiej akcji: ${action.type}`);
  }
};

export const initialState = {
  theme: "black",
};
