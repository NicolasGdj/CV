$(document).ready(function () {
  $("#profile").transition("slide up");

  $(".main.menu").visibility({
    type: "fixed",
  });
  $(".overlay").visibility({
    type: "fixed",
    offset: 80,
  });

  $(".formation.data, .experiences.data").visibility({
    onTopVisible: function (calculations) {
      $(this).transition({
        animation: "fade down in",
        duration: 800,
        interval: 200,
      });
    },
  });

  $("#projet .card").visibility({
    onTopVisible: function (calculations) {
      $(this).transition({
        animation: "zoom in",
        duration: 800,
        interval: 200,
      });
    },
  });

  $(".cards .image").dimmer({
    on: "hover",
  });

  $(".image").visibility({
    type: "image",
    transition: "vertical flip in",
    duration: 500,
  });

  $(".scrolldown").transition("set looping").transition("bounce", "2000ms");
  $("#wordCloud").jQWCloud({
    words: [
      { word: "Rigoureux", weight: 120, color: "#2185d0" },
      { word: "Passionné", weight: 60 },
      { word: "Autodidacte", weight: 50 },
      { word: "Dynamique", weight: 70 },
      { word: "Motivé" },
      { word: "Ponctuel" },
      { word: "Sociable" },
      { word: "Coopératif" },
      { word: "Rigoureux" },
      { word: "Passionné" },
      { word: "Autodidacte" },
      { word: "Dynamique" },
      { word: "Motivé" },
      { word: "Ponctuel" },
      { word: "Sociable" },
      { word: "Coopératif" },
      { word: "Rigoureux" },
      { word: "Passionné" },
      { word: "Autodidacte" },
      { word: "Dynamique", weight: 70 / 4 },
      { word: "Motivé", weight: 40 / 4 },
      { word: "Ponctuel", weight: 30 / 4 },
      { word: "Sociable", weight: 45 / 4 },
      { word: "Coopératif", weight: 30 / 4 },
      { word: "Ponctuel", weight: 30 / 8 },
      { word: "Sociable", weight: 45 / 8 },
      { word: "Coopératif", weight: 30 / 8 },
      { word: "Rigoureux", weight: 120 / 8 },
      { word: "Passionné", weight: 60 / 8 },
      { word: "Autodidacte", weight: 50 / 8 },
      { word: "Dynamique", weight: 70 / 8 },
      { word: "Motivé", weight: 40 / 8 },
      { word: "Ponctuel", weight: 30 / 8 },
      { word: "Sociable", weight: 45 / 8 },
      { word: "Coopératif", weight: 30 / 8 },
    ],

    // title
    title: "Points forts",

    // min/max font size
    minFont: 13,
    maxFont: 70,

    // font offset
    fontOffset: 0.75,

    // shows the algorithm of creating the word cloud
    showSpaceDIV: false,

    // Enables the vertical alignment of words
    verticalEnabled: true,

    // color
    cloud_color: null,

    // font family
    cloud_font_family: null,

    // color of covering divs
    spaceDIVColor: "blue",

    // left padding of words
    padding_left: "2",

    // classes with space to be applied on each word
    word_common_classes: null,
  });
  $("a[href*='#']:not([href='#'])").click(function () {
    if (
      location.hostname == this.hostname &&
      this.pathname.replace(/^\//, "") == location.pathname.replace(/^\//, "")
    ) {
      var anchor = $(this.hash);
      anchor = anchor.length ? anchor : $("[name=" + this.hash.slice(1) + "]");
      if (anchor.length) {
        $("html, body").animate({ scrollTop: anchor.offset().top }, 1500);
      }
    }
  });

  let topMenu = $("#main-menu"),
    topMenuHeight = topMenu.outerHeight() + 15,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });

  $(window).scroll(function () {
    var fromTop = $(this).scrollTop() + topMenuHeight;

    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    menuItems.removeClass("active");
    menuItems.filter("[href='#" + id + "']").addClass("active");
  });

  function lookUpCompetences(names) {
    names = names.toLowerCase();

    let allCategories = [];
    for (let element of $("*[category]")) {
      allCategories.push(element);
    }
    let allCompetences = [];
    for (let element of $("*[competence]")) {
      allCompetences.push(element);
    }

    if (names === "") {
      allCategories.forEach((e) => $(e).show());
      allCompetences.forEach((e) => $(e).show());
      return;
    }

    let categoriesFound = [];
    let comptencesFound = [];
    for (const name of names.split(",").map((n) => n.replace(/ /g, ""))) {
      for (const element of $(
        "*[competence*='" +
          name +
          "'],*[relatedTo*='" +
          name.replace(/[ #+]/g, "-") +
          "'],*[alias*='" +
          name.replace(/[ #+]/g, "-") +
          "']"
      )) {
        if (!comptencesFound.includes(element)) {
          comptencesFound.push(element);
          const category = element.parentElement.parentElement.parentElement;
          if (!categoriesFound.includes(category)) {
            categoriesFound.push(category);
            $(category).show();
          }
          comptencesFound.push(element);
          $(element).show();
        }
      }
    }
    for (const category of allCategories) {
      if (!categoriesFound.includes(category)) {
        $(category).attr("style", "display:none !important");
      }
    }
    for (const competence of allCompetences) {
      if (!comptencesFound.includes(competence)) {
        $(competence).hide(700);
      }
    }
  }

  $(".competence:not([competence])").on("click", function () {
    $("#competences-lookup").val($(this).text());
    lookUpCompetences($(this).text());
    var anchor = $("#competences");
    anchor = anchor.length ? anchor : $("[name=" + this.hash.slice(1) + "]");
    if (anchor.length) {
      $("html, body").animate({ scrollTop: anchor.offset().top }, 1500);
    }
  });

  $("#competences-lookup").on("input", function () {
    lookUpCompetences($(this).val());
  });
});
