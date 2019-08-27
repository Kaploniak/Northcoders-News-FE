import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";

export const datePrettier = date => {
  const time = new Date(date);
  return `${formatDistanceToNow(time)} ago`;
};

export const dateFormat = date => {
  const time = new Date(date);
  return `${format(time, "dd-MMMM-yyyy")}`;
};
export const timeFormat = date => {
  const time = new Date(date);
  return `${format(time, "HH:mm:ss")}`;
};
