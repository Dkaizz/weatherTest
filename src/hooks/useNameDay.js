function useNameDay(day) {
  // Khai báo đối tượng Date
  var date = new Date(day);

  // Lấy số thứ tự của ngày hiện tại
  var current_day = date.getDay();

  // Biến lưu tên của thứ
  var day_name = '';

  // Lấy tên thứ của ngày hiện tại
  switch (current_day) {
    case 0:
      day_name = 'Sunday';
      break;
    case 1:
      day_name = 'MonDay';
      break;
    case 2:
      day_name = 'Tuesday ';
      break;
    case 3:
      day_name = 'Wednesday';
      break;
    case 4:
      day_name = 'Thursday';
      break;
    case 5:
      day_name = 'Friday';
      break;
    case 6:
      day_name = 'Saturday';
      break;
    default:
      break;
  }

  return day_name;
}

export default useNameDay;
