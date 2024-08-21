// $(document).ready(function () {
//   // При наведении курсора на ссылку с классом 'services arrow'
//   $("a.header__link.services.arrow").hover(
//     function () {
//       // Раскрываем подменю с анимацией slideDown
//       $(this)
//         .siblings("ul.header__sub-menu")
//         .stop(true, true)
//         .slideDown(300)
//         .css("display", "flex");
//     },
//     function () {
//       // Сворачиваем подменю с анимацией slideUp
//       $(this).siblings("ul.header__sub-menu").stop(true, true).slideUp(300);
//     }
//   );
// });
$(document).ready(function () {
  // Защита от копирования изображений
  $("img").on("contextmenu", function (e) {
    return false;
  });

  $("img").on("dragstart", function (e) {
    return false;
  });

  var timer;

  if ($(window).width() >= 720) {
    // Показываем подменю при наведении на ссылку Services
    $("a.header__link.services.arrow").on("mouseenter", function () {
      clearTimeout(timer); // Останавливаем таймер скрытия
      $(this).addClass("active"); // Добавляем класс "active"
      $(this)
        .siblings(".header__sub-menu-container")
        .stop(true, true)
        .slideDown(300)
        .css("display", "flex");
    });

    // Закрываем подменю при уходе курсора с родительского <li>
    $("li.header__list.services").on("mouseleave", function () {
      var $submenu = $(this).find(".header__sub-menu-container");
      var $link = $(this).find("a.header__link.services.arrow");
      timer = setTimeout(function () {
        $submenu.stop(true, true).slideUp(300, function () {
          $link.removeClass("active"); // Удаляем класс "active" после скрытия подменю
        });
      }, 300); // Задержка перед закрытием
    });

    // Оставляем подменю открытым при наведении на него
    $(".header__sub-menu-container").on("mouseenter", function () {
      clearTimeout(timer); // Останавливаем таймер скрытия
      $(this).stop(true, true).slideDown(300);
      $(this).siblings("a.header__link.services.arrow").addClass("active"); // Добавляем класс "active"
    });

    // Убираем класс "active" при уходе курсора с подменю
    $(".header__sub-menu-container").on("mouseleave", function () {
      var $submenu = $(this);
      var $link = $(this).siblings("a.header__link.services.arrow");
      timer = setTimeout(function () {
        $submenu.stop(true, true).slideUp(300, function () {
          $link.removeClass("active"); // Удаляем класс "active" после скрытия подменю
        });
      }, 300); // Задержка перед закрытием
    });
  }
});
