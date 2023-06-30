import { format } from "date-fns";

/**
 *
 * @param {*} date
 * @returns
 */

export const formatDate = (date, formatString) => {
  return format(new Date(date), formatString);
};

//dd MMMM yyyy
