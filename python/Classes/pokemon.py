class Pokemon:
  def __init__(self, ID, name, element, url, stat, datetime):
    self.ID = ID
    self.name = name
    #replace type with element since type is a reserved keyword
    self.element = element
    self.encounterUrl = url
    self.stat = stat
    self.encounter = "-"
    self.datetime = datetime