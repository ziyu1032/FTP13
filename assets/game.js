/* ============================================================
   Hainan Duty-Free Challenge - shared game logic
   Used by both desktop.html and mobile.html.
   The two versions differ only in CSS (assets/desktop.css / mobile.css).
   ============================================================ */
(function () {
  "use strict";

  var MODE = window.GAME_MODE || "desktop";

  /* ---------------- question bank ---------------- */

  var MCQ = [
    {q: "Q1. Why has the duty-free policy become an important driver of Hainan's economic development?",
     opts: ["Because it attracts more visitors and encourages local consumption.",
            "Because it raises more taxes from international tourists for the government.",
            "Because it pushes local residents to spend more money overseas.",
            "Because it reduces the number of tourists coming to Hainan every year."],
     a: 0,
     why: "One major impact of the policy is its ability to attract more visitors and encourage consumption in Hainan."},

    {q: "Q2. With a wider range of products and more convenient services, Hainan has strengthened its appeal as ______.",
     opts: ["a heavy industrial base for manufacturing export goods",
            "an international tourism and consumption destination",
            "a low-price factory outlet for local residents",
            "a center of traditional agriculture and fishing"],
     a: 1,
     why: "The text says Hainan has strengthened its appeal as an \"international tourism and consumption destination\"."},

    {q: "Q3. What does the policy help do to overseas consumption?",
     opts: ["It pushes more Chinese consumption toward overseas markets.",
            "It has little effect on where Chinese consumers spend their money.",
            "It brings some overseas consumption back to the domestic market.",
            "It bans Chinese travelers from spending money overseas."],
     a: 2,
     why: "The text says the policy \"helps bring some overseas consumption back to the domestic market\" - this is called consumption reflux (回流)."},

    {q: "Q4. As more visitors come to Hainan to travel and shop, ______.",
     opts: ["shopping gradually replaces tourism as the main industry",
            "tourism drives shopping, and shopping stimulates tourism",
            "tourism and shopping compete and slowly reduce each other",
            "neither tourism nor shopping grows in the long run"],
     a: 1,
     why: "\"Tourism can drive shopping, while shopping can in turn stimulate tourism\" - the two support each other."},

    {q: "Q5. Which sectors does the tourism-shopping interaction support?",
     opts: ["Only hotels, restaurants and local travel agencies.",
            "Tourism, hospitality, retail and consumer-related sectors.",
            "Heavy industry, mining, construction and long-distance transport.",
            "Farming, fishing, forestry and food processing."],
     a: 1,
     why: "The interaction between tourism and shopping supports the growth of tourism, hospitality, retail, and other consumer-related sectors."},

    {q: "Q6. Drone deliveries of duty-free goods encourage the development of ______.",
     opts: ["heavy industry, steel production and shipbuilding for overseas markets",
            "the low-altitude economy, smart logistics and cross-border e-commerce",
            "farming, fishing, forestry and traditional food processing",
            "banking, insurance, real estate and financial services"],
     a: 1,
     why: "New services like drone deliveries and streamlined customs procedures encourage the low-altitude economy, smart logistics, and cross-border e-commerce."},

    {q: "Q7. What do drone deliveries and related new services show about duty-free shopping?",
     opts: ["Its benefits reach beyond retail and support wider growth.",
            "Its benefits stay inside the retail sector and nowhere else.",
            "Its benefits mainly go to foreign companies and investors.",
            "Its benefits have little connection with other industries."],
     a: 0,
     why: "Duty-free shopping generates benefits that extend beyond the retail sector and contributes to broader industrial development."},

    {q: "Q8. Overall, the policy contributes to Hainan's development as ______.",
     opts: ["a heavy manufacturing base in southern China",
            "a free-trade zone for reselling duty-free goods to tourists",
            "an international tourism and consumption center",
            "a low-cost shopping market for local people"],
     a: 2,
     why: "By connecting tourism, consumption, and related industries, the policy helps Hainan become an international tourism and consumption center - in Chinese, 国际旅游消费中心."},

    {q: "Q9. Which sentence best summarizes the role of the duty-free policy?",
     opts: ["It links tourism, consumption and related industries to grow the FTP.",
            "It mainly makes luxury goods cheaper for rich international buyers.",
            "It will replace all traditional shopping with online shopping everywhere.",
            "It focuses only on attracting foreign tourists to visit the island."],
     a: 0,
     why: "By connecting tourism, consumption, and related industries, the policy supports the continued growth of the Hainan FTP."}
  ];

  var TF = [
    {s: "The annual duty-free shopping quota in Hainan is 100,000 yuan for each eligible traveler.", a: true,
     why: "The annual offshore duty-free shopping quota for each eligible traveler is 100,000 yuan."},
    {s: "The new pick-up methods made the duty-free shopping experience less convenient.", a: false,
     why: "They \"further enhanced convenience and optimized the overall shopping experience\" - shopping became easier, not harder."},
    {s: "Reselling duty-free goods is a legal way to make money in Hainan.", a: false,
     why: "Reselling duty-free goods is an illegal activity that Hainan cracks down on."},
    {s: "Using another traveler's duty-free shopping quota is allowed if they agree.", a: false,
     why: "Using other people's duty-free shopping quotas to make purchases is an illegal activity, no matter whether they agree or not."},
    {s: "Tax evasion in the duty-free market may lead to penalties.", a: true,
     why: "Hainan imposes penalties on tax evasion to stop people from abusing the policy."},
    {s: "Cracking down on illegal activities helps maintain a fair and orderly market environment.", a: true,
     why: "Regulation and crackdowns \"help prevent policy abuse and maintain a fair and orderly market environment\"."},
    {s: "Only the retail sector gains benefits from duty-free shopping.", a: false,
     why: "The benefits extend beyond retail - for example, the low-altitude economy, smart logistics, and cross-border e-commerce."},
    {s: "Streamlined customs procedures help encourage the development of related industries.", a: true,
     why: "The text lists streamlined customs procedures together with drone deliveries as new services that encourage related industries."}
  ];

  /* exact sentences from the course text, used in the feedback */
  var MCQ_QUOTES = [
    "One major impact of the policy is its ability to attract more visitors and encourage consumption in Hainan.",
    "With a wider range of duty-free products and more convenient shopping services, Hainan has strengthened its appeal as an international tourism and consumption destination.",
    "The policy also helps bring some overseas consumption back to the domestic market.",
    "As more visitors come to Hainan to travel and shop, tourism can drive shopping, while shopping can in turn stimulate tourism.",
    "This interaction supports the growth of tourism, hospitality, retail, and other consumer-related sectors.",
    "New services like drone deliveries of duty-free goods and streamlined customs procedures are encouraging the development of sectors such as the low-altitude economy, smart logistics, and cross-border e-commerce.",
    "In this way, duty-free shopping generates benefits that extend beyond the retail sector and contributes to broader industrial development.",
    "...it contributes to Hainan's development as an international tourism and consumption center...",
    "By connecting tourism, consumption, and related industries, it ... supports the continued growth of the Hainan FTP."
  ];
  var TF_QUOTES = [
    "The annual offshore duty-free shopping quota for each eligible traveler in Hainan is 100,000 yuan.",
    "New methods for picking up duty-free goods ... have further enhanced convenience and optimized the overall shopping experience.",
    "Hainan ... cracks down on illegal activities such as reselling duty-free goods...",
    "...and using other people's duty-free shopping quotas to make purchases...",
    "...and imposes penalties on tax evasion.",
    "These measures help prevent policy abuse and maintain a fair and orderly market environment.",
    "...duty-free shopping generates benefits that extend beyond the retail sector...",
    "New services like drone deliveries of duty-free goods and streamlined customs procedures are encouraging the development of sectors..."
  ];
  MCQ.forEach(function (m, i) { m.quote = MCQ_QUOTES[i]; });
  TF.forEach(function (t, i) { t.quote = TF_QUOTES[i]; });

  /* Level 1 = all multiple choice (benefits & impacts)
     Level 2 = all true/false (rules & regulation). No overlap. */
  var LEVELS = [
    {name: "Level 1", title: "Benefits & Impacts", emoji: "A", type: "mcq",
     list: [0, 1, 2, 3, 4, 5, 6, 7, 8]},
    {name: "Level 2", title: "Rules & Regulation", emoji: "B", type: "tf",
     list: [0, 1, 2, 3, 4, 5, 6, 7]}
  ];
  var GRAND_TOTAL = LEVELS.reduce(function (s, lv) { return s + lv.list.length; }, 0);

  /* ---------------- state ---------------- */

  var curLevel = 0, quizList = [], idx = 0, score = 0, answers = [], firstTry = true;
  var bestScores = {};
  try { bestScores = JSON.parse(localStorage.getItem("dfd_best") || "{}") || {}; } catch (e) { bestScores = {}; }

  function $(id) { return document.getElementById(id); }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Shuffle options of every MCQ; avoid the same correct letter twice in a row */
  function buildMCQ(items) {
    var letters = [];
    return items.map(function (item) {
      var correctText = item.opts[item.a];
      var opts, newA = -1, attempt = 0;
      do {
        opts = shuffle(item.opts);
        newA = opts.indexOf(correctText);
        attempt++;
      } while (letters.length && "ABCD".charAt(newA) === letters[letters.length - 1] && attempt < 8);
      letters.push("ABCD".charAt(newA));
      var copy = {};
      for (var k in item) { if (Object.prototype.hasOwnProperty.call(item, k)) { copy[k] = item[k]; } }
      copy.opts = opts;
      copy.a = newA;
      return copy;
    });
  }

  function buildLevel(n) {
    var lv = LEVELS[n];
    var items = lv.list.map(function (i) { return lv.type === "mcq" ? MCQ[i] : TF[i]; });
    return lv.type === "mcq" ? buildMCQ(items) : items;
  }

  /* ---------------- screens ---------------- */

  function showScreen(id) {
    ["screen-home", "screen-quiz", "screen-sum"].forEach(function (s) {
      $(s).classList.toggle("hidden", s !== id);
    });
    window.scrollTo(0, 0);
  }

  function revealCard(el) {
    if (!el) { return; }
    el.classList.remove("fade-in");
    void el.offsetWidth;
    el.classList.add("fade-in");
  }

  function showHome() {
    var wrap = $("level-list");
    wrap.innerHTML = "";
    LEVELS.forEach(function (lv, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lv-card lv-" + (i + 1);
      b.innerHTML =
        '<span class="lv-num">' + lv.emoji + '</span>' +
        '<span class="lv-info">' +
          '<span class="lv-name">' + lv.name + ' · ' + lv.title + '</span>' +
          '<span class="lv-desc">' + (lv.type === "mcq" ? "Multiple choice" : "True or false") + '</span>' +
        '</span>' +
        '<span class="lv-count">' + lv.list.length + ' questions</span>';
      b.onclick = function () { startLevel(i); };
      wrap.appendChild(b);
    });
    showScreen("screen-home");
    revealCard($("screen-home"));
  }

  /* ---------------- quiz ---------------- */

  function startLevel(n) {
    curLevel = n;
    idx = 0;
    score = 0;
    answers = [];
    quizList = buildLevel(n);
    var lv = LEVELS[n];
    $("lv-tag").textContent = lv.name + " · " + lv.title;
    $("total-now").textContent = quizList.length;
    showScreen("screen-quiz");
    renderQ();
  }

  function renderQ() {
    var item = quizList[idx];
    $("feedback-area").innerHTML = "";
    $("btn-next").classList.add("hidden");
    firstTry = true;
    $("progress-fill").style.width = (idx / quizList.length * 100) + "%";
    $("score-now").textContent = score;
    $("count-tag").textContent = "Q" + (idx + 1) + " / " + quizList.length;

    if (item.opts) {
      $("q-text").textContent = item.q;
      var area = $("opt-area");
      area.innerHTML = "";
      item.opts.forEach(function (t, k) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "opt";
        b.innerHTML = '<span class="letter">' + "ABCD".charAt(k) + '</span><span class="opt-text">' + t + '</span>';
        b.onclick = function () { answerMCQ(k, b); };
        area.appendChild(b);
      });
    } else {
      $("q-text").textContent = item.s;
      var area2 = $("opt-area");
      area2.innerHTML = "";
      var row = document.createElement("div");
      row.className = "tf-row";
      var bt = document.createElement("button");
      bt.type = "button"; bt.className = "tf-btn"; bt.textContent = "✔ TRUE";
      var bf = document.createElement("button");
      bf.type = "button"; bf.className = "tf-btn"; bf.textContent = "✘ FALSE";
      bt.onclick = function () { answerTF(true, bt, bf); };
      bf.onclick = function () { answerTF(false, bt, bf); };
      row.appendChild(bt); row.appendChild(bf); area2.appendChild(row);
    }
    scrollToQuestion();
  }

  function scrollToQuestion() {
    var top = $("quiz-top");
    if (!top) { return; }
    var y = top.getBoundingClientRect().top + window.pageYOffset - 8;
    if (window.pageYOffset > y) { window.scrollTo({ top: y, behavior: "smooth" }); }
  }

  function showTryAgain() {
    $("feedback-area").innerHTML =
      '<div class="feedback bad">' +
        '<b>❌ Not quite. Try again!</b> Wrong choices won\'t reveal the answer - ' +
        'read the question again, or tap <b>📖 Read the Text</b> to check the passage, then choose again. 💪' +
      '</div>';
    afterFeedback();
  }

  function showCorrect(item) {
    $("feedback-area").innerHTML =
      '<div class="feedback good">' +
        '<b>✅ Correct!' + (firstTry ? ' +1 point ⭐' : '') + '</b> ' + item.why +
        '<span class="quote">📖 From the text: ' + item.quote + '</span>' +
      '</div>';
    var next = $("btn-next");
    next.classList.remove("hidden");
    next.textContent = (idx === quizList.length - 1) ? "See Level Summary 🏁" : "Next ➜";
    afterFeedback();
  }

  function afterFeedback() {
    var fb = $("feedback-area").firstElementChild;
    if (!fb) { return; }
    setTimeout(function () {
      var r = fb.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 8) {
        fb.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }, 60);
  }

  function answerMCQ(k, btn) {
    var item = quizList[idx];
    if (k !== item.a) {
      firstTry = false;
      btn.disabled = true;
      btn.classList.add("wrong");
      showTryAgain();
      return;
    }
    Array.prototype.forEach.call($("opt-area").children, function (b) {
      b.disabled = true;
      if (!b.classList.contains("correct")) { b.classList.add("dim"); }
    });
    btn.classList.add("correct");
    if (firstTry) { score++; $("score-now").textContent = score; }
    answers.push({ text: item.q, ok: firstTry, correct: item.opts[item.a], why: item.why });
    showCorrect(item);
  }

  function answerTF(v, bt, bf) {
    var item = quizList[idx];
    if (v !== item.a) {
      firstTry = false;
      if (v) { bt.disabled = true; bt.classList.add("wrong"); }
      else { bf.disabled = true; bf.classList.add("wrong"); }
      showTryAgain();
      return;
    }
    bt.disabled = true; bf.disabled = true;
    (item.a ? bt : bf).classList.add("correct");
    (item.a ? bf : bt).classList.add("dim");
    if (firstTry) { score++; $("score-now").textContent = score; }
    answers.push({ text: item.s, ok: firstTry, correct: (item.a ? "TRUE" : "FALSE"), why: item.why });
    showCorrect(item);
  }

  function nextQ() {
    if (idx < quizList.length - 1) { idx++; renderQ(); }
    else { showSummary(); }
  }

  /* ---------------- summary ---------------- */

  function starsFor(s, total) {
    if (s >= total) { return 3; }
    if (s >= total - 2) { return 2; }
    if (s >= Math.ceil(total / 2)) { return 1; }
    return 0;
  }

  function showSummary() {
    var total = quizList.length;
    var prevBest = bestScores[curLevel];
    if (prevBest === undefined || score > prevBest) {
      bestScores[curLevel] = score;
      try { localStorage.setItem("dfd_best", JSON.stringify(bestScores)); } catch (e) {}
    }
    var isLast = curLevel === LEVELS.length - 1;
    var stars = starsFor(score, total);
    $("sum-emoji").textContent = score === total ? "🏆" : (stars >= 2 ? "🥇" : (stars === 1 ? "🥈" : "😅"));
    $("sum-title").textContent = LEVELS[curLevel].name + " · " + LEVELS[curLevel].title + " — Complete!";
    $("sum-sub").textContent = score === total
      ? "Perfect! You mastered every question in this level."
      : (score >= total - 2
        ? "Great job! Check the mistakes below to fill the gaps."
        : "Keep going — review the mistakes below, re-read the text, and try again!");
    $("sum-stars").textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
    var totalPts = 0;
    Object.keys(bestScores).forEach(function (k) { totalPts += bestScores[k]; });
    $("sum-total").textContent = "This level: " + score + " / " + total + "  ·  Total best: " + totalPts + " / " + GRAND_TOTAL;

    var wrong = answers.filter(function (a) { return !a.ok; }).length;
    $("review").innerHTML = "<h3>📋 Question review" +
      (wrong ? " — " + wrong + " missed on the first try" : " — all correct on the first try! 🎉") + "</h3>" +
      answers.map(function (a, i) {
        return '<div class="rev-item">' +
          (a.ok ? '<span class="rev-ok">✔ Q' + (i + 1) + '</span> ' : '<span class="rev-no">✘ Q' + (i + 1) + '</span> ') +
          a.text +
          '<br><span class="rev-ans">Correct answer: <b>' + a.correct + '</b></span>' +
          (a.ok ? "" : '<span class="rev-why">💡 Why: ' + a.why + '</span>') +
        '</div>';
      }).join("");

    $("btn-next-lv").classList.toggle("hidden", isLast);
    showScreen("screen-sum");
    revealCard($("screen-sum"));
  }

  /* ---------------- reading modal ---------------- */

  function openText() { $("read-modal").classList.remove("hidden"); document.body.classList.add("modal-open"); }
  function closeText() { $("read-modal").classList.add("hidden"); document.body.classList.remove("modal-open"); }

  /* ---------------- wiring ---------------- */

  function init() {
    $("btn-home-quiz").onclick = showHome;
    $("btn-home-sum").onclick = showHome;
    $("btn-read-home").onclick = openText;
    $("btn-read-quiz").onclick = openText;
    $("btn-read-sum").onclick = openText;
    $("btn-close-modal").onclick = closeText;
    $("read-modal").onclick = function (e) { if (e.target === $("read-modal")) { closeText(); } };
    $("btn-next").onclick = nextQ;
    $("btn-retry-lv").onclick = function () { startLevel(curLevel); };
    $("btn-to-levels").onclick = showHome;
    $("btn-next-lv").onclick = function () { startLevel(Math.min(curLevel + 1, LEVELS.length - 1)); };

    if (MODE === "desktop") {
      document.addEventListener("keydown", function (e) {
        if (!$("read-modal").classList.contains("hidden")) {
          if (e.key === "Escape") { closeText(); }
          return;
        }
        if ($("screen-quiz").classList.contains("hidden")) { return; }
        if (e.key === "Enter") {
          var n = $("btn-next");
          if (n && !n.classList.contains("hidden")) { e.preventDefault(); n.click(); }
          return;
        }
        var k = (e.key || "").toUpperCase();
        var opts = $("opt-area").querySelectorAll(".opt");
        if (opts.length && "ABCD".indexOf(k) >= 0) {
          var b = opts["ABCD".indexOf(k)];
          if (b && !b.disabled) { b.click(); }
          return;
        }
        var tf = $("opt-area").querySelectorAll(".tf-btn");
        if (tf.length) {
          if (k === "T" || k === "1") { if (!tf[0].disabled) { tf[0].click(); } }
          if (k === "F" || k === "2") { if (!tf[1].disabled) { tf[1].click(); } }
        }
      });
    }

    showHome();

    /* quick jump: desktop.html?level=1 or ?level=2 (handy in class) */
    var jump = /[?&]level=([12])/.exec(window.location.search);
    if (jump) { startLevel(parseInt(jump[1], 10) - 1); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
