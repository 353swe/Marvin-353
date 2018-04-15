from bs4 import BeautifulSoup
import subprocess
import unirest
import json
import os

def push(type):

  coverage_html_file = {"SOL": "./coverage/lcov-report/index.html", "JS": "./js-coverage/lcov-report/index.html"}
  html_doc, error = subprocess.Popen(["cat", coverage_html_file[type]], stdout=subprocess.PIPE).communicate()
  doc = BeautifulSoup(html_doc, "html.parser")
  values = doc.body.find_all("span", attrs={'class': 'strong'})
  coverage = {
  "statements": values[0].text[0:-2],
  "branches": values[1].text[0:-2],
  "functions": values[2].text[0:-2],
  "_lines": values[3].text[0:-2],
  "type": type
  }
  if "TRAVIS" in os.environ:
      a = unirest.post("http://api.353swe.ml/metrics/coverage.php", headers={ "Accept": "application/json" }, params={'coverage': json.dumps(coverage)})
  print json.dumps(coverage)
