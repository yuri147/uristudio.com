var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    $('[rel="shortcut icon"]').attr('href', '/TEP.png');
    document.title = 'w(ﾟДﾟ)w 你走了';
    clearTimeout(titleTime);
  } else {
    $('[rel="shortcut icon"]').attr('href', '/favicon.png');
    document.title = '♪(^∇^*)你又来了 ';
    titleTime = setTimeout(function() {
      document.title = OriginTitile;
    }, 3000);
  }
});
