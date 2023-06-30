import { format } from "date-fns";

/**
 *
 * @param {*} time
 * @returns
 */

export const formatTime = (time) => {
  return format(new Date(time), "h:mm a");
};
