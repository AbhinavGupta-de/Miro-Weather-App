const currentDate = new Date();

const options = { weekDay: 'long'}
export const dayOfWeek = currentDate.toLocaleDateString('en-US', options);
