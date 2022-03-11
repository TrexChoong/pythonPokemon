import requests
import json
from Modules.checkKanto import check_kanto
def get_encounters(url):
    # print("Check url={}".format(url))
    r = requests.get(url)
    if r.status_code == 200:
        result = json.loads(r.text)
        encounters = []
        # print("Check A, code={}".format(result))
        for x in result:
            encounter = check_kanto(x["location_area"]["url"], x["location_area"]["name"], x["version_details"])
            if encounter:
                encounters.append(encounter)
        
        # for y in encounters:
            # print("Check B, code={} {}".format(y.name,y.methods))
        return encounters
    else:
        print("Please check your connection, code={}".format(r.status_code))
