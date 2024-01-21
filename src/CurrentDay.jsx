const currentDate = new Date();

const options = { weekday: 'long'}
export const dayOfWeek = currentDate.toLocaleDateString('fi-FI', options);
export const dateForToday =  currentDate.toLocaleDateString('fi-FI');
