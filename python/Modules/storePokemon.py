import jsonpickle
def read_pokemon(filename):
    # read cache
    f = open(filename, "r")
    # print("Check cache before, code={}".format(f.read()))
    f.seek(0)
    cache = jsonpickle.decode("["+f.read()+"]")
    # for x in cache:
        # print("Check cache loop, code={}".format(x.datetime))
    f.close()
    return cache

def append_pokemon(filename,pokemon,first):
    # print("Check Stringified Pokemon, code={}".format(jsonpickle.encode(pokemon)))
    # write pokemon cache
    f = open(filename, "a")
    if first == True:
        f.write(str(jsonpickle.encode(pokemon)))
    else:
        f.write(","+str(jsonpickle.encode(pokemon)))
    f.close()

def replace_pokemon(filename,cacheModified):
    # print("Check Stringified cache, code={}".format(cacheModified))
    # remove first and last character
    fixedCache = jsonpickle.encode(cacheModified)[1:-1]
    # print("Check fixed cache, code={}".format(fixedCache))
    # write pokemon cache
    f = open(filename, "w")
    f.write(fixedCache)
    f.close()