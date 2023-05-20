import moment from 'moment';


moment.updateLocale('uk', {
    relativeTime: {
      future: 'за %s',
      past: '%s тому',
      s: 'декілька секунд',
      ss: '%d секунд',
      m: function (number, withoutSuffix, key, isFuture) {
        if (withoutSuffix) {
          return number === 1 ? 'хвилина' : number < 5 ? 'хвилини' : 'хвилин';
        } else {
          return isFuture ? 'хвилину' : 'хвилину';
        }
      },
      mm: function (number, withoutSuffix, key, isFuture) {
        if (withoutSuffix || isFuture) {
          return number === 1 ? 'хвилина' : number < 5 ? 'хвилини' : 'хвилин';
        } else {
          return number + ' хвилин';
        }
      },
      h: function (number, withoutSuffix, key, isFuture) {
        if (withoutSuffix) {
          return number === 1 ? 'година' : number < 5 ? 'години' : 'годин';
        } else {
          return isFuture ? 'годину' : 'годину';
        }
      },
      hh: function (number, withoutSuffix, key, isFuture) {
        if (withoutSuffix || isFuture) {
          return number === 1 ? 'година' : number < 5 ? 'години' : 'годин';
        } else {
          return number + ' годин';
        }
      },
      d: 'день',
      dd: '%d днів',
      M: 'місяць',
      MM: '%d місяців',
      y: 'рік',
      yy: '%d роки',
    },
  });

export default moment;