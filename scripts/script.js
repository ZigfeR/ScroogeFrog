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

  if ($(window).width() < 720) {
    // Обработчик для главного элемента меню
    $(".header-container__crosshair").on("click", function () {
      var $this = $(this);
      var $menu = $(".header-menu.menu-mobile");
      var $activeSubMenu = $(".header__sub-menu-container:visible");

      if ($this.hasClass("active")) {
        $this.removeClass("active").addClass("deactivating");
        $menu.slideUp(500); // Анимация сворачивания меню

        // Закрываем активное подменю, если оно открыто
        if ($activeSubMenu.length) {
          $activeSubMenu.slideUp(500).prev().removeClass("active"); // Скрываем подменю и удаляем класс active у ссылки
        }
      } else {
        $this.removeClass("deactivating").addClass("active");
        $menu.slideDown(500).css("display", "flex"); // Анимация разворачивания меню
      }
    });

    // Обработчик для ссылок внутри меню
    $(".header-menu.menu-mobile").on(
      "click",
      ".header__link.services.arrow",
      function (e) {
        e.preventDefault(); // Отменить действие по умолчанию для ссылки

        var $this = $(this);
        var $subMenu = $this.next(".header__sub-menu-container"); // Найти следующее подменю

        if ($this.hasClass("active")) {
          $this.removeClass("active");
          $subMenu.slideUp(500); // Анимация сворачивания подменю
        } else {
          $this.addClass("active");
          $subMenu.slideDown(500); // Анимация разворачивания подменю
        }
      }
    );
  }
});
