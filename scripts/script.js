$(document).ready(function () {
  // Защита от копирования изображений
  $("img").on("contextmenu", function (e) {
    return false;
  });

  $("img").on("dragstart", function (e) {
    return false;
  });

  var timer;

  function handleSubmenu() {
    if ($(window).width() >= 720) {
      // Удаляем все предыдущие обработчики событий, чтобы избежать дублирования
      $("a.header__link.services.arrow").off("mouseenter");
      $("li.header__list.services").off("mouseleave");
      $(".header__sub-menu-container").off("mouseenter mouseleave");

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
        }, 600); // Задержка перед закрытием
      });
    } else {
      // Убираем обработчики событий и стили, если ширина окна меньше 720px
      $("a.header__link.services.arrow")
        .off("mouseenter")
        .removeClass("active");
      $("li.header__list.services").off("mouseleave");
      $(".header__sub-menu-container")
        .off("mouseenter mouseleave")
        .removeAttr("style");
    }
  }

  function handleMobileMenu() {
    if ($(window).width() < 720) {
      // Удаляем все предыдущие обработчики событий, чтобы избежать дублирования
      $(".header-container__crosshair").off("click");
      $(".header-menu.menu-mobile").off(
        "click",
        ".header__link.services.arrow"
      );

      // Обработчик для главного элемента меню
      $(".header-container__crosshair").on("click", function () {
        var $this = $(this);
        var $menu = $(".header-menu.menu-mobile");
        var $activeSubMenu = $(".header__sub-menu-container:visible");

        if ($this.hasClass("active")) {
          $this.removeClass("active").addClass("deactivating");
          $menu.slideUp(500); // Анимация сворачивания меню
          $("body").removeClass("no-scroll");

          // Закрываем активное подменю, если оно открыто
          if ($activeSubMenu.length) {
            $activeSubMenu.slideUp(500).prev().removeClass("active"); // Скрываем подменю и удаляем класс active у ссылки
          }
        } else {
          $this.removeClass("deactivating").addClass("active");
          $menu.slideDown(500).css("display", "flex"); // Анимация разворачивания меню
          $("body").addClass("no-scroll");
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

      // Добавляем обработчик для кликов по элементам header__sub-link
      $(".header-menu.menu-mobile").on(
        "click",
        ".header__sub-link",
        function () {
          // Удаляем класс no-scroll с body
          $("body").removeClass("no-scroll");

          // Делаем меню активным и разворачиваем его
          $(".header-container__crosshair")
            .removeClass("active")
            .addClass("deactivating");
          $(".header__sub-menu-container").removeAttr("style");
          $(".header__link.services.arrow").removeClass("active");
          $(".header-menu.menu-mobile").slideUp(300).stop(true, true);
        }
      );
    } else {
      // Убираем обработчики и восстанавливаем стили, если ширина окна >= 720px
      $(".header-container__crosshair")
        .off("click")
        .removeClass("active deactivating");
      $(".header-menu.menu-mobile")
        .removeAttr("style")
        .off("click", ".header__link.services.arrow");
      $(".header__link.services.arrow").removeClass("active");
      $(".header__sub-menu-container").removeAttr("style");
    }
  }

  // Вызов функции при загрузке страницы
  handleMobileMenu();
  handleSubmenu();
  adjustBgFillHeight();

  function adjustBgFillHeight() {
    var windowWidth = $(window).width(); // Получаем ширину окна

    $(".services-tab__drop-btn").on("click", function () {
      if (windowWidth > 1024) {
        $(".services-drop").fadeIn().css("display", "flex");
        $(".services-tab__drop-btn").css("display", "none");
      } else if (windowWidth > 850) {
        $(".services-drop").slideDown().css("display", "flex");
        $(".services-tab__drop-btn").css("display", "none");
      } else if (windowWidth > 719) {
        $(".services-drop").fadeIn().css("display", "flex");
        $(".services-tab__drop-btn").css("display", "none");
      } else {
        $(".services-drop").slideDown().css("display", "flex");
        $(".services-tab__drop-btn").css("display", "none");
      }
    });
  }

  // Adjust height on page load
  adjustBgFillHeight();

  // Вызов функции при изменении размера окна
  $(window).on("resize", function () {
    handleMobileMenu();
    handleSubmenu();
    adjustBgFillHeight();
    teamBgFillHeight();
  });
});

window.addEventListener("DOMContentLoaded", function () {
  function handleHashChange() {
    const hash = window.location.hash; // Получаем хэш из URL
    if (hash) {
      const targetElement = $(hash); // Находим элемент с этим id

      if (targetElement.length) {
        // Сначала раскрываем скрытый блок
        $(".services-drop").fadeIn().css("display", "flex");
        // Показываем целевой элемент
        targetElement.css("display", "block");
        $(".services-tab__drop-btn").css("display", "none");

        // Принудительно скроллим к целевому элементу с небольшим тайм-аутом
        setTimeout(() => {
          $("html, body").animate(
            {
              scrollTop: targetElement.offset().top,
            },
            200
          );
        }, 100);
      }
      // if ($(window).width() < 720) {
      //   if (targetElement.length) {
      //     $(".services-drop").fadeIn().css("display", "flex");
      //     // $(".header-menu.menu-mobile").slideUp(500, function () {
      //     //   setTimeout(() => {
      //     //     $("html, body").animate(
      //     //       {
      //     //         scrollTop: targetElement.offset().top,
      //     //       },
      //     //       200
      //     //     );
      //     //   }, 100);
      //     // });
      //   }
      // } else {
      //   if (targetElement.length) {
      //     // Сначала раскрываем скрытый блок
      //     $(".services-drop").fadeIn().css("display", "flex");
      //     // Показываем целевой элемент
      //     targetElement.css("display", "block");
      //     $(".services-tab__drop-btn").css("display", "none");

      //     // Принудительно скроллим к целевому элементу с небольшим тайм-аутом
      //     setTimeout(() => {
      //       $("html, body").animate(
      //         {
      //           scrollTop: targetElement.offset().top,
      //         },
      //         200
      //       );
      //     }, 100);
      //   }
      // }
    }
  }

  // Вызовем функцию при загрузке страницы
  handleHashChange();

  // Отслеживаем изменения хэша
  window.addEventListener("hashchange", handleHashChange);
});

$(document).ready(function () {
  // Обработка события прокрутки
  $(window).on("scroll", function () {
    // Получение текущей позиции прокрутки
    var scrollPosition = $(this).scrollTop();
    // Получение элемента "назад к началу"
    var $backToTop = $("#back-to-top");
    // Вычисление 50% ширины экрана в пикселях
    var vw50 = $(window).width() / 2;

    // Добавление/удаление класса видимости для кнопки "назад к началу"
    if (scrollPosition > vw50) {
      $backToTop.addClass("visible");
      $("#back-to-top").css("bottom", "76px");
    } else {
      $backToTop.removeClass("visible");
    }
  });

  // Обработка клика по кнопке "назад к началу"
  $("#back-to-top").on("click", function (event) {
    // Предотвращение стандартного поведения
    event.preventDefault();
    // Плавная прокрутка к началу страницы
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });
});
