import requests
import json
from datetime import datetime
from Classes.pokemon import Pokemon
from Classes.stat import Stat
def get_pokemon(number, expired):
    url = "https://pokeapi.co/api/v2/pokemon/{}".format(number)
    # print("Check url={}".format(url))
    r = requests.get(url)
    if r.status_code == 200:
        print("Searching...")   
        result = json.loads(r.text)   
        # print("Check A, code={}".format(result["id"]))
        # print("Check B, code={}".format(result["name"]))
        # print("Check C, code={}".format(result["types"]))
        # reformat types to string array
        types = ""
        for x in result["types"]:
            types += x["type"]["name"]+" "       
        # print("Check D, code={}".format(types))
        # print("Check E, code={}".format(result["location_area_encounters"]))
        # print("Check F, code={}".format(result["stats"]))
        # reformat stats with class
        Hp = 0
        Atk = 0
        Def = 0
        Satk = 0
        Sdef = 0
        Spd = 0
        for y in result["stats"]:
            # print("Check Loop, code={}".format(y))
            if y["stat"]["name"] == "hp":
                Hp = y["base_stat"]
            elif y["stat"]["name"] == "attack":
                Atk = y["base_stat"]
            elif y["stat"]["name"] == "defense":
                Def = y["base_stat"]
            elif y["stat"]["name"] == "special-attack":
                Satk = y["base_stat"]
            elif y["stat"]["name"] == "special-defense":
                Sdef = y["base_stat"]
            elif y["stat"]["name"] == "speed":
                Spd = y["base_stat"]
        
        # print("Check G, code={} {} {} {} {} {}".format(Hp, Atk, Def, Satk, Sdef, Spd))    
        stat = Stat(Hp, Atk, Def, Satk, Sdef, Spd)
        date = datetime.now()
        # todo: hardcode datetime at expired
        if expired == True:
            date = datetime(2021,8,1)
        pokemon = Pokemon(result["id"], result["name"], types, result["location_area_encounters"], stat, date)
        return pokemon
    else:
        print("Please check your connection, or the pokemon doesn't exist.")
        return False
