import { UserStatuses } from './enums';

export function descritionForStatuses() {
  return Object.keys(UserStatuses).reduce((acc, key) => {
    return (acc += `**${UserStatuses[key]} - ${key} ** \n`);
  }, '');
}
