import { format } from "date-fns";

/**
 *
 * @param {*} date
 * @returns formatted date based on passed formatString
 */

export const formatDate = (date, formatString) => {
  return format(new Date(date), formatString);
};
