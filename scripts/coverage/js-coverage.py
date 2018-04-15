import coverage_report
import subprocess
import shutil

run, error = subprocess.Popen(["npm", "run", "js-coverage"], stdout=subprocess.PIPE).communicate()
if error is None:
    subprocess.Popen(["./node_modules/.bin/nyc", "report", "--reporter=lcov"]).communicate()
    coverage_report.push("JS")
else:
    print error
    exit(1)

exit(0)
