git log --date=format:'%Y-%m-%d %H:%M:%S' --pretty=format:'%H;%an;%ad;%f;code' > log.csv


Andare su http://sql.353swe.ml/sql.php?server=1&db=metabase&table=github
E importare file CSV con formato UTF-16 e selezione delimitatore colonne ;
togliere due caselle sottostanti ma lasciare casella con "auto"
