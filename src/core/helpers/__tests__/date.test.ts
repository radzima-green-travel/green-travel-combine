import { msToHoursAndMinutes } from '../date';

describe('msToHoursAndMinutes', () => {
  it('should convert ms to hours and minutes', () => {
    expect(msToHoursAndMinutes(25800000)).toEqual({
      hours: 7,
      minutes: 10,
    });

    expect(msToHoursAndMinutes(0)).toEqual({
      hours: 0,
      minutes: 0,
    });

    expect(msToHoursAndMinutes(3600000)).toEqual({
      hours: 1,
      minutes: 0,
    });

    expect(msToHoursAndMinutes(60000)).toEqual({
      hours: 0,
      minutes: 1,
    });

    expect(msToHoursAndMinutes(600000)).toEqual({
      hours: 0,
      minutes: 10,
    });
  });
});
