import { useEffect } from "react";

export default function UseWebsiteTitle(title) {
  const setTitle = (newTitle) => {
    document.title = newTitle;
  };

  useEffect(() => {
    setTitle(title);
  }, [title]);

  return setTitle;
}
