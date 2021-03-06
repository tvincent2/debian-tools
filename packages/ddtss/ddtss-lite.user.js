// ==UserScript==
// @name DDTSS Helper
// @description Add stuff to DDTSS pages
// @version 0.6
// @match https://ddtp2.debian.net/ddtss/index.cgi/*/forreview/*
// @match https://ddtp2.debian.net/ddtss/index.cgi/*/translate/*
// @grant none
// ==/UserScript==
// Daniele Forsi
// Last update 08/02/2016
// Creative Commons Zero

// Add description length
var short_el = document.getElementsByName('short');
if (short_el[0]) {
  var short_len_el = document.createElement('span');
  short_el[0].oninput = function () {
    short_len_el.innerHTML = ' length=' + short_el[0].value.length;
  }
  short_el[0].parentNode.insertBefore(short_len_el, short_el.nextSibling);
  short_el[0].oninput();
}

// Add button to reflow the long description
var long_el = document.getElementsByName('long');
if (long_el[0]) {
  // remove newlines that don't mark the end of a paragraph
  var long_re = /([^.])\n([^ .])/gm;
  var button = document.createElement('button');
  var text = document.createTextNode('Join');
  button.appendChild(text)
  button.onclick = function () {
    long_el[0].value = long_el[0].value.replace(long_re, '$1 $2');
    return false;
  }
  long_el[0].parentNode.insertBefore(button, long_el.nextSibling);
}

// Add links to p.d.o
var ul_el = document.getElementsByTagName('ul');
if (ul_el[0]) {
  var el = ul_el[0].children[0].children[0];
  var html = el.innerHTML;
  var re = /([^.]+.: )([^ ,]+)(.*)/;
  el.innerHTML = el.innerHTML.replace(re, '$1<a href="https://packages.debian.org/source/sid/$2" target="_blank">$2</a> <a href="https://ddtp.debian.net/ddt.cgi?source=$2" target="_blank">ddtp</a>$3');

  var el = ul_el[0].children[1].children[0];
  var html = el.innerHTML;
  var re = /([^.]+.: )([^ ,]+)(.*)/;
  el.innerHTML = el.innerHTML.replace(re, '$1<a href="https://packages.debian.org/sid/$2" target="_blank">$2</a> <a href="https://ddtp.debian.net/ddt.cgi?package=$2" target="_blank">ddtp</a>$3');
}

// Convert timestamps into dates
// Obtain all <pre> tags
var all_log_tags = document.getElementsByTagName('pre');
// Find the one containing logs
for (n in all_log_tags) {
  log_tag = all_log_tags[n];
  if (log_tag.innerHTML.search(/\d{10} fetched/) != -1) {
    // Convert timestamps
    log_tag.innerHTML = log_tag.innerHTML.replace(/\d{10}/g, function (timestamp) {var date = new Date(1000*timestamp); return date.toLocaleString();});
  }
}
