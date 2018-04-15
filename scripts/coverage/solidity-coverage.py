import coverage_report
import subprocess
import shutil

run, error = subprocess.Popen(["npm", "run", "solidity-coverage"], stdout=subprocess.PIPE).communicate()
if error is None:
    coverage_report.push("SOL")
else:
    print error
    exit(1)
exit(0)
