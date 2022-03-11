import requests
import json
from Classes.encounter import Encounter
def check_kanto(url, name, versions):
    # print("Check url={}".format(url))
    r = requests.get(url)
    kanto = False
    # verify kanto status
    if r.status_code == 200:
        result = json.loads(r.text)
        locationUrl = result["location"]["url"]
        # print("Check A, code={}".format(locationUrl))
        
        r2 = requests.get(locationUrl)
        if r2.status_code == 200:
            result2 = json.loads(r2.text)
            # print("Check B, code={}".format(result2))
            if result2["region"]["name"] == "kanto":
                kanto = True
        else:
            print("Please check your connection, code={}".format(r2.status_code))
        # process encounter type
        encounter_types = []
        if kanto == True:
            for x in versions:
                for y in x["encounter_details"]:
                    encounter_types.append(y["method"]["name"])
            # using set()
            # to remove duplicated 
            # from list 
            encounter_types_fixed = list(set(encounter_types))
            # print("Check C, code={}".format(encounter_types_fixed))
            # generate encounter
            # print("Check D, code={} {} {}".format(result2["region"]["name"], result2["name"], encounter_types_fixed))
            return Encounter(result2["region"]["name"], name, encounter_types_fixed)
    else:
        print("Please check your connection, code={}".format(r.status_code))