# -*- coding: utf-8 -*-
import subprocess
import datetime
import unirest
import sys

stages = {
"lint": ["npm run eslint", "npm run solhint"],
"test": ["npm run test"]
}
try:
    stage = sys.argv[1]
    if stage not in ["lint", "test"]: raise IndexError
    scripts = stages[stage]
    failed = False
    timestamp = datetime.datetime.now().isoformat()
    for script_str in scripts:
        print "RUNNING " + script_str
        script = script_str.split(" ")
        process = subprocess.Popen(script)
        process.communicate()
        if process.returncode is 1:
            failed = True
            unirest.post(
                "http://api.353swe.ml/metrics/failed_test.php",
                headers={ "Accept": "application/json" },
                params={ "test_type": script[2], "at": timestamp }
            )
    if failed is True:
        exit(1)
    else:
        exit(0)
except IndexError:
    print "You must provide a correct param"
    exit(1)
