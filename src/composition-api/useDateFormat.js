import moment from 'moment';

export default function useDateFormat() {

  const getDate = (value) => {
    let resultDate = '';

    let dateTimeArr = value.split('T');
    let time = dateTimeArr[1];

    // date格式需為YYYY-MM-DD
    let dateArr = dateTimeArr[0].split('-');
    let date = `${dateArr[0]}-${getMonth(dateArr[1])}-${dateArr[2]}`;

    let dateTime = `${date}T${time}`;
    resultDate = moment(dateTime).format('YYYY/MM/DD')

    return resultDate;
  };

  const getMonth = (month) => {
    return month.length < 2 ? `0${month}` : month;
  };

  return {
    getDate,
  };
  
}
