// ============================================================
// فایل اصلی جاوااسکریپت - توابع مشترک و داده‌های هتل
// این فایل به همه صفحات وصل می‌شود
// ماژول‌ها:
//   1) data          : آرایه اتاق‌ها + نام انواع
//   2) utils         : formatPrice, calculateNights, getToday/Tomorrow, storage
//   3) jalali        : تقویم شمسی (خروجی متن و هم تقویم popup)
//   4) shamsiCal     : کامپوننت تقویم شمسی (popup + range select)
//   5) navbar        : منوی موبایل (drawer + backdrop + auto close)
//   6) gallery       : گالری عکس اتاق
//   7) home          : صفحه اصلی
//   8) rooms         : صفحه لیست اتاق‌ها
//   9) room-detail   : صفحه جزئیات + فرم رزرو
//  10) my-bookings   : صفحه رزروهای من
// ============================================================

(function () {
  'use strict';

  // ===========================================================
  // 1) DATA — لیست اتاق‌ها
  // ===========================================================
  var rooms = [
    {
      id: 1,
      name: "اتاق استاندارد",
      type: "standard",
      price: 1200000,
      capacity: 2,
      size: 25,
      image: "image/1.jpg",
    images: [
      "image/1.1.jpg",
      "image/1.2.jpg",
      "image/1.3.jpg"
    ],
      description: "اتاق استاندارد با چشم‌اندازی زیبا به حیاط هتل، مجهز به تمام امکانات رفاهی برای یک اقامت راحت.",
      amenities: ["تلویزیون LED", "WiFi رایگان", "مینی‌بار", "سرویس بهداشتی مجزا", "کولر و گرمایش مرکزی"],
      popular: true
    },
    {
      id: 2,
      name: "اتاق دلوکس",
      type: "deluxe",
      price: 1900000,
      capacity: 2,
      size: 35,
      image: "image/2.jpg",
    images: [
      "image/2.1.jpg",
      "image/2.2.jpg",
      "image/2.3.jpg"
    ],
      description: "اتاق دلوکس با دکوراسیون مدرن و الهام گرفته از نقش‌های سنتی اصفهان، تجربه‌ای لوکس در دل تاریخ.",
      amenities: ["تلویزیون ۵۵ اینچ", "WiFi پرسرعت", "مینی‌بار کامل", "وان حمام", "بالکن اختصاصی", "سرویس اتاق ۲۴ساعته"],
      popular: true
    },
    {
      id: 3,
      name: "سوئیت خانوادگی",
      type: "suite",
      price: 3200000,
      capacity: 4,
      size: 60,
      image: "image/3.jpg",
    images: [
      "image/3.1.jpg",
      "image/3.2.jpg",
      "image/3.3.jpg"
    ],
      description: "سوئیت خانوادگی با دو اتاق خواب مجزا، نشیمن بزرگ و آشپزخانه کوچک، ایده‌آل برای سفر خانوادگی.",
      amenities: ["دو اتاق خواب مجزا", "نشیمن بزرگ", "آشپزخانه کوچک", "WiFi پرسرعت", "۲ تلویزیون", "جکوزی"],
      popular: true
    },
    {
      id: 4,
      name: "سوئیت رویال",
      type: "royal",
      price: 5500000,
      capacity: 2,
      size: 80,
      image: "image/4.jpg",
    images: [
      "image/4.1.jpg",
      "image/4.2.jpg",
      "image/4.3.jpg"
    ],
      description: "سوئیت رویال با طراحی الهام گرفته از کاخ‌های تاریخی اصفهان، بالاترین سطح لوکس و آسایش برای مسافران ویژه.",
      amenities: ["طراحی رویال اختصاصی", "استخر خصوصی", "خدمات باتلر", "میز صبحانه اختصاصی", "منظره میدان نقش‌جهان", "ترانسفر رایگان"],
      popular: true
    },
    {
      id: 5,
      name: "اتاق توئین",
      type: "standard",
      price: 1400000,
      capacity: 2,
      size: 28,
      image: "image/5.jpg",
    images: [
      "image/5.1.jpg",
      "image/5.2.jpg",
      "image/5.3.jpg"
    ],
      description: "اتاق توئین با دو تخت یک نفره جدا، مناسب برای دوستان یا همکارانی که با هم سفر می‌کنند.",
      amenities: ["دو تخت یک نفره", "تلویزیون LED", "WiFi رایگان", "مینی‌بار", "کولر و گرمایش"],
      popular: false
    },
    {
      id: 6,
      name: "سوئیت اجرایی",
      type: "suite",
      price: 2800000,
      capacity: 2,
      size: 50,
      image: "image/6.jpg",
    images: [
      "image/6.1.jpg",
      "image/6.2.jpg",
      "image/6.3.jpg"
    ],
      description: "سوئیت اجرایی با اتاق جلسه کوچک و میز کار اختصاصی، برای مسافران تجاری که به فضای حرفه‌ای نیاز دارند.",
      amenities: ["اتاق جلسه کوچک", "میز کار اختصاصی", "چاپگر", "WiFi پرسرعت", "مینی‌بار", "سرویس اتاق ۲۴ساعته"],
      popular: false
    }
  ];

  var roomTypeNames = {
    standard: "استاندارد",
    deluxe: "دلوکس",
    suite: "سوئیت",
    royal: "رویال"
  };

  // نام ماه‌های شمسی
  var persianMonthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  // نام روزهای هفته (شنبه اول)
  var persianWeekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  // ===========================================================
  // 2) UTILS
  // ===========================================================

  // قیمت فارسی
  function formatPrice(price) {
    return Number(price).toLocaleString('fa-IR') + ' تومان';
  }

  // محاسبه تعداد شب
  function calculateNights(checkIn, checkOut) {
    var d1 = new Date(checkIn);
    var d2 = new Date(checkOut);
    return Math.round((d2 - d1) / 86400000);
  }

  // YYYY-MM-DD امروز
  function getTodayString() {
    var t = new Date();
    return dateToYMD(t);
  }

  // YYYY-MM-DD فردا
  function getTomorrowString() {
    var t = new Date();
    t.setDate(t.getDate() + 1);
    return dateToYMD(t);
  }

  function dateToYMD(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  // localStorage
  function getBookings() {
    try {
      var data = localStorage.getItem('hotelBookings');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveBooking(booking) {
    booking.id = 'BK' + Date.now();
    booking.createdAt = new Date().toISOString();
    var all = getBookings();
    all.push(booking);
    localStorage.setItem('hotelBookings', JSON.stringify(all));
    return booking.id;
  }

  function cancelBooking(bookingId) {
    var all = getBookings();
    var out = [];
    for (var i = 0; i < all.length; i++) {
      if (all[i].id !== bookingId) out.push(all[i]);
    }
    localStorage.setItem('hotelBookings', JSON.stringify(out));
  }

  function getRoomById(id) {
    var n = Number(id);
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].id === n) return rooms[i];
    }
    return null;
  }

  // ساخت کارت HTML اتاق
  function buildRoomCard(room) {
    return '<div class="room-card">' +
      '<div style="overflow:hidden;">' +
        '<img src="' + room.image + '" alt="' + room.name + '" />' +
      '</div>' +
      '<div class="room-card-body">' +
        '<div class="room-type-badge">' + roomTypeNames[room.type] + '</div>' +
        '<div class="room-name">' + room.name + '</div>' +
        '<div class="room-meta">' +
          '<span>👤 تا ' + room.capacity + ' نفر</span>' +
          '<span>📐 ' + room.size + ' متر</span>' +
        '</div>' +
        '<div class="room-price">' + formatPrice(room.price) + ' <small>/ هر شب</small></div>' +
        '<a href="room-detail.html?id=' + room.id + '" class="btn-primary" style="width:100%;text-align:center;display:block;">' +
          'مشاهده و رزرو' +
        '</a>' +
      '</div>' +
    '</div>';
  }

  // کارت اتاق برای rooms.html (با 3 amenity و دو دکمه)
  function buildRoomCardFull(room) {
    return '<div class="room-card fade-in">' +
      '<div style="overflow:hidden;">' +
        '<img src="' + room.image + '" alt="' + room.name + '" loading="lazy" />' +
      '</div>' +
      '<div class="room-card-body">' +
        '<div class="room-type-badge">' + roomTypeNames[room.type] + '</div>' +
        '<div class="room-name">' + room.name + '</div>' +
        '<div class="room-meta">' +
          '<span>👤 تا ' + room.capacity + ' نفر</span>' +
          '<span>📐 ' + room.size + ' متر مربع</span>' +
        '</div>' +
        '<div style="font-size:0.82rem;color:#64748b;margin:0.4rem 0 0.7rem;">' +
          room.amenities.slice(0, 3).join(' · ') +
        '</div>' +
        '<div class="room-price">' + formatPrice(room.price) + ' <small>/ هر شب</small></div>' +
        '<div style="display:flex;gap:0.6rem;">' +
          '<a href="room-detail.html?id=' + room.id + '" class="btn-primary" style="flex:1;text-align:center;">رزرو کنید</a>' +
          '<a href="room-detail.html?id=' + room.id + '" class="btn-outline" style="flex:0 0 auto;padding:0.65rem 0.9rem;">جزئیات</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  // تبدیل میلادی به شمسی با الگوریتم جلالی (دقیق)
  // خروجی: {jy, jm, jd}
  function gregorianToJalali(gy, gm, gd) {
    var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var gy2 = (gm > 2) ? (gy + 1) : gy;
    var days =
      355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) -
      Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) +
      gd + g_d_m[gm - 1];
    var jy = -1595 + (33 * Math.floor(days / 12053));
    days = days % 12053;
    jy += 4 * Math.floor(days / 1461);
    days = days % 1461;
    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    var jm, jd;
    if (days < 186) {
      jm = 1 + Math.floor(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + Math.floor((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    return { jy: jy, jm: jm, jd: jd };
  }

  // تبدیل شمسی به میلادی — الگوریتم jalaali-js (port به ES5)
  // خروجی: {gy, gm, gd}
  function jalaliToGregorian(jy, jm, jd) {
    return d2g(j2d(jy, jm, jd));
  }

  // بررسی کبیسه بودن سال شمسی (بر اساس jalaali-js)
  function isJalaliLeap(jy) {
    return jalCalLeap(jy) === 0;
  }

  // ----- internals از jalaali-js (الگوریتم Kazimierz M. Borkowski) -----
  var J_BREAKS = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
    1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
  function div(a, b) { return ~~(a / b); }
  function mod(a, b) { return a - ~~(a / b) * b; }
  function jalCalLeap(jy) {
    var bl = J_BREAKS.length, jp = J_BREAKS[0], jm, jump, leap, n, i;
    if (jy < jp || jy >= J_BREAKS[bl - 1]) throw new Error('Invalid Jalaali year ' + jy);
    for (i = 1; i < bl; i += 1) {
      jm = J_BREAKS[i]; jump = jm - jp;
      if (jy < jm) break;
      jp = jm;
    }
    n = jy - jp;
    if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;
    return leap;
  }
  function jalCal(jy) {
    var bl = J_BREAKS.length, gy = jy + 621, leapJ = -14, jp = J_BREAKS[0],
      jm, jump, leap, leapG, march, n, i;
    if (jy < jp || jy >= J_BREAKS[bl - 1]) throw new Error('Invalid Jalaali year ' + jy);
    for (i = 1; i < bl; i += 1) {
      jm = J_BREAKS[i]; jump = jm - jp;
      if (jy < jm) break;
      leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
      jp = jm;
    }
    n = jy - jp;
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
    leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
    march = 20 + leapJ - leapG;
    if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;
    return { leap: leap, gy: gy, march: march };
  }
  function g2d(gy, gm, gd) {
    var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
      div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
  }
  function d2g(jdn) {
    var j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    var i = div(mod(j, 1461), 4) * 5 + 308;
    var gd = div(mod(i, 153), 5) + 1;
    var gm = mod(div(i, 153), 12) + 1;
    var gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return { gy: gy, gm: gm, gd: gd };
  }
  function j2d(jy, jm, jd) {
    var r = jalCal(jy);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
  }

  // تعداد روزهای یک ماه شمسی
  function jalaliMonthDays(jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    return isJalaliLeap(jy) ? 30 : 29;
  }

  // شمسی به Date (میلادی)
  function jalaliToDate(jy, jm, jd) {
    var g = jalaliToGregorian(jy, jm, jd);
    return new Date(g.gy, g.gm - 1, g.gd);
  }

  // Date (میلادی) به شمسی
  function dateToJalali(d) {
    return gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }

  // YYYY-MM-DD میلادی به "۱۴۰۳/۰۵/۱۲"
  function toShamsi(ymd) {
    var d = new Date(ymd);
    var j = gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    var p2 = function (n) { return String(n).padStart(2, '۰'); };
    return toFa(j.jy) + '/' + p2(j.jm) + '/' + p2(j.jd);
  }

  // YYYY-MM-DD میلادی به "۱۲ مرداد ۱۴۰۳"
  function toShamsiLong(ymd) {
    var d = new Date(ymd);
    var j = gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    return toFa(j.jd) + ' ' + persianMonthNames[j.jm - 1] + ' ' + toFa(j.jy);
  }

  // تبدیل عدد انگلیسی به فارسی
  function toFa(n) {
    return String(n).replace(/[0-9]/g, function (c) {
      return '۰۱۲۳۴۵۶۷۸۹'[c];
    });
  }

  // YYYY-MM-DD میلادی به شی Date میلادی
  function ymdToDate(ymd) {
    var p = ymd.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  // شمسی به YYYY-MM-DD میلادی
  function jalaliToYMD(jy, jm, jd) {
    var g = jalaliToGregorian(jy, jm, jd);
    return g.gy + '-' + String(g.gm).padStart(2, '0') + '-' + String(g.gd).padStart(2, '0');
  }

  // ===========================================================
  // 3) JALALI (توابع ساده متنی - حفظ API قبلی)
  // ===========================================================
  function toJalaliText(dateStr) {
    return toShamsiLong(dateStr);
  }

  // ===========================================================
  // 4) SHAMSI CALENDAR (کامپوننت popup)
  // ===========================================================
  // استفاده:
  //   ShamsiCalendar.attach(inputEl, { onChange: fn, min: 'YYYY-MM-DD', placeholder: '...' });
  // یا برای دو فیلد range (checkIn/checkOut):
  //   ShamsiCalendar.attachRange(inEl, outEl, { onChange: fn, minIn: 'YYYY-MM-DD' });
  var ShamsiCalendar = (function () {
    var openInstance = null;

    function todayJalali() {
      return dateToJalali(new Date());
    }

    function buildCalendar(year, month, opts) {
      var firstG = jalaliToDate(year, month, 1);
      // روز هفته 0=یکشنبه، 6=شنبه. ما می‌خواهیم شنبه=0
      var weekday = (firstG.getDay() + 1) % 7; // شنبه=0
      var monthDays = jalaliMonthDays(year, month);

      var prevMonth = month - 1;
      var prevYear = year;
      if (prevMonth < 1) { prevMonth = 12; prevYear--; }
      var prevDays = jalaliMonthDays(prevYear, prevMonth);

      var cells = [];

      // سلول‌های خالی قبل از روز اول
      for (var i = 0; i < weekday; i++) {
        cells.push({ empty: true });
      }

      // روزهای ماه
      for (var d = 1; d <= monthDays; d++) {
        cells.push({ jy: year, jm: month, jd: d });
      }

      // پر کردن تا مضرب 7
      while (cells.length % 7 !== 0) cells.push({ empty: true });

      var html = '<div class="shamsi-cal-header">' +
        '<button type="button" class="shamsi-cal-nav shamsi-cal-prev" aria-label="ماه قبل">›</button>' +
        '<div class="shamsi-cal-title">' +
          persianMonthNames[month - 1] + ' ' + toFa(year) +
        '</div>' +
        '<button type="button" class="shamsi-cal-nav shamsi-cal-next" aria-label="ماه بعد">‹</button>' +
      '</div>';

      html += '<div class="shamsi-cal-weekdays">';
      for (var w = 0; w < persianWeekDays.length; w++) {
        html += '<span>' + persianWeekDays[w] + '</span>';
      }
      html += '</div>';

      var tj = todayJalali();
      html += '<div class="shamsi-cal-days">';
      for (var c = 0; c < cells.length; c++) {
        var cell = cells[c];
        if (cell.empty) {
          html += '<button type="button" class="shamsi-cal-day is-empty" tabindex="-1" disabled></button>';
        } else {
          var cls = 'shamsi-cal-day';
          // محدودیت min
          if (opts.min) {
            var minJ = dateToJalali(ymdToDate(opts.min));
            if (cell.jy < minJ.jy ||
                (cell.jy === minJ.jy && cell.jm < minJ.jm) ||
                (cell.jy === minJ.jy && cell.jm === minJ.jm && cell.jd < minJ.jd)) {
              cls += ' is-disabled';
            }
          }
          // محدودیت max
          if (opts.max) {
            var maxJ = dateToJalali(ymdToDate(opts.max));
            if (cell.jy > maxJ.jy ||
                (cell.jy === maxJ.jy && cell.jm > maxJ.jm) ||
                (cell.jy === maxJ.jy && cell.jm === maxJ.jm && cell.jd > maxJ.jd)) {
              cls += ' is-disabled';
            }
          }
          // امروز
          if (cell.jy === tj.jy && cell.jm === tj.jm && cell.jd === tj.jd) {
            cls += ' is-today';
          }
          // انتخاب‌شده
          if (opts.selectedYMD) {
            var sj = dateToJalali(ymdToDate(opts.selectedYMD));
            if (cell.jy === sj.jy && cell.jm === sj.jm && cell.jd === sj.jd) {
              cls += ' is-selected';
            }
          }
          // range
          if (opts.rangeStartYMD) {
            var rsj = dateToJalali(ymdToDate(opts.rangeStartYMD));
            if (cell.jy === rsj.jy && cell.jm === rsj.jm && cell.jd === rsj.jd) {
              cls += ' is-range-start is-selected';
            }
          }
          if (opts.rangeEndYMD) {
            var rej = dateToJalali(ymdToDate(opts.rangeEndYMD));
            if (cell.jy === rej.jy && cell.jm === rej.jm && cell.jd === rej.jd) {
              cls += ' is-range-end is-selected';
            }
          }
          if (opts.rangeStartYMD && opts.rangeEndYMD) {
            var cymd = jalaliToYMD(cell.jy, cell.jm, cell.jd);
            if (cymd > opts.rangeStartYMD && cymd < opts.rangeEndYMD) {
              cls += ' is-in-range';
            }
          }
          html += '<button type="button" class="' + cls + '" data-y="' + cell.jy + '" data-m="' + cell.jm + '" data-d="' + cell.jd + '">' + toFa(cell.jd) + '</button>';
        }
      }
      html += '</div>';

      html += '<div class="shamsi-cal-footer">' +
        '<span>امروز: ' + toFa(tj.jd) + ' ' + persianMonthNames[tj.jm - 1] + '</span>' +
        '<button type="button" class="shamsi-cal-today-btn">امروز</button>' +
      '</div>';

      return html;
    }

    function createPopup() {
      var pop = document.createElement('div');
      pop.className = 'shamsi-cal';
      pop.setAttribute('role', 'dialog');
      pop.setAttribute('aria-label', 'تقویم شمسی');
      document.body.appendChild(pop);
      return pop;
    }

    function close() {
      if (openInstance && openInstance.popup) {
        document.body.removeChild(openInstance.popup);
        openInstance = null;
      }
      document.removeEventListener('click', onDocClick, true);
      document.removeEventListener('keydown', onKey);
    }

    function onDocClick(e) {
      if (!openInstance) return;
      if (openInstance.popup.contains(e.target)) return;
      // trigger/input مجاز است
      if (openInstance.trigger && openInstance.trigger.contains(e.target)) return;
      if (openInstance.input && openInstance.input.contains(e.target)) return;
      if (openInstance.secondInput && openInstance.secondInput.contains(e.target)) return;
      close();
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
    }

    function open(ctx) {
      if (openInstance) close();
      openInstance = ctx;
      var pop = createPopup();
      ctx.popup = pop;
      render(ctx);
      // موقعیت‌دهی
      positionPop(pop, ctx.input);

      // event‌های داخل popup
      pop.querySelector('.shamsi-cal-prev').addEventListener('click', function () {
        ctx.viewMonth--;
        if (ctx.viewMonth < 1) { ctx.viewMonth = 12; ctx.viewYear--; }
        render(ctx);
      });
      pop.querySelector('.shamsi-cal-next').addEventListener('click', function () {
        ctx.viewMonth++;
        if (ctx.viewMonth > 12) { ctx.viewMonth = 1; ctx.viewYear++; }
        render(ctx);
      });
      pop.querySelector('.shamsi-cal-today-btn').addEventListener('click', function () {
        var t = todayJalali();
        ctx.viewYear = t.jy;
        ctx.viewMonth = t.jm;
        render(ctx);
        selectDay(ctx, t.jy, t.jm, t.jd);
      });

      pop.addEventListener('click', function (e) {
        var btn = e.target.closest('.shamsi-cal-day');
        if (!btn || btn.disabled || btn.classList.contains('is-empty') || btn.classList.contains('is-disabled')) return;
        var y = +btn.dataset.y;
        var m = +btn.dataset.m;
        var d = +btn.dataset.d;
        selectDay(ctx, y, m, d);
      });

      // بستن با کلیک بیرون
      setTimeout(function () {
        document.addEventListener('click', onDocClick, true);
      }, 0);
      document.addEventListener('keydown', onKey);
    }

    function render(ctx) {
      var opts = {
        min: ctx.min,
        max: ctx.max,
        selectedYMD: ctx.selectedYMD,
        rangeStartYMD: ctx.rangeStartYMD,
        rangeEndYMD: ctx.rangeEndYMD
      };
      ctx.popup.innerHTML = buildCalendar(ctx.viewYear, ctx.viewMonth, opts);
    }

    function selectDay(ctx, y, m, d) {
      var ymd = jalaliToYMD(y, m, d);
      var longText = toFa(d) + ' ' + persianMonthNames[m - 1] + ' ' + toFa(y);

      if (ctx.mode === 'range') {
        if (ctx.rangeStep === 1) {
          // شروع بازه جدید
          ctx.rangeStartYMD = ymd;
          ctx.rangeEndYMD = null;
          if (ctx.firstInput) ctx.firstInput.value = longText;
          if (ctx.secondInput) ctx.secondInput.value = '';
          ctx.rangeStep = 2;
          ctx.viewMonth = m;
          ctx.viewYear = y;
          render(ctx);
        } else {
          // پایان بازه
          if (ymd < ctx.rangeStartYMD) {
            // کاربر تاریخ قبل از شروع زد، جا‌به‌جا می‌کنیم
            ctx.rangeEndYMD = ctx.rangeStartYMD;
            ctx.rangeStartYMD = ymd;
            if (ctx.firstInput) ctx.firstInput.value = longText;
            if (ctx.secondInput) ctx.secondInput.value = toShamsiLong(ctx.rangeEndYMD);
          } else {
            ctx.rangeEndYMD = ymd;
            if (ctx.secondInput) ctx.secondInput.value = toShamsiLong(ctx.rangeEndYMD);
          }
          ctx.rangeStep = 1;
          if (ctx.onChange) ctx.onChange(ctx.rangeStartYMD, ctx.rangeEndYMD);
          close();
        }
      } else {
        // single
        ctx.selectedYMD = ymd;
        if (ctx.input.tagName === 'INPUT') {
          ctx.input.value = longText;
        }
        if (ctx.onChange) ctx.onChange(ymd);
        close();
      }
    }

    function positionPop(pop, anchor) {
      pop.style.visibility = 'hidden';
      pop.style.display = 'block';
      var rect = anchor.getBoundingClientRect();
      var popRect = pop.getBoundingClientRect();
      var top = rect.bottom + window.scrollY + 6;
      var left = rect.left + window.scrollX;

      // اگر از پایین صفحه بیرون می‌زند، بالای anchor بگذار
      if (rect.bottom + popRect.height + 12 > window.innerHeight) {
        top = rect.top + window.scrollY - popRect.height - 6;
      }
      // اگر از چپ/راست بیرون می‌زند
      if (left + popRect.width > window.scrollX + window.innerWidth) {
        left = window.scrollX + window.innerWidth - popRect.width - 8;
      }
      if (left < window.scrollX + 8) left = window.scrollX + 8;

      pop.style.top = top + 'px';
      pop.style.left = left + 'px';
      pop.style.visibility = 'visible';
    }

    // API عمومی
    return {
      attach: function (input, options) {
        // input می‌تواند یک wrapper (shamsi-field) یا خود input باشد
        options = options || {};
        var wrapper = input.closest('.shamsi-field') || input.parentElement;
        var realInput = input.tagName === 'INPUT' ? input : wrapper.querySelector('input');
        var trigger = wrapper.querySelector('.shamsi-trigger');

        // اگر input مخفی داریم برای YMD (مثل data-ymd)، پیدا کن
        var ymdInput = wrapper.querySelector('input[type=hidden]') || (realInput.dataset.ymdInput ? document.getElementById(realInput.dataset.ymdInput) : null);

        // مقدار اولیه
        var initYMD = null;
        if (realInput.value) {
          // اگر به فرمت YYYY-MM-DD بود
          if (/^\d{4}-\d{2}-\d{2}$/.test(realInput.value)) {
            initYMD = realInput.value;
            realInput.value = toShamsiLong(initYMD);
          } else if (ymdInput && ymdInput.value) {
            initYMD = ymdInput.value;
            realInput.value = toShamsiLong(initYMD);
          }
        } else if (ymdInput && ymdInput.value) {
          initYMD = ymdInput.value;
          realInput.value = toShamsiLong(initYMD);
        }

        var v = initYMD ? dateToJalali(ymdToDate(initYMD)) : todayJalali();

        function openThis() {
          open({
            input: wrapper,
            trigger: trigger,
            mode: 'single',
            selectedYMD: initYMD,
            viewYear: v.jy,
            viewMonth: v.jm,
            min: options.min,
            max: options.max,
            onChange: function (ymd) {
              initYMD = ymd;
              if (ymdInput) ymdInput.value = ymd;
              if (options.onChange) options.onChange(ymd);
            }
          });
        }

        wrapper.addEventListener('click', function (e) {
          if (e.target.tagName === 'INPUT') return;
          openThis();
        });
        realInput.addEventListener('focus', openThis);
        realInput.addEventListener('click', openThis);
        realInput.setAttribute('readonly', 'readonly');
      },

      attachRange: function (firstInput, secondInput, options) {
        options = options || {};
        var w1 = firstInput.closest('.shamsi-field') || firstInput.parentElement;
        var w2 = secondInput.closest('.shamsi-field') || secondInput.parentElement;
        var t1 = w1.querySelector('.shamsi-trigger');
        var t2 = w2.querySelector('.shamsi-trigger');
        var ymd1 = w1.querySelector('input[type=hidden]');
        var ymd2 = w2.querySelector('input[type=hidden]');

        var initStart = ymd1 ? ymd1.value : (firstInput.value && /^\d{4}-\d{2}-\d{2}$/.test(firstInput.value) ? firstInput.value : null);
        var initEnd = ymd2 ? ymd2.value : (secondInput.value && /^\d{4}-\d{2}-\d{2}$/.test(secondInput.value) ? secondInput.value : null);

        if (initStart) firstInput.value = toShamsiLong(initStart);
        if (initEnd) secondInput.value = toShamsiLong(initEnd);

        var v = initStart ? dateToJalali(ymdToDate(initStart)) : todayJalali();

        function openThis(step) {
          open({
            input: w1,
            firstInput: firstInput,    // ✅ fix: قبلاً اصلاً ست نمی‌شد
            secondInput: secondInput,
            trigger: step === 1 ? t1 : t2,
            mode: 'range',
            rangeStartYMD: initStart,
            rangeEndYMD: initEnd,
            rangeStep: step,
            viewYear: v.jy,
            viewMonth: v.jm,
            min: options.minIn,
            max: options.maxIn,
            onChange: function (s, e) {
              initStart = s;
              initEnd = e;
              if (ymd1) ymd1.value = s;
              if (ymd2) ymd2.value = e;
              v = dateToJalali(ymdToDate(s));
              if (options.onChange) options.onChange(s, e);
            }
          });
        }

        w1.addEventListener('click', function (e) {
          if (e.target.tagName === 'INPUT') return;
          openThis(1);
        });
        firstInput.addEventListener('focus', function () { openThis(1); });
        firstInput.addEventListener('click', function () { openThis(1); });

        w2.addEventListener('click', function (e) {
          if (e.target.tagName === 'INPUT') return;
          openThis(2);
        });
        secondInput.addEventListener('focus', function () { openThis(2); });
        secondInput.addEventListener('click', function () { openThis(2); });

        firstInput.setAttribute('readonly', 'readonly');
        secondInput.setAttribute('readonly', 'readonly');
      }
    };
  })();

  // ===========================================================
  // 5) NAVBAR (منوی موبایل drawer)
  // ===========================================================
  function initNavbar() {
    var menuBtn = document.getElementById('menuBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    if (!menuBtn || !mobileMenu) return;

    // بک‌دراپ اضافه کن (اگر نبود)
    var backdrop = document.querySelector('.mobile-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-backdrop';
      document.body.appendChild(backdrop);
    }

    function open() {
      mobileMenu.classList.add('is-open');
      menuBtn.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      mobileMenu.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function toggle() {
      if (mobileMenu.classList.contains('is-open')) close();
      else open();
    }

    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });
    backdrop.addEventListener('click', close);

    // بستن با کلیک روی لینک‌های منو
    var links = mobileMenu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', close);
    }

    // بستن با کلید ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) close();
    });

    // بستن اتوماتیک وقتی عرض از 769 بیشتر شد
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && mobileMenu.classList.contains('is-open')) {
        close();
      }
    });
  }

  // ===========================================================
  // 6) GALLERY (گالری عکس اتاق)
  // ===========================================================
  function initGallery(room) {
    var mainImg = document.getElementById('mainImage');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var dotsEl = document.getElementById('galleryDots');
    var thumbsEl = document.getElementById('thumbs');
    var idx = 0;

    function go(i) {
      idx = (i + room.images.length) % room.images.length;
      mainImg.style.opacity = '0';
      setTimeout(function () {
        mainImg.src = room.images[idx];
        mainImg.style.opacity = '1';
      }, 180);
      // به‌روزرسانی نقاط
      var dots = dotsEl.children;
      for (var d = 0; d < dots.length; d++) {
        dots[d].className = 'gallery-dot' + (d === idx ? ' active' : '');
      }
      // به‌روزرسانی تامبنیل
      var thumbs = thumbsEl.children;
      for (var t = 0; t < thumbs.length; t++) {
        thumbs[t].style.borderColor = (t === idx) ? '#0891b2' : '#e2d9c8';
      }
    }

    mainImg.src = room.images[0];

    // ساخت نقاط
    var dotsHtml = '';
    for (var i = 0; i < room.images.length; i++) {
      dotsHtml += '<button class="gallery-dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '"></button>';
    }
    dotsEl.innerHTML = dotsHtml;

    // ساخت تامبنیل
    var thumbsHtml = '';
    for (var j = 0; j < room.images.length; j++) {
      thumbsHtml += '<img src="' + room.images[j] + '" data-i="' + j + '" ' +
        'style="width:80px;height:55px;object-fit:cover;border-radius:8px;cursor:pointer;border:2px solid ' +
        (j === 0 ? '#0891b2' : '#e2d9c8') + ';transition:border 0.2s;" />';
    }
    thumbsEl.innerHTML = thumbsHtml;

    prevBtn.addEventListener('click', function () { go(idx - 1); });
    nextBtn.addEventListener('click', function () { go(idx + 1); });
    dotsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.gallery-dot');
      if (b) go(+b.dataset.i);
    });
    thumbsEl.addEventListener('click', function (e) {
      var b = e.target.closest('img');
      if (b) go(+b.dataset.i);
    });
  }

  // ===========================================================
  // 7) HOME (صفحه اصلی)
  // ===========================================================
  function initHome() {
    var container = document.getElementById('popularRooms');
    if (!container) return;
    var html = '';
    var count = 0;
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].popular === true && count < 4) {
        html += buildRoomCard(rooms[i]);
        count++;
      }
    }
    container.innerHTML = html;
  }

  // ===========================================================
  // 8) ROOMS (صفحه لیست اتاق‌ها)
  // ===========================================================
  function initRoomsPage() {
    var grid = document.getElementById('roomsGrid');
    if (!grid) return;

    var searchInput = document.getElementById('searchInput');
    var typeFilter = document.getElementById('typeFilter');
    var priceFilter = document.getElementById('priceFilter');
    var capacityFilter = document.getElementById('capacityFilter');
    var resetBtn = document.getElementById('resetBtn');
    var empty = document.getElementById('emptyState');
    var countEl = document.getElementById('resultCount');

    function applyFilters() {
      var searchText = searchInput.value.toLowerCase();
      var selectedType = typeFilter.value;
      var maxPrice = Number(priceFilter.value);
      var minCapacity = Number(capacityFilter.value);
      var filtered = [];
      for (var i = 0; i < rooms.length; i++) {
        var r = rooms[i];
        var matchSearch = r.name.toLowerCase().indexOf(searchText) !== -1;
        var matchType = selectedType === 'all' || r.type === selectedType;
        var matchPrice = r.price <= maxPrice;
        var matchCapacity = minCapacity === 0 || r.capacity >= minCapacity;
        if (matchSearch && matchType && matchPrice && matchCapacity) filtered.push(r);
      }
      render(filtered);
    }

    function render(list) {
      if (list.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'block';
        countEl.textContent = '';
        return;
      }
      empty.style.display = 'none';
      countEl.textContent = list.length + ' اتاق یافت شد';
      var html = '';
      for (var i = 0; i < list.length; i++) html += buildRoomCardFull(list[i]);
      grid.innerHTML = html;
    }

    function reset() {
      searchInput.value = '';
      typeFilter.value = 'all';
      priceFilter.value = '99999999';
      capacityFilter.value = '0';
      render(rooms);
    }

    searchInput.addEventListener('input', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    capacityFilter.addEventListener('change', applyFilters);
    resetBtn.addEventListener('click', reset);

    render(rooms);

    // expose برای دکمه داخل empty state
    window.resetFilters = reset;
  }

  // ===========================================================
  // 9) ROOM-DETAIL (صفحه جزئیات)
  // ===========================================================
  function initRoomDetail() {
    var roomContent = document.getElementById('roomContent');
    var errorMsg = document.getElementById('errorMsg');
    if (!roomContent) return;

    var urlParams = new URLSearchParams(window.location.search);
    var roomId = urlParams.get('id');
    if (!roomId) { showError(); return; }

    var room = getRoomById(roomId);
    if (!room) { showError(); return; }

    showRoom(room);
    initBookingForm(room);

    function showError() {
      errorMsg.style.display = 'block';
      roomContent.style.display = 'none';
    }

    function showRoom(r) {
      roomContent.style.display = 'block';
      document.getElementById('breadcrumbName').textContent = r.name;
      document.title = r.name + ' — هتل اصفهان';
      document.getElementById('roomName').textContent = r.name;
      document.getElementById('roomDesc').textContent = r.description;
      document.getElementById('roomTypeBadge').textContent = roomTypeNames[r.type];
      document.getElementById('roomCapacity').textContent = '👤 تا ' + r.capacity + ' نفر';
      document.getElementById('roomSize').textContent = '📐 ' + r.size + ' متر مربع';
      document.getElementById('formPrice').textContent = formatPrice(r.price);

      var amenHtml = '';
      for (var i = 0; i < r.amenities.length; i++) {
        amenHtml += '<span class="amenity-tag">✓ ' + r.amenities[i] + '</span>';
      }
      document.getElementById('amenitiesList').innerHTML = amenHtml;

      initGallery(r);
    }

    function initBookingForm(r) {
      var checkInField = document.getElementById('checkInField');
      var checkOutField = document.getElementById('checkOutField');
      var checkInYMD = document.getElementById('checkInYMD');
      var checkOutYMD = document.getElementById('checkOutYMD');
      var guests = document.getElementById('guests');
      var guestName = document.getElementById('guestName');
      var guestPhone = document.getElementById('guestPhone');
      var bookBtn = document.getElementById('bookBtn');

      // مقادیر اولیه
      var today = getTodayString();
      var tomorrow = getTomorrowString();
      checkInYMD.value = today;
      checkOutYMD.value = tomorrow;
      checkInField.value = toShamsiLong(today);
      checkOutField.value = toShamsiLong(tomorrow);

      // تقویم شمسی روی دو فیلد
      ShamsiCalendar.attachRange(checkInField, checkOutField, {
        minIn: today,
        onChange: function (s, e) {
          updatePrice();
          checkInYMD.value = s;
          checkOutYMD.value = e;
        }
      });

      updatePrice();
      guests.addEventListener('change', updatePrice);

      bookBtn.addEventListener('click', function () { submitBooking(r); });

      function updatePrice() {
        var ci = checkInYMD.value;
        var co = checkOutYMD.value;
        var sum = document.getElementById('priceSummary');
        if (ci && co && ci < co) {
          var nights = calculateNights(ci, co);
          var baseTotal = nights * r.price;
          var tax = Math.round(baseTotal * 0.1);
          var total = baseTotal + tax;
          document.getElementById('nightsLabel').textContent = nights + ' شب × ' + formatPrice(r.price);
          document.getElementById('basePrice').textContent = formatPrice(baseTotal);
          document.getElementById('taxPrice').textContent = formatPrice(tax);
          document.getElementById('totalPrice').textContent = formatPrice(total);
          sum.style.display = 'block';
        } else {
          sum.style.display = 'none';
        }
      }

      function submitBooking(room) {
        var errorEl = document.getElementById('formError');
        errorEl.style.display = 'none';
        var ci = checkInYMD.value;
        var co = checkOutYMD.value;
        var g = guests.value;
        var name = guestName.value.trim();
        var phone = guestPhone.value.trim();

        if (!ci) return showFormError('لطفاً تاریخ ورود را انتخاب کنید');
        if (!co) return showFormError('لطفاً تاریخ خروج را انتخاب کنید');
        if (ci >= co) return showFormError('تاریخ خروج باید بعد از تاریخ ورود باشد');
        if (!name) return showFormError('لطفاً نام و نام‌خانوادگی خود را وارد کنید');
        if (!phone) return showFormError('لطفاً شماره تماس خود را وارد کنید');

        var nights = calculateNights(ci, co);
        var baseTotal = nights * room.price;
        var tax = Math.round(baseTotal * 0.1);
        var total = baseTotal + tax;

        var booking = {
          roomId: room.id,
          roomName: room.name,
          roomType: room.type,
          roomImage: room.image,
          roomPrice: room.price,
          checkIn: ci,
          checkOut: co,
          nights: nights,
          guests: Number(g),
          guestName: name,
          guestPhone: phone,
          totalPrice: total,
          status: 'confirmed'
        };
        saveBooking(booking);
        showSuccessToast();
        setTimeout(function () { window.location.href = 'my-bookings.html'; }, 2000);
      }

      function showFormError(msg) {
        var el = document.getElementById('formError');
        el.textContent = '⚠️ ' + msg;
        el.style.display = 'block';
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      function showSuccessToast() {
        var t = document.getElementById('successToast');
        t.classList.add('show');
        setTimeout(function () { t.classList.remove('show'); }, 3000);
      }
    }
  }

  // ===========================================================
  // 10) MY-BOOKINGS (صفحه رزروهای من)
  // ===========================================================
  function initMyBookings() {
    var bookingsList = document.getElementById('bookingsList');
    if (!bookingsList) return;

    var cancelModal = document.getElementById('cancelModal');
    var confirmBtn = document.getElementById('confirmCancelBtn');
    var closeBtn = document.getElementById('closeCancelBtn');
    var backdrop = document.getElementById('modalBackdrop');
    var pendingId = null;

    function showModal(id) {
      pendingId = id;
      cancelModal.style.display = 'block';
    }
    function hideModal() {
      pendingId = null;
      cancelModal.style.display = 'none';
    }
    function doCancel(id) {
      hideModal();
      cancelBooking(id);
      render();
      var t = document.getElementById('successToast');
      t.classList.add('show');
      setTimeout(function () { t.classList.remove('show'); }, 3000);
    }
    confirmBtn.addEventListener('click', function () { if (pendingId !== null) doCancel(pendingId); });
    closeBtn.addEventListener('click', hideModal);
    backdrop.addEventListener('click', function (e) { if (e.target === this) hideModal(); });

    // expose برای دکمه‌های inline
    window.showModal = showModal;

    function render() {
      var bookings = getBookings();
      renderStats(bookings);
      if (bookings.length === 0) {
        document.getElementById('emptyState').style.display = 'block';
        bookingsList.innerHTML = '';
        return;
      }
      document.getElementById('emptyState').style.display = 'none';
      var list = bookings.slice().reverse();
      var html = '';
      for (var i = 0; i < list.length; i++) html += buildCard(list[i]);
      bookingsList.innerHTML = html;
    }

    function renderStats(list) {
      var total = list.length;
      var active = 0;
      var spent = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].status === 'confirmed') {
          active++;
          spent += Number(list[i].totalPrice);
        }
      }
      document.getElementById('statsRow').innerHTML =
        '<div style="background:white;border-radius:16px;padding:1.2rem;text-align:center;border:1px solid #e2d9c8;">' +
          '<div style="font-size:2rem;font-weight:700;color:#0891b2;">' + total + '</div>' +
          '<div style="font-size:0.85rem;color:#64748b;">کل رزروها</div>' +
        '</div>' +
        '<div style="background:white;border-radius:16px;padding:1.2rem;text-align:center;border:1px solid #e2d9c8;">' +
          '<div style="font-size:2rem;font-weight:700;color:#16a34a;">' + active + '</div>' +
          '<div style="font-size:0.85rem;color:#64748b;">رزرو فعال</div>' +
        '</div>' +
        '<div style="background:white;border-radius:16px;padding:1.2rem;text-align:center;border:1px solid #e2d9c8;">' +
          '<div style="font-size:1rem;font-weight:700;color:#d4a853;">' + formatPrice(spent) + '</div>' +
          '<div style="font-size:0.85rem;color:#64748b;">مجموع پرداختی</div>' +
        '</div>';
    }

    function buildCard(b) {
      var isActive = (b.status === 'confirmed');
      var statusBadge = isActive
        ? '<span class="booking-status status-confirmed">✅ تأیید شده</span>'
        : '<span class="booking-status status-cancelled">❌ لغو شده</span>';
      var cancelSection = isActive
        ? '<button class="btn-danger" onclick="showModal(\'' + b.id + '\')">لغو رزرو</button>'
        : '<span style="font-size:0.82rem;color:#94a3b8;">این رزرو لغو شده است</span>';
      var img = b.roomImage
        ? '<img src="' + b.roomImage + '" alt="" style="width:110px;height:80px;object-fit:cover;border-radius:10px;flex-shrink:0;" />'
        : '';
      return '<div class="booking-card" style="margin-bottom:1.2rem;">' +
        '<div style="display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap;">' +
          img +
          '<div style="flex:1;min-width:200px;">' +
            '<div style="display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap;margin-bottom:0.4rem;">' +
              '<strong style="font-size:1rem;color:#1e293b;">' + b.roomName + '</strong>' +
              statusBadge +
            '</div>' +
            '<div style="font-size:0.75rem;color:#94a3b8;margin-bottom:0.6rem;">کد رزرو: ' + b.id + '</div>' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:0.4rem;margin-bottom:0.6rem;font-size:0.84rem;">' +
              '<span style="color:#64748b;">📅 ورود: <strong>' + toJalaliText(b.checkIn) + '</strong></span>' +
              '<span style="color:#64748b;">📅 خروج: <strong>' + toJalaliText(b.checkOut) + '</strong></span>' +
              '<span style="color:#64748b;">🌙 شب: <strong>' + b.nights + '</strong></span>' +
              '<span style="color:#64748b;">👤 نفر: <strong>' + b.guests + '</strong></span>' +
            '</div>' +
            '<div style="font-size:0.84rem;color:#64748b;margin-bottom:0.8rem;">' +
              'مهمان: <strong>' + b.guestName + '</strong> | تماس: <strong>' + b.guestPhone + '</strong>' +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.6rem;">' +
              '<span style="font-size:1.05rem;font-weight:700;color:#0891b2;">' + formatPrice(b.totalPrice) + ' <span style="font-size:0.75rem;font-weight:400;color:#64748b;">(شامل مالیات)</span></span>' +
              cancelSection +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    render();
  }

  // ===========================================================
  // INIT
  // ===========================================================
  function init() {
    initNavbar();
    initHome();
    initRoomsPage();
    initRoomDetail();
    initMyBookings();
  }

  // expose برای HTML onclick
  window.showModal = null; // پر می‌شود در initMyBookings

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();