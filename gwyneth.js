/* ══════════════════════════════════════════════════════════════
   GWYNETH DESIGNER INTERIORS
   gwyneth.js — Complete Site JavaScript

   Christchurch, New Zealand · gwynethdesignerinteriors.com

   Contents:
   01. Navigation — hamburger toggle, page routing
   02. Page System — showPage, showSvc
   03. Inspiration Tabs — showInsTab
   04. Global Search — toggleSearch, runSearch, navigateTo
   05. Inspiration Page Search — insSearch, insClearSearch
   06. Mobile Layout Rewriter — inline-style responsive handler
   07. DOM Ready Init
══════════════════════════════════════════════════════════════ */

'use strict';

/* ══ 01. NAVIGATION ══════════════════════════════════════════ */

function toggleNav() {
  const nav = document.querySelector('.nav-links');
  const btn = document.getElementById('hamburger');
  if (nav) nav.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
}

function closeNav() {
  const nav = document.querySelector('.nav-links');
  const btn = document.getElementById('hamburger');
  if (nav) nav.classList.remove('open');
  if (btn) btn.classList.remove('open');
}

/* ══ 02. PAGE SYSTEM ═════════════════════════════════════════ */

function showPage(page, svc) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });

  var target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  window.scrollTo(0, 0);
  closeNav();
  closeSearch();

  if (page === 'services' && svc) {
    showSvc(svc);
  }

  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.toggle('active', a.dataset.page === page);
  });

  // Re-run mobile layout after page switch
  if (typeof rewriteLayouts === 'function') {
    setTimeout(rewriteLayouts, 50);
  }
}

function showSvc(id) {
  document.querySelectorAll('.svc-page').forEach(function(p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('.svc-tab-btn').forEach(function(b) {
    b.classList.remove('active');
  });

  var page = document.getElementById('svc-' + id);
  var tab  = document.getElementById('tab-' + id);
  if (page) page.classList.add('active');
  if (tab)  tab.classList.add('active');
  window.scrollTo(0, 0);
}

/* ══ 03. INSPIRATION TABS ════════════════════════════════════ */

function showInsTab(id) {
  var chch = document.getElementById('ins-panel-chch');
  var gcan = document.getElementById('ins-panel-gcan');
  var tabChch = document.getElementById('ins-tab-chch');
  var tabGcan = document.getElementById('ins-tab-gcan');

  if (chch) chch.style.display = id === 'chch' ? 'block' : 'none';
  if (gcan) gcan.style.display = id === 'gcan' ? 'block' : 'none';

  if (tabChch) {
    tabChch.style.borderBottomColor = id === 'chch' ? 'var(--chino-deep)' : 'transparent';
    tabChch.style.color             = id === 'chch' ? 'var(--chino-deep)' : 'var(--muted)';
  }
  if (tabGcan) {
    tabGcan.style.borderBottomColor = id === 'gcan' ? 'var(--chino-deep)' : 'transparent';
    tabGcan.style.color             = id === 'gcan' ? 'var(--chino-deep)' : 'var(--muted)';
  }
  window.scrollTo(0, 0);
}

/* ══ 04. GLOBAL NAV SEARCH ═══════════════════════════════════ */

var SEARCH_INDEX = [
  { title: 'Services',                         section: 'Services',                       page: 'services',     svc: 'virtual',     keywords: 'services design consultation staging styling commercial homewares luxury' },
  { title: 'Virtual Consultations',             section: 'Services',                       page: 'services',     svc: 'virtual',     keywords: 'virtual consultation design colour palette furnishings online remote' },
  { title: 'Residential Property Staging',      section: 'Services',                       page: 'services',     svc: 'staging',     keywords: 'staging property sale buyers open home signature styling photography' },
  { title: 'Residential Property Styling',      section: 'Services',                       page: 'services',     svc: 'styling',     keywords: 'room edit elevated heritage home transformation renovation' },
  { title: 'Commercial Staging',                section: 'Services',                       page: 'services',     svc: 'commercial',  keywords: 'commercial restaurant retail hospitality staging distinguished destination' },
  { title: 'Homewares Sourcing',                section: 'Services',                       page: 'services',     svc: 'homewares',   keywords: 'homewares sourcing furniture decor lighting artwork curated designers edit' },
  { title: 'Luxury Enhancements',               section: 'Services',                       page: 'services',     svc: 'luxury',      keywords: 'luxury floral scent bedding seasonal coffee table artwork add-on' },
  { title: 'About Gwyneth',                     section: 'About',                          page: 'about',        svc: null,          keywords: 'gwyneth jacundino about designer heritage christchurch edwardian victorian' },
  { title: 'Philosophy & Process',              section: 'Philosophy',                     page: 'process',      svc: null,          keywords: 'philosophy process client journey discovery concept design installation handover' },
  { title: 'Inspiration',                       section: 'Inspiration',                    page: 'inspiration',  svc: null,          keywords: 'inspiration heritage sites christchurch canterbury arts centre mona vale tannery otahuna' },
  { title: 'The Arts Centre',                   section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'arts centre te matatiki toi ora gothic revival 1877 mountfort rutherford great hall worcester' },
  { title: 'Mona Vale',                         section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'mona vale homestead fendalton edwardian old english revival leadlight gardens arts crafts' },
  { title: 'The Tannery',                       section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'tannery woolston victorian industrial 1882 brick adaptive reuse ironwork timber' },
  { title: 'New Regent Street',                 section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'new regent street spanish mission 1932 pastel facades cecilwood wrought iron balconettes' },
  { title: 'Drifter',                           section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'drifter wellington woollen mill gummer 1919 nelson marble hotel lichfield industrial' },
  { title: 'C1 Espresso',                       section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'c1 espresso high street post office 1878 rimu floors pneumatic tubes recycled panelling' },
  { title: 'OGB — Old Government Building',     section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'ogb old government building bar dining dark timber brass victorian civic' },
  { title: 'Knox Church',                       section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'knox church gothic revival timber diagrid architectus heritage rebuild 2017' },
  { title: 'Canterbury Museum',                 section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'canterbury museum gothic revival mountfort halswell basalt rolleston avenue carved capitals' },
  { title: "Christ's College",                  section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: "christs college gothic quadrangle john piper chapel collegiate rolleston avenue" },
  { title: 'Isaac Theatre Royal',               section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'isaac theatre royal edwardian baroque gilded plasterwork crimson gold gloucester street' },
  { title: 'Cathedral of the Blessed Sacrament',section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'cathedral blessed sacrament baroque renaissance roman dome oamaru stone francis petre' },
  { title: 'Riccarton House',                   section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'riccarton house william morris wallpaper pioneer homestead victorian edwardian kahu road' },
  { title: 'Kate Sheppard House',               section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'kate sheppard house ilam victorian villa fretwork bay windows leadlight suffragist' },
  { title: '404 Montreal Street',               section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: '404 montreal street merivale workers cottage 1877 matai jarrah macrocarpa carrara marble' },
  { title: '41 Opawa Road',                     section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: '41 opawa road waltham victorian 1880s kauri floors fireplaces chandeliers wallpapers' },
  { title: 'Chippenham Lodge',                  section: 'Inspiration · Christchurch',     page: 'inspiration',  svc: null,          keywords: 'chippenham lodge browns road st albans gothic revival domestic 1863 mountfort' },
  { title: 'Otahuna Lodge',                     section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'otahuna lodge tai tapu queen anne 1895 kauri inglenook fireplaces leadlight stephen cashmore' },
  { title: 'The Giants House',                  section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'giants house linton 70 rue balguerie akaroa josie martin mosaic garden french colonial totara kauri' },
  { title: 'French Bay House',                  section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'french bay house akaroa colonial villa heritage soft whites linens antiques banks peninsula' },
  { title: 'Otoromiro Hotel',                   section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'otoromiro hotel banks peninsula heritage vernacular timber landscape intimate' },
  { title: 'Lyttelton Historic Precinct',       section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'lyttelton historic precinct colonial victorian 1850s volcanic basalt port stone warehouses cottages' },
  { title: 'Akaroa Museum',                     section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'akaroa museum rue lavaud french colonial langlois eteveneaux customs court house 1878 banks peninsula' },
  { title: 'Pohatu Farm Stay',                  section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'pohatu farm stay banks peninsula rural heritage timber vernacular landscape' },
  { title: 'Hakatere Heritage Station',         section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'hakatere heritage station ashburton gorge high country 1857 cob stone cottage shearers quarters' },
  { title: 'Rangiora Town Hall',                section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'rangiora town hall edwardian classical 1909 corinthian pilasters north canterbury civic' },
  { title: 'Buddha Stix Rangiora',              section: 'Inspiration · Greater Canterbury',page: 'inspiration', svc: null,          keywords: 'buddha stix rangiora adaptive heritage pressed metal ceilings period joinery contemporary' },
  { title: 'Collaborators',                     section: 'Collaborators',                  page: 'collaborators',svc: null,          keywords: 'collaborators cheyenne tuia photography marbello benchtops vikings builders marble stone' },
  { title: 'Cheyenne Tuia Photography',         section: 'Collaborators',                  page: 'collaborators',svc: null,          keywords: 'cheyenne tuia photography interior lifestyle heritage christchurch' },
  { title: 'Marbello Benchtops Plus',           section: 'Collaborators',                  page: 'collaborators',svc: null,          keywords: 'marbello benchtops marble stone homewares kitchen bathroom surfaces natural' },
  { title: 'Vikings Builders',                  section: 'Collaborators',                  page: 'collaborators',svc: null,          keywords: 'vikings builders heritage renovation residential christchurch canterbury period joinery' },
  { title: 'Contact',                           section: 'Contact',                        page: 'contact',      svc: null,          keywords: 'contact enquire get in touch phone email atelier gwyneth christchurch' }
];

function toggleSearch() {
  var input   = document.getElementById('nav-search-input');
  var results = document.getElementById('search-results');
  if (!input) return;
  input.classList.toggle('open');
  if (input.classList.contains('open')) {
    input.focus();
  } else {
    input.value = '';
    if (results) { results.classList.remove('visible'); results.innerHTML = ''; }
  }
}

function closeSearch() {
  var input   = document.getElementById('nav-search-input');
  var results = document.getElementById('search-results');
  if (input) { input.classList.remove('open'); input.value = ''; }
  if (results) { results.classList.remove('visible'); results.innerHTML = ''; }
}

function runSearch(query) {
  var results = document.getElementById('search-results');
  if (!results) return;
  if (!query || query.trim().length < 2) {
    results.classList.remove('visible');
    results.innerHTML = '';
    return;
  }
  var q = query.toLowerCase().trim();
  var matches = SEARCH_INDEX.filter(function(item) {
    return item.title.toLowerCase().includes(q) ||
           item.keywords.toLowerCase().includes(q) ||
           item.section.toLowerCase().includes(q);
  });
  if (!matches.length) {
    results.innerHTML = '<div class="search-no-results">No results for &ldquo;' + query + '&rdquo;</div>';
    results.classList.add('visible');
    return;
  }
  results.innerHTML = matches.slice(0, 8).map(function(item) {
    return '<div class="search-result-item" onclick="navigateTo(\'' + item.page + '\',\'' + (item.svc || '') + '\')">' +
           '<div class="search-result-title">' + item.title + '</div>' +
           '<div class="search-result-section">' + item.section + '</div>' +
           '</div>';
  }).join('');
  results.classList.add('visible');
}

function navigateTo(page, svc) {
  closeSearch();
  showPage(page, svc || undefined);
}

/* ══ 05. INSPIRATION PAGE SEARCH ════════════════════════════ */

var INS_SITES = [
  { keywords: 'arts centre te matatiki toi ora gothic revival 1877 mountfort rutherford great hall worcester boulevard christchurch', panel: 'chch' },
  { keywords: "christs college christ's college rolleston avenue gothic quadrangle john piper chapel collegiate neogothic", panel: 'chch' },
  { keywords: 'mona vale homestead fendalton old english revival 1899 leadlight gardens arts crafts half-timbered', panel: 'chch' },
  { keywords: 'isaac theatre royal gloucester street edwardian baroque 1908 gilded plasterwork crimson gold', panel: 'chch' },
  { keywords: 'cathedral blessed sacrament barbadoes street baroque renaissance 1905 roman dome oamaru stone francis petre ionic', panel: 'chch' },
  { keywords: 'old government building ogb gloucester street victorian civic bar dining dark timber brass', panel: 'chch' },
  { keywords: 'knox church bealey avenue gothic revival 1905 timber diagrid architectus rebuilt 2017', panel: 'chch' },
  { keywords: 'new regent street spanish mission 1932 pastel facades baroque ornament wrought iron balconettes cecil wood', panel: 'chch' },
  { keywords: 'odeon new regent street art deco spanish mission 1932 curved forms heritage bar', panel: 'chch' },
  { keywords: 'tannery woolston victorian industrial 1882 exposed brickwork iron columns timber beams adaptive reuse', panel: 'chch' },
  { keywords: 'drifter wellington woollen manufacturing lichfield street gummer 1919 nelson marble industrial heritage hotel', panel: 'chch' },
  { keywords: 'c1 espresso high street post office 1878 rimu floors pneumatic tubes recycled panelling heritage cafe', panel: 'chch' },
  { keywords: 'observatory hotel arts centre gothic revival heritage boutique hotel stone warmth', panel: 'chch' },
  { keywords: 'tack rooms hotel montreal heritage hotel conversion bespoke joinery deep tones leather', panel: 'chch' },
  { keywords: 'wilson dorset arts centre heritage retail gothic revival new zealand textiles ceramics', panel: 'chch' },
  { keywords: 'chippenham lodge browns road st albans gothic revival domestic 1863 mountfort masonry', panel: 'chch' },
  { keywords: 'mona vale homestead fendalton road old english revival gardens', panel: 'chch' },
  { keywords: 'riccarton house kahu road riccarton william morris wallpaper pioneer homestead victorian edwardian', panel: 'chch' },
  { keywords: 'kate sheppard house ilam clyde road victorian villa 1888 fretwork bay windows leadlight', panel: 'chch' },
  { keywords: '404 montreal street merivale workers cottage 1877 heritage renovation matai jarrah macrocarpa carrara marble', panel: 'chch' },
  { keywords: '41 opawa road waltham victorian heritage 1880s kauri floors fireplaces chandeliers wallpapers', panel: 'chch' },
  { keywords: 'deans cottage riccarton bush colonial 1843 native timber pioneer vernacular', panel: 'chch' },
  { keywords: 'canterbury museum rolleston avenue gothic revival 1870 mountfort halswell basalt carved capitals', panel: 'chch' },
  { keywords: 'rangiora town hall edwardian classical 1909 corinthian pilasters north canterbury', panel: 'gcan' },
  { keywords: 'buddha stix rangiora adaptive heritage pressed metal ceilings period joinery', panel: 'gcan' },
  { keywords: 'otahuna lodge tai tapu queen anne 1895 kauri inglenook fireplaces leadlight', panel: 'gcan' },
  { keywords: 'giants house linton 70 rue balguerie akaroa victorian villa 1880 josie martin mosaic garden french colonial totara kauri', panel: 'gcan' },
  { keywords: 'french bay house akaroa heritage accommodation colonial villa soft whites linens antiques', panel: 'gcan' },
  { keywords: 'otoromiro hotel banks peninsula heritage hotel vernacular timber landscape', panel: 'gcan' },
  { keywords: 'lyttelton historic precinct colonial victorian 1850s volcanic basalt port harbour stone warehouses timber cottages', panel: 'gcan' },
  { keywords: 'akaroa museum rue lavaud french colonial langlois eteveneaux customs house court house 1878 banks peninsula', panel: 'gcan' },
  { keywords: 'pohatu farm stay banks peninsula rural heritage timber farm vernacular landscape', panel: 'gcan' },
  { keywords: 'hakatere heritage station ashburton gorge high country station 1857 stone cottage cob shearers quarters', panel: 'gcan' }
];

function insSearch(query) {
  var cards   = document.querySelectorAll('#ins-panel-chch .ins-site-card, #ins-panel-gcan .ins-site-card');
  var clearBtn = document.getElementById('ins-search-clear');
  var countEl  = document.getElementById('ins-search-count');
  var noRes    = document.getElementById('ins-no-results');
  var chch     = document.getElementById('ins-panel-chch');
  var gcan     = document.getElementById('ins-panel-gcan');

  if (!query || query.trim().length < 2) {
    cards.forEach(function(c) { c.classList.remove('ins-hidden'); });
    if (clearBtn) clearBtn.classList.remove('visible');
    if (countEl)  countEl.textContent = '';
    if (noRes)    noRes.classList.remove('visible');
    return;
  }

  if (clearBtn) clearBtn.classList.add('visible');
  var words = query.toLowerCase().trim().split(/\s+/);
  var visible = 0;

  cards.forEach(function(card, i) {
    var site = INS_SITES[i] || { keywords: '', panel: 'chch' };
    var hay  = (card.textContent || '').toLowerCase() + ' ' + site.keywords;
    var match = words.every(function(w) { return hay.includes(w); });
    card.classList.toggle('ins-hidden', !match);
    if (match) visible++;
  });

  if (countEl) countEl.textContent = visible + ' result' + (visible !== 1 ? 's' : '');

  // When searching, show both panels
  if (chch) chch.style.display = 'block';
  if (gcan) gcan.style.display = 'block';

  if (noRes) noRes.classList.toggle('visible', visible === 0);
}

function insClearSearch() {
  var input = document.getElementById('ins-search-input');
  if (input) { input.value = ''; insSearch(''); input.focus(); }
}

/* ══ 06. MOBILE LAYOUT REWRITER ═════════════════════════════ */

(function() {
  var MQ = window.matchMedia('(max-width: 768px)');

  function isMobile() { return MQ.matches; }

  function rewriteLayouts() {
    if (!isMobile()) {
      document.body.classList.remove('mobile');
      document.querySelectorAll('[data-desktop-style]').forEach(function(el) {
        el.setAttribute('style', el.getAttribute('data-desktop-style'));
        el.removeAttribute('data-desktop-style');
      });
      return;
    }
    document.body.classList.add('mobile');

    // Stack all multi-column inline grids
    document.querySelectorAll('[style*="grid-template-columns"]').forEach(function(el) {
      if (el.hasAttribute('data-desktop-style')) return;
      if (el.tagName === 'NAV') return;
      var style = el.getAttribute('style') || '';
      el.setAttribute('data-desktop-style', style);
      var newStyle = style
        .replace(/grid-template-columns:[^;]+;?/g, 'grid-template-columns:1fr;')
        .replace(/gap:[4-9]rem[^;]*;?/g, 'gap:2px;');
      el.setAttribute('style', newStyle);
    });

    // Tighten large paddings
    document.querySelectorAll('[style*="padding"]').forEach(function(el) {
      if (el.hasAttribute('data-desktop-style')) return;
      if (el.tagName === 'NAV' || el.tagName === 'FOOTER') return;
      var style = el.getAttribute('style') || '';
      var match = style.match(/padding:(\d+(?:\.\d+)?)rem (\d+(?:\.\d+)?)rem/);
      if (match) {
        var v = parseFloat(match[1]), h = parseFloat(match[2]);
        if (v >= 5 || h >= 4) {
          el.setAttribute('data-desktop-style', style);
          el.setAttribute('style', style.replace(match[0],
            'padding:' + Math.min(v,3) + 'rem ' + Math.min(h,1.5) + 'rem'));
        }
      }
    });

    // Section padding
    document.querySelectorAll('section[style]').forEach(function(el) {
      if (el.hasAttribute('data-desktop-style')) return;
      var style = el.getAttribute('style') || '';
      var m = style.match(/padding:(\d+(?:\.\d+)?)rem (\d+(?:\.\d+)?)rem/);
      if (m && (parseFloat(m[1]) >= 5 || parseFloat(m[2]) >= 3)) {
        el.setAttribute('data-desktop-style', style);
        el.setAttribute('style', style.replace(m[0], 'padding:3rem 1.5rem'));
      }
    });

    // Photo placeholders height
    document.querySelectorAll('.photo-placeholder').forEach(function(el) {
      var style = el.getAttribute('style') || '';
      if (style.includes('height:100%')) {
        if (!el.hasAttribute('data-desktop-style')) el.setAttribute('data-desktop-style', style);
        el.setAttribute('style', style.replace('height:100%', 'height:58vw').replace('width:100%', 'width:100%'));
      }
    });

    // Process 7-col
    document.querySelectorAll('[style*="grid-template-columns:repeat(7,1fr)"]').forEach(function(el) {
      if (!el.hasAttribute('data-desktop-style')) el.setAttribute('data-desktop-style', el.getAttribute('style'));
      var cols = window.innerWidth < 480 ? '1fr' : '1fr 1fr';
      el.setAttribute('style', (el.getAttribute('data-desktop-style') || '').replace(
        'grid-template-columns:repeat(7,1fr)', 'grid-template-columns:' + cols));
    });

    // Inspiration panels
    ['ins-panel-chch','ins-panel-gcan'].forEach(function(id) {
      var panel = document.getElementById(id);
      if (!panel) return;
      panel.querySelectorAll('[style*="grid-template-columns:1fr 1fr"]').forEach(function(el) {
        if (!el.hasAttribute('data-desktop-style')) {
          el.setAttribute('data-desktop-style', el.getAttribute('style') || '');
          el.setAttribute('style', (el.getAttribute('style') || '').replace(
            /grid-template-columns:[^;]+/, 'grid-template-columns:1fr'));
        }
      });
    });
  }

  // Expose so showPage can call it
  window.rewriteLayouts = rewriteLayouts;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rewriteLayouts);
  } else {
    rewriteLayouts();
  }

  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(rewriteLayouts, 150);
  });
})();

/* ══ 07. DOM READY INIT ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  // Close nav on link click
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', closeNav);
  });

  // Close search on outside click
  document.addEventListener('click', function(e) {
    var search = document.getElementById('nav-search');
    if (search && !search.contains(e.target)) closeSearch();
  });

  // Add ins-site-card class to all inspiration site cards for search filtering
  ['ins-panel-chch', 'ins-panel-gcan'].forEach(function(id) {
    var panel = document.getElementById(id);
    if (!panel) return;
    panel.querySelectorAll(':scope > div > div[style*="grid-template-columns:1fr 1fr"]').forEach(function(el) {
      el.classList.add('ins-site-card');
    });
    panel.querySelectorAll(':scope > div[style*="display:flex;flex-direction:column"] > div[style*="grid-template-columns:1fr 1fr"]').forEach(function(el) {
      el.classList.add('ins-site-card');
    });
  });

  // Run initial layout rewrite
  if (typeof rewriteLayouts === 'function') rewriteLayouts();
});
